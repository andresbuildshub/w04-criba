// Bitácora de eventos (semana 13: "un mecanismo de analítica, aunque sea un log simple").
// REGLA: el servidor guarda SOLO { evento, pantalla, dia }. Sin identificadores (ni IP, ni cookie, ni id de sesión),
// sin texto libre, sin códigos de constancia, y SIN HORA: con pocas visitas, una hora es un nombre. Solo el día.
// Nunca se puede unir un evento con una constancia ni con una persona.
// Persistencia: Vercel Blob, un archivo inmutable por evento. Sin token → memoria (etiquetado en /metrica).
import { put, list } from '@vercel/blob'

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
]
export const PANTALLAS = ['inicio', 'muestra', 'decision', 'tablero', 'rubrica', 'verificar', 'metrica', 'convocar', 'otra']

export function validar(b) {
  if (typeof b !== 'object' || b === null) return null
  if (!EVENTOS.includes(b.evento)) return null
  const pantalla = PANTALLAS.includes(b.pantalla) ? b.pantalla : 'otra'
  if (Object.keys(b).some(k => !['evento', 'pantalla'].includes(k))) return null
  return { evento: b.evento, pantalla, dia: new Date().toISOString().slice(0, 10) }
}

export async function registrar(item) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) { memoria.push(item); return 'memoria' }
  await put(`${PREFIX}${item.dia}-${item.evento}.json`, JSON.stringify(item), { access: 'public', addRandomSuffix: true, contentType: 'application/json' })
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
    const m = b.pathname.slice(PREFIX.length).match(/^(\d{4}-\d{2}-\d{2})-([a-z_]+)/)
    return m ? { evento: m[2], dia: m[1] } : null
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
  return { dias, total: recientes.length, conteo, porDia, embudoCandidata, embudoDueno, verificaciones: conteo.constancia_verificada, regresos: conteo.regreso }
}
