// Bitácora de eventos (semana 13: "un mecanismo de analítica, aunque sea un log simple").
// REGLA: el servidor guarda SOLO { evento, pantalla, dia } y, desde la semana 15, una `fuente` opcional de LISTA CERRADA
// (por cuál enlace llegó: tibio_a, frio_b, guardado, colega…). La fuente dice un canal, nunca una persona.
// Sin identificadores (ni IP, ni cookie, ni id de sesión),
// sin texto libre, sin códigos de constancia, y SIN HORA: con pocas visitas, una hora es un nombre. Solo el día.
// Nunca se puede unir un evento con una constancia ni con una persona.
// Persistencia: Vercel Blob, un archivo inmutable por evento. Sin token → memoria (etiquetado en /metrica).
import { put, list } from '@vercel/blob'
import { FUENTES_LOG } from './fuentes.js'
export { FUENTES_LOG }

const PREFIX = 'w04-criba/eventos/'
const memoria = []

// Lista cerrada. Cualquier otro nombre se rechaza con 400.
export const EVENTOS = [
  'inicio_visto',            // alguien abrió la portada
  'muestra_vista',           // alguien abrió la muestra (candidata o dueño curioseando)
  'muestra_calificada',      // alguien terminó la muestra y pidió calificación
  'constancia_copiada',      // la candidata copió su constancia
  'constancia_verificada',   // alguien abrió /verificar con un código válido (NO se guarda el código)
  'decision_abierta',        // un dueño abrió el formulario
  'decision_enviada',        // un dueño registró su decisión
  'tablero_visto',
  'regreso',                 // alguien volvió con el enlace "volver" (segunda visita declarada)
  'convocar_abierto',        // un dueño abrió /convocar
  'convocatoria_creada',     // un dueño creó un enlace de un solo uso
  'intento_registrado',      // una candidata entregó dentro de una ventana (sin identidad)
  // semana 14 (precio): conteos, nunca qué escenario ni qué números puso nadie
  'pricing_visto',
  'simulador_visto',
  'escenario_guardado',      // alguien guardó un escenario (el escenario NO viaja al servidor)
  'about_visto',             // alguien abrió el memo 10:1
  'convocar_a_ninguna',      // un dueño eligió "a ninguna" en el aviso de /convocar
  'convocar_a_todas',        // un dueño eligió "probar a todas mis finalistas"
  // semana 15 (distribución): conteos por canal, nunca por persona
  'llegada',                 // alguien abrió un enlace que traía ?f= de la lista cerrada
  'despachos_visto',         // alguien abrió la página para despachos
  'lectura_vista',           // alguien abrió la Pieza A (leer una entrega)
  'lectura_terminada',       // alguien eligió su pregunta y terminó la lectura (lo que escribió NO viaja)
  'compartir_guardar',       // alguien abrió la hoja de compartir para guardarse el enlace (no sé si lo guardó)
  'compartir_colega',        // alguien abrió la hoja de compartir para mandarlo a un colega (no sé a quién)
  'playbook_visto',
  'proceso_visto',
]
// Fuentes: lista cerrada. tibio = alguien que ya dijo que sí a un conocido; frio = publicó una vacante, no lo pidió;
// guardado / colega = enlaces que salen de los botones de compartir; prueba = mis pruebas automáticas (se reportan aparte).
// La lista vive en lib/fuentes.js para que el navegador la use sin cargar @vercel/blob.
export const PANTALLAS = ['inicio', 'muestra', 'decision', 'tablero', 'rubrica', 'verificar', 'metrica', 'convocar', 'pricing', 'simulador', 'about', 'despachos', 'lectura', 'playbook', 'proceso', 'otra']

export function validar(b) {
  if (typeof b !== 'object' || b === null) return null
  if (!EVENTOS.includes(b.evento)) return null
  const pantalla = PANTALLAS.includes(b.pantalla) ? b.pantalla : 'otra'
  if (Object.keys(b).some(k => !['evento', 'pantalla', 'fuente'].includes(k))) return null
  const item = { evento: b.evento, pantalla, dia: new Date().toISOString().slice(0, 10) }
  if (b.fuente !== undefined) { if (!FUENTES_LOG.includes(b.fuente)) return null; item.fuente = b.fuente }
  return item
}

// El nombre del archivo trae día, evento y (si hubo) fuente: 2026-11-19-llegada__colega-<azar>.json
export function parsearNombre(nombre) {
  const m = nombre.match(/^(\d{4}-\d{2}-\d{2})-([a-z_]+)/)
  if (!m) return null
  const [evento, fuente] = m[2].split('__')
  const item = { evento, dia: m[1] }
  if (fuente && FUENTES_LOG.includes(fuente)) item.fuente = fuente
  return EVENTOS.includes(evento) ? item : null
}

export async function registrar(item) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) { memoria.push(item); return 'memoria' }
  await put(`${PREFIX}${item.dia}-${item.evento}${item.fuente ? '__' + item.fuente : ''}.json`, JSON.stringify(item), { access: 'public', addRandomSuffix: true, contentType: 'application/json' })
  return 'Vercel Blob'
}

export async function leerEventos() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { items: [...memoria], persistencia: 'memoria (no persistente)' }
  const out = []
  let cursor
  do {
    const r = await list({ prefix: PREFIX, limit: 1000, cursor })
    out.push(...r.blobs); cursor = r.hasMore ? r.cursor : undefined
  } while (cursor)
  // El nombre del archivo ya trae día y evento: no hace falta descargar cada JSON.
  const items = out.map(b => {
    return parsearNombre(b.pathname.slice(PREFIX.length))
  }).filter(Boolean).sort((a, b) => a.dia.localeCompare(b.dia))
  return { items, persistencia: 'Vercel Blob' }
}

// Resumen para /metrica: conteos por evento, embudos, por día. Todo son conteos; nunca hay una fila por persona.
export function resumirEventos(items, dias = 14) {
  const desde = new Date(Date.now() - dias * 864e5).toISOString().slice(0, 10)
  const recientes = items.filter(i => i.dia >= desde)
  const conteo = Object.fromEntries(EVENTOS.map(e => [e, 0]))
  for (const i of recientes) if (conteo[i.evento] !== undefined) conteo[i.evento]++
  const porDia = {}
  for (const i of recientes) { const d = i.dia; porDia[d] = porDia[d] || { total: 0 }; porDia[d].total++; porDia[d][i.evento] = (porDia[d][i.evento] || 0) + 1 }
  const embudoCandidata = ['muestra_vista', 'muestra_calificada', 'constancia_copiada'].map(e => ({ evento: e, n: conteo[e] }))
  const embudoDueno = ['decision_abierta', 'decision_enviada'].map(e => ({ evento: e, n: conteo[e] }))
  // Por fuente (semana 15): cuántas veces pasó cada evento por cada canal. Sin fuente = llegó sin etiqueta.
  const porFuente = Object.fromEntries(FUENTES_LOG.map(f => [f, {}]))
  for (const i of recientes) if (i.fuente && porFuente[i.fuente]) porFuente[i.fuente][i.evento] = (porFuente[i.fuente][i.evento] || 0) + 1
  return { dias, total: recientes.length, conteo, porDia, porFuente, embudoCandidata, embudoDueno, verificaciones: conteo.constancia_verificada, regresos: conteo.regreso }
}
