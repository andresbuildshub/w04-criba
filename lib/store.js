// Bitácora de decisiones de dueños de despacho (Condición 1). Sin datos personales: no se pide nombre, correo ni teléfono.
// Persistencia: Vercel Blob (un archivo inmutable por respuesta → sin problemas de caché). Sin token → memoria (etiquetado en la UI).
import { put, list } from '@vercel/blob'
const PREFIX = 'w04-criba/respuestas/'
const memoria = []

export async function leer() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { items: [...memoria], persistencia: 'memoria (no persistente)' }
  const { blobs } = await list({ prefix: PREFIX, limit: 1000 })
  const items = await Promise.all(blobs.map(b => fetch(b.url, { cache: 'no-store' }).then(r => r.json()).catch(() => null)))
  return { items: items.filter(Boolean).sort((a, b) => a.ts.localeCompare(b.ts)), persistencia: 'Vercel Blob' }
}

export async function agregar(item) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) { memoria.push(item); return 'memoria' }
  await put(`${PREFIX}${item.ts.replace(/[:.]/g, '-')}.json`, JSON.stringify(item), { access: 'public', addRandomSuffix: true, contentType: 'application/json' })
  return 'Vercel Blob'
}

// Respuestas DEMO (inventadas, etiquetadas) — se muestran aparte y NUNCA cuentan para el criterio 5-de-20.
export const DEMO = [
  { id: 'demo-1', demo: true, ts: '2026-09-06T10:00:00Z', rol: 'dueño', tamano: '1-5', decision: 'si_cambios', cambios: ['mas_casos'], comentario: 'Le pondría casos de IVA acreditable. Con eso sí lo uso antes de entrevistar.' },
  { id: 'demo-2', demo: true, ts: '2026-09-06T10:05:00Z', rol: 'dueño', tamano: '6-20', decision: 'no', cambios: ['nada'], comentario: 'Yo contrato por recomendación. No cambio eso por una prueba.' },
  { id: 'demo-3', demo: true, ts: '2026-09-06T10:10:00Z', rol: 'gerente', tamano: '6-20', decision: 'si', cambios: [], comentario: 'Si la candidata llega con esto, me ahorro la primera entrevista.' },
]

export const OPCIONES = {
  rol: ['dueño', 'gerente', 'contador_senior', 'otro'],
  tamano: ['1-5', '6-20', '21-50', 'mas_50'],
  decision: ['si', 'si_cambios', 'no'],
  cambios: ['mas_casos', 'menos_tiempo', 'presencial', 'sello_colegio', 'nada'],
}
export const ETIQUETAS = {
  rol: { dueño: 'Dueño/a del despacho', gerente: 'Gerente / encargado', contador_senior: 'Contador/a senior', otro: 'Otro' },
  tamano: { '1-5': '1–5 personas', '6-20': '6–20', '21-50': '21–50', mas_50: 'Más de 50' },
  decision: { si: 'Sí, la usaría para preseleccionar', si_cambios: 'Sí, con cambios', no: 'No' },
  cambios: { mas_casos: 'Más casos (IVA, nómina)', menos_tiempo: 'Que dure menos', presencial: 'Que se aplique presencial', sello_colegio: 'Que la avale un Colegio', nada: 'Nada la haría útil' },
}

export const UMBRAL = { minimo_si: 5, muestra: 20 }   // criterio de muerte del Blueprint: 5 de 20 dueños
export function resumir(items) {
  const reales = items.filter(i => !i.demo)
  const si = reales.filter(i => i.decision === 'si' || i.decision === 'si_cambios').length
  return { n: reales.length, si, no: reales.length - si, umbral: UMBRAL, cumple: si >= UMBRAL.minimo_si, cerrado: reales.length >= UMBRAL.muestra }
}
