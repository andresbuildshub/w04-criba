import Lectura from './Lectura'
import { PIEZAS, BASE } from '../../lib/piezas'
import { DEMO_ENTREGA, DEMO_CLIENTE } from '../../lib/demo'
import Entrega from '../Entrega'

// Pieza A · Serie 1 «Lea una entrega». El socio hace SU tarea: leer. No clasifica facturas.
export const metadata = {
  title: 'Criba — lea una entrega (2 minutos)',
  description: PIEZAS.a.textos.titular || 'Lea una entrega',
  openGraph: { title: PIEZAS.a.textos.titular || 'Lea una entrega', description: 'Datos inventados. Sin registro. Proyecto de estudiante.', images: [{ url: `${BASE}/piezas/b.png`, width: 1080, height: 1350 }] },
}

export default function Page() {
  if (!PIEZAS.a.textos.titular) return <p className="text-amber-200">Esta pieza todavía está en el proceso de revisión. Mientras tanto: <a className="underline" href="/despachos">/despachos</a>.</p>
  return <Lectura t={PIEZAS.a.textos} noDice={PIEZAS.a.noDice}><Entrega e={DEMO_ENTREGA} cliente={DEMO_CLIENTE} /></Lectura>
}
