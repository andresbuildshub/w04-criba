// Semana 13 · fix #1 (ranking ciego): la muestra deja de ser autorreferencial.
// El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos.
// Criba registra el INTENTO sin identidad: código, convocatoria, inicio, entrega, qué marcó. Ni nombre, ni teléfono, ni correo.
// La muestra LIBRE (/muestra sin enlace) sigue existiendo y sigue sin guardar nada.
import { put, list } from '@vercel/blob'
import { randomBytes } from 'node:crypto'

const P_CONV = 'w04-criba/convocatorias/'
const P_INT = 'w04-criba/intentos/'
export const VENTANA_MIN = 60
export const CADUCA_H = 24
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const memoria = { conv: new Map(), int: new Map() }

export function hayBlob() { return Boolean(process.env.BLOB_READ_WRITE_TOKEN) }
export function codigo(n = 8) { const b = randomBytes(n); let s = ''; for (let i = 0; i < n; i++) s += ALFABETO[b[i] % ALFABETO.length]; return n === 8 ? s.slice(0, 4) + '-' + s.slice(4) : s }

async function leerJson(prefix, id) {
  if (!hayBlob()) return (prefix === P_CONV ? memoria.conv : memoria.int).get(id) || null
  const { blobs } = await list({ prefix: `${prefix}${id}.json`, limit: 1 })
  if (!blobs.length) return null
  return fetch(blobs[0].url, { cache: 'no-store' }).then(r => r.json()).catch(() => null)
}
async function escribirJson(prefix, id, obj) {
  if (!hayBlob()) { (prefix === P_CONV ? memoria.conv : memoria.int).set(id, obj); return }
  await put(`${prefix}${id}.json`, JSON.stringify(obj), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' })
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
  const c = { id, despacho, creada: creada.toISOString(), expira: new Date(creada.getTime() + CADUCA_H * 36e5).toISOString(), abierta: null, entregada: null }
  await escribirJson(P_CONV, id, c)
  return c
}

export async function leerConvocatoria(id) {
  if (!/^[A-Z2-9]{10}$/.test(String(id || ''))) return null
  return leerJson(P_CONV, id)
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

// Primer acceso: arranca los 60 minutos. Idempotente.
export async function abrir(c) {
  if (c.abierta) return c
  const n = { ...c, abierta: new Date().toISOString() }
  await escribirJson(P_CONV, c.id, n)
  return n
}

// Entrega: guarda el intento (sin identidad) y cierra la convocatoria. Devuelve el intento con su código.
export async function registrarIntento(c, resultado) {
  const cod = codigo(8)
  const entrega = new Date().toISOString()
  const intento = { codigo: cod, convocatoria: c.id, despacho: c.despacho, inicio: c.abierta, entrega, ...resultado }
  await escribirJson(P_INT, cod, intento)
  await escribirJson(P_CONV, c.id, { ...c, entregada: entrega })
  return intento
}

export async function leerIntento(cod) {
  const k = String(cod || '').toUpperCase().trim()
  if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(k)) return null
  return leerJson(P_INT, k)
}

export function minutos(a, b) { return Math.round((new Date(b) - new Date(a)) / 6e4) }
export function horaMX(iso) { return new Date(iso).toLocaleString('es-MX', { timeZone: 'America/Mexico_City', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }
