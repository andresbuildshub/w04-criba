// Semana 13 · fix #1 (ranking ciego): la muestra deja de ser autorreferencial.
// El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos.
// Criba registra el INTENTO sin identidad: código, convocatoria, inicio, entrega, qué marcó. Ni nombre, ni teléfono, ni correo.
// La muestra LIBRE (/muestra sin enlace) sigue existiendo y sigue sin guardar nada.
//
// Persistencia: Vercel Blob, SOLO archivos inmutables (nunca se sobreescribe nada: un blob sobreescrito puede leerse viejo desde el CDN
// y dejar pasar un segundo uso). El estado de la ventana vive en los NOMBRES de los archivos:
//   convocatorias/<ID>.json                     (creada; trae despacho y expira)
//   convocatorias/<ID>.abierta.<ISO>.json       (primer acceso)
//   convocatorias/<ID>.entregada.<ISO>.json     (entrega)
//   intentos/<CODIGO>.json                      (el intento, sin identidad)
import { put, list } from '@vercel/blob'
import { randomBytes } from 'node:crypto'

const P_CONV = 'w04-criba/convocatorias/'
const P_INT = 'w04-criba/intentos/'
export const VENTANA_MIN = 60
export const CADUCA_H = 24
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const memoria = new Map()   // sin token: pathname → objeto

export function hayBlob() { return Boolean(process.env.BLOB_READ_WRITE_TOKEN) }
export function codigo(n = 8) { const b = randomBytes(n); let s = ''; for (let i = 0; i < n; i++) s += ALFABETO[b[i] % ALFABETO.length]; return n === 8 ? s.slice(0, 4) + '-' + s.slice(4) : s }
const safe = iso => iso.replace(/[:.]/g, '-')
const unsafe = s => s.replace(/^(\d{4}-\d{2}-\d{2}T\d{2})-(\d{2})-(\d{2})-(\d{3})Z$/, '$1:$2:$3.$4Z')

async function escribir(pathname, obj) {
  if (!hayBlob()) { memoria.set(pathname, { pathname, obj }); return }
  await put(pathname, JSON.stringify(obj), { access: 'public', addRandomSuffix: false, contentType: 'application/json' })
}
async function listar(prefix) {
  if (!hayBlob()) return [...memoria.values()].filter(v => v.pathname.startsWith(prefix))
  const out = []; let cursor
  do { const r = await list({ prefix, limit: 100, cursor }); out.push(...r.blobs); cursor = r.hasMore ? r.cursor : undefined } while (cursor)
  return out
}
async function leerBlob(b) {
  if (!hayBlob()) return b.obj
  return fetch(b.url, { cache: 'no-store' }).then(r => r.json()).catch(() => null)
}

// Etiqueta del despacho: la pone el dueño, es el nombre de su negocio, ≤40 chars, sin @ ni dígitos largos (no queremos correos ni teléfonos aquí).
export function limpiarDespacho(s) {
  const t = String(s || '').replace(/[<>]/g, '').trim().slice(0, 40)
  if (t.length < 2 || /@|\d{6,}/.test(t)) return null
  return t
}

export async function crearConvocatoria(despacho) {
  const id = codigo(10)
  const creada = new Date()
  const c = { id, despacho, creada: creada.toISOString(), expira: new Date(creada.getTime() + CADUCA_H * 36e5).toISOString() }
  await escribir(`${P_CONV}${id}.json`, c)
  return { ...c, abierta: null, entregada: null }
}

export async function leerConvocatoria(id) {
  if (!/^[A-Z2-9]{10}$/.test(String(id || ''))) return null
  const blobs = await listar(`${P_CONV}${id}`)
  const base = blobs.find(b => b.pathname === `${P_CONV}${id}.json`)
  if (!base) return null
  const c = await leerBlob(base); if (!c) return null
  const marca = tipo => { const m = blobs.map(b => b.pathname.match(new RegExp(`^${P_CONV}${id}\\.${tipo}\\.(.+)\\.json$`))).filter(Boolean).map(m => unsafe(m[1])).sort(); return m[0] || null }
  return { ...c, abierta: marca('abierta'), entregada: marca('entregada') }
}

// Estado de la ventana para la candidata que abre el enlace.
export function estado(c, ahora = new Date()) {
  if (!c) return { ok: false, motivo: 'no_existe' }
  if (c.entregada) return { ok: false, motivo: 'ya_entregada' }
  if (ahora > new Date(c.expira) && !c.abierta) return { ok: false, motivo: 'caducada' }
  if (c.abierta) {
    const fin = new Date(new Date(c.abierta).getTime() + VENTANA_MIN * 6e4)
    if (ahora > fin) return { ok: false, motivo: 'ventana_cerrada' }
    return { ok: true, abierta: c.abierta, fin: fin.toISOString() }
  }
  return { ok: true, abierta: null }
}

// Primer acceso: arranca los 60 minutos (archivo nuevo, nunca sobreescribe). Idempotente.
export async function abrir(c) {
  if (c.abierta) return c
  const ts = new Date().toISOString()
  await escribir(`${P_CONV}${c.id}.abierta.${safe(ts)}.json`, { id: c.id, abierta: ts })
  return { ...c, abierta: ts }
}

// Entrega: guarda el intento (sin identidad) y marca la convocatoria como entregada. Devuelve el intento con su código.
export async function registrarIntento(c, resultado) {
  const cod = codigo(8)
  const entrega = new Date().toISOString()
  const intento = { codigo: cod, convocatoria: c.id, despacho: c.despacho, inicio: c.abierta, entrega, ...resultado }
  await escribir(`${P_INT}${cod}.json`, intento)
  await escribir(`${P_CONV}${c.id}.entregada.${safe(entrega)}.json`, { id: c.id, entregada: entrega, codigo: cod })
  return intento
}

export async function leerIntento(cod) {
  const k = String(cod || '').toUpperCase().trim()
  if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(k)) return null
  const blobs = await listar(`${P_INT}${k}.json`)
  const b = blobs.find(x => x.pathname === `${P_INT}${k}.json`)
  return b ? leerBlob(b) : null
}

export function minutos(a, b) { return Math.round((new Date(b) - new Date(a)) / 6e4) }
export function horaMX(iso) { return new Date(iso).toLocaleString('es-MX', { timeZone: 'America/Mexico_City', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
