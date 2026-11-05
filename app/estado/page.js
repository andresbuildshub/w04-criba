import { leerConvocatoria, estado, horaMX } from '../../lib/convocatorias'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
// Página normal para el dueño: ¿ya se abrió? ¿ya entregó? Sin cuenta: quien tiene el enlace, ve el estado. No muestra el intento ni el código.
export default async function Estado({ searchParams }) {
  const q = await searchParams
  const c = await leerConvocatoria(q.id)
  const e = estado(c)
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm uppercase tracking-widest text-amber-300">Estado de su enlace</p>
      <h1 className="text-3xl font-bold">{!c ? 'Este enlace no existe' : c.entregada ? 'Ya entregó' : c.abierta ? (e.ok ? 'Lo abrió; está en sus 60 minutos' : 'Lo abrió y se le acabó el tiempo sin entregar') : (e.motivo === 'caducada' ? 'Caducó sin abrirse' : 'Todavía no lo abre')}</h1>
      {c && <ul className="space-y-1 text-neutral-300">
        <li>Despacho: <b>{c.despacho}</b> · creado {horaMX(c.creada)} · caduca {horaMX(c.expira)} si no se abre.</li>
        {c.abierta && <li>Abierto: {horaMX(c.abierta)}</li>}
        {c.entregada && <li>Entregado: {horaMX(c.entregada)}. La candidata tiene la constancia y el código; cuando se lo mande, ábralo en <Link href="/verificar" className="underline">verificar</Link>.</li>}
      </ul>}
      <p className="text-xs text-neutral-500">Esta página no guarda nada ni sabe quién la abrió.</p>
    </div>
  )
}
