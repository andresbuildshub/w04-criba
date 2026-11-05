import { NextResponse } from 'next/server'
import { calificarSeleccion, revisarMensaje, CFDIS, RUBRICA_VERSION, CLIENTE } from '../../../lib/muestra'
import { firmar, cargaFirmable, haySecreto } from '../../../lib/firma'
import { leerConvocatoria, estado, registrarIntento, horaMX, minutos } from '../../../lib/convocatorias'

export const dynamic = 'force-dynamic'
const ASISTENCIA = ['ninguna', 'consulte_fuentes', 'use_ia']
// Los 4 tipos de error son públicos (/rubrica, Condición 3). Nombrarlos en la constancia NO revela qué folio: dice cuál TIPO se le fue (fix #2: "¿cuál se le fue?").
const TIPO = { 2: 'gasto pagado en efectivo que no se deduce así', 4: 'consumo en restaurante al 100% (solo 8.5%)', 6: 'inversión (activo fijo) registrada como gasto', 14: 'factura emitida a otro RFC' }

// La verdad de terreno vive aquí, en el servidor.
// Muestra LIBRE: la respuesta NO se guarda (Condición 5: la evidencia es de la candidata); se firma el resultado.
// Muestra ABIERTA por un despacho (?conv=): se registra el INTENTO sin identidad y se cierra la ventana (fix #1, semana 13).
export async function POST(req) {
  let b; try { b = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }
  const seleccion = Array.isArray(b.seleccion) ? b.seleccion.map(Number).filter(n => Number.isInteger(n) && n >= 1 && n <= 20).slice(0, 20) : []
  const mensaje = typeof b.mensaje === 'string' ? b.mensaje.slice(0, 2000) : ''
  const asistencia = ASISTENCIA.includes(b.asistencia) ? b.asistencia : 'no_declarada'
  const sel = calificarSeleccion(seleccion)
  const msg = revisarMensaje(mensaje, sel.aciertos)
  const detalle = CFDIS.filter(c => c.error).map(c => ({ id: c.id, folio: c.folio, encontrado: sel.aciertos.includes(c.id), explicacion: c.error.explicacion, accion: c.error.accion }))
  const falsos = CFDIS.filter(c => sel.falsos.includes(c.id)).map(c => ({ id: c.id, folio: c.folio, nota: c.agente.nota || 'Clasificación correcta.' }))
  const fecha = new Date()
  const fechaISO = fecha.toISOString().slice(0, 10)
  const vence = new Date(fecha); vence.setMonth(vence.getMonth() + 12)
  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://w04-criba.vercel.app').replace(/\/$/, '')
  const mensajeLimpio = mensaje.trim() || '(sin mensaje)'
  const encontro = sel.aciertos.map(id => TIPO[id]), seLeFue = sel.omitidos.map(id => TIPO[id])
  const deMas = falsos.map(f => `${f.folio} (${f.nota.replace(/\.$/, '')})`)
  const lineaErrores = `Encontró ${sel.aciertos.length} de 4: ${encontro.join('; ') || 'ninguno'}.` + (seLeFue.length ? ` SE LE FUE: ${seLeFue.join('; ')}.` : ' No se le fue ninguno.') + (deMas.length ? ` Marcó de más (estaba bien): ${deMas.join('; ')}.` : ' No marcó ninguna de más.')
  const aprobadoTxt = `Regla v0.1 en palabras: pasa si encuentra 3 o más y marca de más a lo sumo una → ${sel.aprobado ? 'PASÓ' : 'NO PASÓ'} esta muestra.`

  // ¿Viene de una ventana abierta por un despacho?
  let intento = null, ventanaError = null
  if (b.conv) {
    const c = await leerConvocatoria(b.conv)
    const e = estado(c)
    if (!e.ok || !c.abierta) ventanaError = { no_existe: 'El enlace no existe.', ya_entregada: 'Este enlace ya se usó.', caducada: 'El enlace caducó.', ventana_cerrada: 'Pasaron los 60 minutos: la entrega llegó tarde.' }[e.motivo] || 'La ventana no está abierta.'
    else intento = await registrarIntento(c, { version: RUBRICA_VERSION, aciertos: sel.aciertos, omitidos: sel.omitidos, falsos: sel.falsos, aprobado: sel.aprobado, cumplidos: msg.cumplidos, total: msg.total, asistencia, mensaje: mensajeLimpio.slice(0, 2000) })
  }

  let codigo, verificar, corto, constancia, registrado = false
  if (intento) {
    registrado = true; codigo = intento.codigo
    verificar = `${base}/verificar?c=${codigo}`
    constancia = `CONSTANCIA DE MUESTRA DE TRABAJO · ${horaMX(intento.entrega)} · código ${codigo}\n` +
      `Abierta con el enlace de ${intento.despacho} · inició ${horaMX(intento.inicio)} · entregó ${horaMX(intento.entrega)} (${minutos(intento.inicio, intento.entrega)} min) · una sola sesión, un solo intento. Registrada por Criba sin nombre ni teléfono.\n\n` +
      `LO QUE ESCRIBIÓ AL CLIENTE (léalo usted; esto es su juicio, no el nuestro):\n«${mensajeLimpio}»\n\n` +
      `LO QUE SE MIDIÓ: revisó 20 facturas (inventadas, cliente ficticio ${CLIENTE.nombre}) que un sistema ya había clasificado, y marcó cuáles estaban mal. ${lineaErrores} ${aprobadoTxt} Su mensaje cumplió ${msg.cumplidos} de ${msg.total} verificaciones de texto (reglas, no IA). Ayuda declarada: ${asistencia}.\n\n` +
      `LO QUE NO DICE: que esté certificada, que sea apta, ni cómo va a trabajar. Lo que sí garantiza: una sesión de 60 minutos con el enlace del despacho, registrada.\n` +
      `Comprobar (30 segundos): ${verificar}\nEn la entrevista pídale que explique en voz alta la factura que se le fue, o una de las que encontró.`
    corto = `Constancia Criba · encontró ${sel.aciertos.length} de 4 · abierta por ${intento.despacho}, una sola sesión · código ${codigo} · qué se le fue y el mensaje, aquí: ${verificar}`
  } else {
    const campos = { fecha: fechaISO, version: RUBRICA_VERSION, aciertos: String(sel.aciertos.length), falsos: String(sel.falsos.length), cumplidos: String(msg.cumplidos), total: String(msg.total), asistencia }
    codigo = firmar(cargaFirmable(campos))
    const qs = new URLSearchParams({ c: codigo || '', f: campos.fecha, v: campos.version, a: campos.aciertos, x: campos.falsos, m: campos.cumplidos, t: campos.total, s: campos.asistencia, o: sel.omitidos.join('.'), p: sel.falsos.join('.') }).toString()
    verificar = codigo ? `${base}/verificar?${qs}` : null
    constancia = `CONSTANCIA DE MUESTRA DE TRABAJO (libre, sin ventana de despacho) · ${fechaISO}${codigo ? ` · código ${codigo}` : ' · SIN CÓDIGO (servidor sin firma)'}\n\n` +
      `LO QUE ESCRIBIÓ AL CLIENTE (léalo usted; esto es su juicio, no el nuestro):\n«${mensajeLimpio}»\n\n` +
      `LO QUE SE MIDIÓ: revisó 20 facturas (inventadas, cliente ficticio ${CLIENTE.nombre}) que un sistema ya había clasificado, y marcó cuáles estaban mal. ${lineaErrores} ${aprobadoTxt} Su mensaje cumplió ${msg.cumplidos} de ${msg.total} verificaciones de texto (reglas, no IA). Ayuda declarada: ${asistencia}. Hecha por su cuenta, sin supervisión. Vigencia informativa hasta ${vence.toISOString().slice(0, 10)}.\n\n` +
      `LO QUE NO DICE: que esté certificada, que sea apta, que lo hizo sola, ni cómo va a trabajar. Si quiere que la haga en una sola sesión con su enlace, abra una muestra en ${base}/convocar.\n` +
      (verificar ? `Comprobar que no se editó (30 segundos): ${verificar}\nEn la entrevista pídale que explique una de las cuatro facturas en voz alta.` : '')
    corto = codigo ? `Constancia Criba (muestra libre) · encontró ${sel.aciertos.length} de 4 · código ${codigo} · compruebe aquí: ${verificar}` : null
  }
  return NextResponse.json({ seleccion: sel, mensaje: msg, detalle, falsos, constancia, corto, asistencia, codigo, verificar, firmado: haySecreto(), registrado, ventanaError })
}
