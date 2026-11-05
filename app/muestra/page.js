import Link from 'next/link'
import { CFDIS, CLIENTE, RUBRICA_VERSION } from '../../lib/muestra'
import { leerConvocatoria, estado, abrir, VENTANA_MIN } from '../../lib/convocatorias'
import Muestra from './Muestra'

export const dynamic = 'force-dynamic'

// Server component: la verdad de terreno (campo `error`) se quita ANTES de enviar al navegador.
// Con ?conv=ID (fix #1, semana 13): valida la ventana del dueño y la abre al primer acceso (60 min, un solo uso).
export default async function Page({ searchParams }) {
  const q = await searchParams
  const publicos = CFDIS.map(({ error, ...c }) => c)
  let ventana = null
  if (q?.conv) {
    let c = await leerConvocatoria(q.conv)
    let e = estado(c)
    if (e.ok && !c.abierta) { c = await abrir(c); e = estado(c) }
    if (!e.ok) {
      const razon = { no_existe: 'Este enlace no existe o está mal copiado.', ya_entregada: 'Este enlace ya se usó: la muestra ya fue entregada.', caducada: 'Este enlace caducó (24 horas sin abrirse).', ventana_cerrada: `Este enlace ya se abrió y pasaron los ${VENTANA_MIN} minutos.` }[e.motivo]
      return (
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold">No se puede abrir esta muestra</h1>
          <p className="text-neutral-300">{razon} Pídale al despacho un enlace nuevo. Si solo quiere practicar, la <Link href="/muestra" className="underline">muestra libre</Link> sigue abierta (esa no se registra).</p>
        </div>
      )
    }
    ventana = { id: c.id, despacho: c.despacho, abierta: c.abierta, fin: e.fin, minutos: VENTANA_MIN }
  }
  return <Muestra cfdis={publicos} cliente={CLIENTE} version={RUBRICA_VERSION} ventana={ventana} />
}
