import { NextResponse } from 'next/server'
import { crearConvocatoria, limpiarDespacho, leerConvocatoria, estado } from '../../../lib/convocatorias'

export const dynamic = 'force-dynamic'

// POST {despacho} → enlace de un solo uso. Sin registro, sin teléfono, sin correo.
export async function POST(req) {
  let b; try { b = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }
  if (typeof b !== 'object' || b === null || Object.keys(b).some(k => !['despacho', 'web'].includes(k))) return NextResponse.json({ error: 'Campos no permitidos' }, { status: 400 })
  if (b.web) return NextResponse.json({ ok: true })   // honeypot
  const despacho = limpiarDespacho(b.despacho)
  if (!despacho) return NextResponse.json({ error: 'Escriba el nombre del despacho (2–40 letras, sin correo ni teléfono).' }, { status: 400 })
  const c = await crearConvocatoria(despacho)
  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://w04-criba.vercel.app').replace(/\/$/, '')
  return NextResponse.json({ ok: true, id: c.id, despacho: c.despacho, expira: c.expira, enlace: `${base}/muestra?conv=${c.id}` }, { status: 201 })
}

// GET ?id= → estado de la ventana (para que el dueño vea si ya se abrió / entregó). No devuelve el intento.
export async function GET(req) {
  const id = new URL(req.url).searchParams.get('id')
  const c = await leerConvocatoria(id)
  if (!c) return NextResponse.json({ error: 'No existe' }, { status: 404 })
  return NextResponse.json({ id: c.id, despacho: c.despacho, creada: c.creada, expira: c.expira, abierta: c.abierta, entregada: c.entregada, estado: estado(c) })
}
