// Semana 14 — UNA sola fuente de verdad para /pricing, /simulador y /about.
// La aclaración del curso: "las mismas suposiciones en la página de precios, el simulador y el memo; marca qué mediste y qué supusiste".
// Cada supuesto lleva: valor, unidad, tipo ('medido' | 'supuesto' | 'decisión') y fuente. Nada se calcula fuera de este archivo.

export const TIERS = [
  {
    id: 'gratis', nombre: 'Gratis', precio: 0, unidad: 'siempre',
    para: 'Cualquier despacho, cualquier vacante',
    incluye: ['La primera ventana registrada de cada vacante', 'Verificar cualquier constancia, siempre', 'La rúbrica pública'],
    porque: 'Ninguna candidata se queda sin registro porque el despacho no pagó: "ábrame una ventana, la primera es gratis".',
  },
  {
    id: 'vacante', nombre: 'Por vacante', precio: 490, unidad: 'por vacante · 30 días',
    para: 'Segmento 1: despacho de 1–20 personas sin RH, 1–2 contrataciones al año',
    incluye: ['Ventanas 2 a 10 en esa vacante (probar a todas sus finalistas)', '30 días desde la primera ventana pagada', 'Set de CFDIs del mes, validado por un contador'],
    porque: 'Un despacho chico contrata una o dos veces al año: no le sirve una mensualidad.',
  },
  {
    id: 'anual', nombre: 'Despacho con RH', precio: 4900, unidad: 'por año · hasta 12 vacantes',
    para: 'Segmento 2: despacho de 21–50 personas con alguien de RH, 4+ contrataciones al año',
    incluye: ['Hasta 12 vacantes en el año, 10 ventanas cada una', '≈ MX$408 por vacante (el descuento es por pagar adelantado)', 'Lo mismo que "Por vacante"'],
    porque: 'Contrata varias veces al año y paga por adelantado. Segmento SUPUESTO: no he visto a ningún usuario de este tamaño.',
  },
]

// --- Supuestos del memo 10:1 (una vacante, caso base: 3 finalistas) ---
export const MEMO = {
  sueldo: { v: 10861, u: 'MX$/mes', tipo: 'medido', fuente: 'Indeed México, auxiliar contable, act. 2026-06-23 (7 vacantes); anuncios OCC/Computrabajo MX$10–17k' },
  cargas: { v: 0.30, u: 'sobre el sueldo', tipo: 'supuesto', fuente: 'IMSS, INFONAVIT, aguinaldo y vacaciones prorrateados; no lo calculé por despacho' },
  pMala: { v: 0.25, u: 'de las contrataciones', tipo: 'supuesto', fuente: 'Apli 2022 vía Publimetro: 25% rotación temprana (40% "no exitosas"); estudio de vendor, no leí el original' },
  deteccion: { v: 0.5, u: 'de las malas que Criba detecta antes', tipo: 'supuesto', fuente: 'Nadie lo ha medido, ni con un solo dueño real' },
  fraccion: { v: 2 / 3, u: 'del valor que agregan las finalistas 2 y 3', tipo: 'supuesto', fuente: 'Con 3 finalistas y la primera gratis; el valor de COMPARAR puede ser mayor o menor que ⅔' },
  precio: { v: 490, u: 'MX$/vacante', tipo: 'decisión', fuente: 'Brain Bending semana 14; recibo simple, sin IVA (todavía no hay RFC con actividad)' },
}

