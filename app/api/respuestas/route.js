import { NextResponse } from 'next/server'
import { leer, agregar, OPCIONES, DEMO, resumir } from '../../../lib/store'

export const dynamic = 'force-dynamic'
export async function GET() {
  const { items, persistencia } = await leer()
  return NextResponse.json({ items, demo: DEMO, resumen: resumir(items), persistencia })
}

export async function POST(req) {
  let b; try { b = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }
  // Validación estricta: solo campos esperados, solo valores permitidos, longitud acotada. Sin datos personales.
  if (typeof b !== 'object' || b === null) return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 })
  if (b.web) return NextResponse.json({ ok: true })   // honeypot: los bots llenan el campo oculto
  const permitidos = ['rol', 'tamano', 'decision', 'cambios', 'comentario', 'web']
  if (Object.keys(b).some(k => !permitidos.includes(k))) return NextResponse.json({ error: 'Campos no permitidos' }, { status: 400 })
  for (const k of ['rol', 'tamano', 'decision']) if (!OPCIONES[k].includes(b[k])) return NextResponse.json({ error: `Valor inválido en ${k}` }, { status: 400 })
  const cambios = Array.isArray(b.cambios) ? b.cambios.filter(c => OPCIONES.cambios.includes(c)).slice(0, 5) : []
  const comentario = typeof b.comentario === 'string' ? b.comentario.replace(/[<>]/g, '').trim().slice(0, 300) : ''
  const item = { id: Math.random().toString(36).slice(2, 10), demo: false, ts: new Date().toISOString(), rol: b.rol, tamano: b.tamano, decision: b.decision, cambios, comentario }
  const persistencia = await agregar(item)
  return NextResponse.json({ ok: true, persistencia }, { status: 201 })
}
