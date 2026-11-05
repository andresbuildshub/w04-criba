import { NextResponse } from 'next/server'
import { validar, registrar, leerEventos, resumirEventos, EVENTOS } from '../../../lib/eventos'

export const dynamic = 'force-dynamic'

// GET: conteos públicos (lo mismo que ve /metrica). Nunca filas por persona: no existen.
export async function GET() {
  const { items, persistencia } = await leerEventos()
  return NextResponse.json({ resumen: resumirEventos(items), eventos: EVENTOS, persistencia })
}

// POST {evento, pantalla}: lista cerrada, sin identificadores. Cualquier campo extra → 400.
export async function POST(req) {
  let b; try { b = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }
  const item = validar(b)
  if (!item) return NextResponse.json({ error: 'Evento no permitido' }, { status: 400 })
  const persistencia = await registrar(item)
  return NextResponse.json({ ok: true, persistencia }, { status: 201 })
}