export const HOY = [
  { que: 'Periodo de prueba (LFT art. 39-A, hasta 30 días)', costo: 'un mes de sueldo + cargas ≈ MX$14,119 por candidata que no sirve', tipo: 'medido (ley y sueldo) + supuesto (cargas)', nota: 'Ya es una muestra de trabajo, solo que más lenta y pagada. Es la que de verdad compite con Criba.' },
  { que: 'Anuncio en OCC Mundial (Clásica)', costo: 'MX$1,599 + IVA por ~60 días', tipo: 'medido (occ.com.mx/empresas/precios)', nota: 'Le TRAE candidatas y Criba no. Es un complemento: los MX$490 se suman, no lo reemplazan.' },
  { que: 'Entrevista + una factura impresa', costo: 'MX$0 en efectivo; horas del dueño', tipo: 'supuesto', nota: 'Hacer nada cuesta cero en efectivo. Criba solo puede ganar en riesgo y horas.' },
  { que: 'Recomendación (la cuñada)', costo: 'MX$0', tipo: 'supuesto', nota: 'Contratación por confianza, no por evaluación. A este dueño Criba no le sirve, y lo digo.' },
]

export function costoMala(m = MEMO) { return m.sueldo.v * (1 + m.cargas.v) }
export function valorVacante(m = MEMO) { return m.pMala.v * costoMala(m) * m.deteccion.v * m.fraccion.v }
export function ratio(m = MEMO) { return valorVacante(m) / m.precio.v }
// ¿Cuánto tendría que costar una mala contratación para que el ratio llegue a `objetivo`?
export function umbralCosto(objetivo = 10, m = MEMO) { return (objetivo * m.precio.v) / (m.pMala.v * m.deteccion.v * m.fraccion.v) }
export function sensibilidad(m = MEMO) {
  const out = []
  for (const p of [0.25, 0.40]) for (const d of [0.5, 0.7]) {
    const mm = { ...m, pMala: { ...m.pMala, v: p }, deteccion: { ...m.deteccion, v: d } }
    out.push({ pMala: p, deteccion: d, valor: valorVacante(mm), ratio: ratio(mm) })
  }
  return out
}

// --- Simulador de ingresos ---
// Cada campo: base, min, max, paso, tipo, fuente. Los topes también sirven para validar escenarios que llegan por enlace.
export const CAMPOS = {
  despachos: { label: 'Unidades de contabilidad en México (DENUE)', base: 16924, min: 0, max: 20000, paso: 1, u: 'unidades', tipo: 'medido', fuente: 'DENUE mayo 2026, rama 5412 (contabilidad, auditoría y relacionados; más amplia que "despachos")' },
  alcance: { label: 'Cuántos conocen Criba en un año', base: 0.05, min: 0, max: 1, paso: 0.01, u: '%', tipo: 'supuesto', fuente: 'Hoy: 0 de 20 en 60 días. Sin canal de distribución medido' },
  conversion: { label: 'De los que la conocen, cuántos pagan al menos una vacante', base: 0.10, min: 0, max: 1, paso: 0.01, u: '%', tipo: 'supuesto', fuente: 'Cero conversaciones de precio todavía. La conversación real del jueves 12 es el primer dato' },
  vacantes: { label: 'Vacantes de auxiliar al año por despacho', base: 1.5, min: 0, max: 12, paso: 0.5, u: 'vacantes', tipo: 'supuesto', fuente: '"Una o dos al año" (inferencia, no medido)' },
  pagan: { label: 'Vacantes con 2+ finalistas (las que pagan)', base: 0.60, min: 0, max: 1, paso: 0.05, u: '%', tipo: 'supuesto', fuente: 'La pregunta "¿a cuántas finalistas entrevistaste?" lo mide; hoy no hay dato' },
  precioVacante: { label: 'Precio por vacante', base: 490, min: 0, max: 5000, paso: 10, u: 'MX$', tipo: 'decisión', fuente: 'Brain Bending semana 14' },
  despachos2: { label: 'Despachos de 21–50 personas con RH', base: 800, min: 0, max: 5000, paso: 10, u: 'unidades', tipo: 'supuesto', fuente: 'No lo medí en DENUE por estrato; orden de magnitud' },
  conversion2: { label: 'De ellos, cuántos compran el plan anual', base: 0.05, min: 0, max: 1, paso: 0.01, u: '%', tipo: 'supuesto', fuente: 'Ningún usuario visto en este segmento' },
  precioAnual: { label: 'Precio del plan anual', base: 4900, min: 0, max: 50000, paso: 100, u: 'MX$', tipo: 'decisión', fuente: 'Contra TestGorilla Core ≈ MX$46,800/año: 9.5:1, solo SI lo usan (supuesto)' },
  costoSet: { label: 'Validar el set de CFDIs del mes', base: 400, min: 0, max: 10000, paso: 50, u: 'MX$/mes', tipo: 'supuesto', fuente: '1 hora de contador a MX$300–500 (supuesto)' },
  otrosFijos: { label: 'Otros fijos (dominio, etc.)', base: 25, min: 0, max: 10000, paso: 5, u: 'MX$/mes', tipo: 'supuesto', fuente: 'Un .com ≈ MX$200–400 al año (sin cotizar)' },
}

