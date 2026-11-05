import { NextResponse } from 'next/server'
import { calificarSeleccion, revisarMensaje, CFDIS, RUBRICA_VERSION, CLIENTE } from '../../../lib/muestra'
import { firmar, cargaFirmable, haySecreto } from '../../../lib/firma'

export const dynamic = 'force-dynamic'
const ASISTENCIA = ['ninguna', 'consulte_fuentes', 'use_ia']

// La verdad de terreno vive aquí, en el servidor. La respuesta NO se guarda (Condición 5: la evidencia es de la candidata).
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
  const vence = new Date(fecha); vence.setMonth(vence.getMonth() + 12)
  // Constancia ACOTADA (Condición 2): dice exactamente qué se probó, en qué condiciones, y qué NO afirma.
  // Semana 13 (hipótesis #2 de la pelea): el MENSAJE de la candidata va arriba y el conteo abajo, porque el dueño juzga el mensaje
  // con su propio criterio; el conteo es lo que un modelo también sacaría. Se firma el resultado, no se guarda nada.
  const fechaISO = fecha.toISOString().slice(0, 10)
  const campos = { fecha: fechaISO, version: RUBRICA_VERSION, aciertos: String(sel.aciertos.length), falsos: String(sel.falsos.length), cumplidos: String(msg.cumplidos), total: String(msg.total), asistencia }
  const codigo = firmar(cargaFirmable(campos))
  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://w04-criba.vercel.app').replace(/\/$/, '')
  const qs = new URLSearchParams({ c: codigo || '', f: campos.fecha, v: campos.version, a: campos.aciertos, x: campos.falsos, m: campos.cumplidos, t: campos.total, s: campos.asistencia }).toString()
  const verificar = codigo ? `${base}/verificar?${qs}` : null
  const mensajeLimpio = mensaje.trim() || '(sin mensaje)'
  const constancia = `CONSTANCIA · muestra de trabajo Criba ${RUBRICA_VERSION} · ${fechaISO}${codigo ? ` · código ${codigo}` : ' · SIN CÓDIGO (servidor sin firma)'}\n\n` +
    `LO QUE ESCRIBIÓ LA CANDIDATA AL CLIENTE (léalo usted; esto es su juicio, no el nuestro):\n«${mensajeLimpio}»\n\n` +
    `LO QUE SE MIDIÓ: revisó 20 CFDIs (datos inventados, cliente ficticio ${CLIENTE.nombre}) clasificados por un agente simulado y marcó cuáles estaban mal. ` +
    `Encontró ${sel.aciertos.length} de 4, con ${sel.falsos.length} marcada(s) de más. Regla v0.1: ≥3 y ≤1 → ${sel.aprobado ? 'APROBADO' : 'NO APROBADO'} en esta muestra. ` +
    `El mensaje cumplió ${msg.cumplidos} de ${msg.total} verificaciones de texto (reglas, no IA). Ayuda declarada: ${asistencia}. Remota, sin supervisión. Vigencia informativa hasta ${vence.toISOString().slice(0, 10)}.\n\n` +
    `LO QUE NO DICE: que esté certificada, que sea apta, que lo hizo sola, ni cómo va a trabajar. Solo describe esta tarea.\n` +
    (verificar ? `Para comprobar que no se editó (30 segundos): ${verificar}\nEn la entrevista pídale que explique una de las cuatro facturas en voz alta.` : '')
  return NextResponse.json({ seleccion: sel, mensaje: msg, detalle, falsos, constancia, asistencia, codigo, verificar, firmado: haySecreto() })
}
