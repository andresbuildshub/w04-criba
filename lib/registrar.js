'use client'
// Envía un evento al log. Nunca manda identificadores ni texto. Falla en silencio: el log nunca rompe el producto.
export function registrar(evento, pantalla) {
  try {
    const body = JSON.stringify({ evento, pantalla })
    if (navigator.sendBeacon) { navigator.sendBeacon('/api/eventos', new Blob([body], { type: 'application/json' })); return }
    fetch('/api/eventos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  } catch {}
}
