'use client'
import { FUENTES_LOG } from './fuentes.js'
// Envía un evento al log. Nunca manda identificadores ni texto. Falla en silencio: el log nunca rompe el producto.
// Semana 15: si la página se abrió con ?f=<fuente de la lista cerrada>, el evento lleva esa fuente (un canal, no una persona).
export function fuenteActual() {
  try { const f = new URLSearchParams(window.location.search).get('f'); return FUENTES_LOG.includes(f) ? f : null } catch { return null }
}
export function registrar(evento, pantalla) {
  try {
    const f = fuenteActual()
    const body = JSON.stringify(f ? { evento, pantalla, fuente: f } : { evento, pantalla })
    if (navigator.sendBeacon) { navigator.sendBeacon('/api/eventos', new Blob([body], { type: 'application/json' })); return }
    fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  } catch {}
}
// Agrega la fuente actual a un enlace interno, para que el siguiente paso se cuente en el mismo canal.
export function conFuente(href) { const f = fuenteActual(); return f ? `${href}${href.includes('?') ? '&' : '?'}f=${f}` : href }
