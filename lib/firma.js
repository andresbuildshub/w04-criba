// Firma de constancias (semana 13). El servidor NO guarda constancias (Condición 5: la evidencia es de la candidata).
// En su lugar firma el resultado: el código viaja dentro del texto de la constancia y /verificar lo recalcula.
// Sin secreto en el entorno → no hay código, y la UI lo dice (nunca se inventa una firma).
import { createHmac, timingSafeEqual } from 'node:crypto'

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'   // sin 0/O/1/I para dictarlo por teléfono

export function haySecreto() { return Boolean(process.env.CONSTANCIA_SECRET) }

// Lo que se firma: fecha (YYYY-MM-DD), versión de rúbrica, aciertos, falsos, verificaciones del mensaje, asistencia.
export function cargaFirmable({ fecha, version, aciertos, falsos, cumplidos, total, asistencia }) {
  return [fecha, version, aciertos, falsos, cumplidos, total, asistencia].join('|')
}

export function firmar(carga) {
  if (!haySecreto()) return null
  const h = createHmac('sha256', process.env.CONSTANCIA_SECRET).update(carga).digest()
  let out = ''
  for (let i = 0; i < 8; i++) out += ALFABETO[h[i] % ALFABETO.length]
  return out.slice(0, 4) + '-' + out.slice(4)
}

// El código solo sirve junto con los campos: /verificar pide los campos y comprueba que el código coincida.
export function verificar(campos, codigo) {
  if (!haySecreto() || typeof codigo !== 'string') return false
  const esperado = firmar(cargaFirmable(campos))
  const a = Buffer.from(esperado), b = Buffer.from(codigo.toUpperCase().trim())
  return a.length === b.length && timingSafeEqual(a, b)
}