export const BASE = Object.fromEntries(Object.entries(CAMPOS).map(([k, c]) => [k, c.base]))

export const PRESETS = [
  { nombre: 'Base (el del memo)', valores: { ...BASE } },
  { nombre: 'Pesimista', valores: { ...BASE, alcance: 0.02, conversion: 0.05, pagan: 0.40, conversion2: 0.02 } },
  { nombre: 'Optimista', valores: { ...BASE, alcance: 0.10, conversion: 0.20, pagan: 0.75, conversion2: 0.10 } },
]

export function simular(v) {
  const clientes1 = v.despachos * v.alcance * v.conversion
  const vacantesPagadas = clientes1 * v.vacantes * v.pagan
  const ingreso1 = vacantesPagadas * v.precioVacante
  const clientes2 = v.despachos2 * v.alcance * v.conversion2
  const ingreso2 = clientes2 * v.precioAnual
  const ingresoAnual = ingreso1 + ingreso2
  const fijosAnual = (v.costoSet + v.otrosFijos) * 12
  const netoAnual = ingresoAnual - fijosAnual
  // ¿Cuántas vacantes pagadas al mes hacen falta para cubrir los fijos?
  const equilibrio = v.precioVacante > 0 ? (v.costoSet + v.otrosFijos) / v.precioVacante : Infinity
  return {
    clientes1, vacantesPagadas, ingreso1, clientes2, ingreso2,
    ingresoAnual, ingresoMensual: ingresoAnual / 12,
    fijosAnual, netoAnual, netoMensual: netoAnual / 12,
    equilibrioVacantesMes: equilibrio,
  }
}

// --- Escenarios: validar todo lo que llega del navegador o de un enlace ---
export function limpiarValores(obj) {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return null
  const out = { ...BASE }
  for (const [k, x] of Object.entries(obj)) {
    const c = CAMPOS[k]
    if (!c) return null                       // llave desconocida → todo el escenario se rechaza
    const n = typeof x === 'number' ? x : NaN
    if (!Number.isFinite(n)) return null      // texto, null, NaN, Infinity → rechazo
    out[k] = Math.min(c.max, Math.max(c.min, n))
  }
  return out
}

export function limpiarNombre(s) {
  return String(s ?? '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, 40) || 'Escenario sin nombre'
}

// base64url de JSON con solo las llaves que difieren del base (enlaces cortos).
export function codificar(v) {
  const dif = Object.fromEntries(Object.entries(v).filter(([k, x]) => CAMPOS[k] && x !== BASE[k]))
  const json = JSON.stringify(dif)
  const b64 = typeof Buffer !== 'undefined' ? Buffer.from(json, 'utf8').toString('base64') : btoa(unescape(encodeURIComponent(json)))
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodificar(s) {
  if (typeof s !== 'string' || s.length > 600 || !/^[A-Za-z0-9_-]*$/.test(s)) return null
  try {
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
    const json = typeof Buffer !== 'undefined' ? Buffer.from(b64, 'base64').toString('utf8') : decodeURIComponent(escape(atob(b64)))
    return limpiarValores(JSON.parse(json))
  } catch { return null }
}

export const fmt = n => Number.isFinite(n) ? '$' + Math.round(n).toLocaleString('es-MX') : '—'
export const pct = n => Math.round(n * 1000) / 10 + '%'
