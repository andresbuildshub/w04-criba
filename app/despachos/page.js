import Link from 'next/link'
import Entrega from '../Entrega'
import Llegada from '../Llegada'
import Pasos from '../Pasos'
import { PRIMERA_LINEA, PROMESA, POSICION, NO_PROMETO, BASE } from '../../lib/piezas'
import { DEMO_ENTREGA, DEMO_CLIENTE } from '../../lib/demo'

// Semana 15 — la página del socio. Es a donde aterriza la Pieza B y lo que se reenvía a un colega.
// La vista previa del enlace en WhatsApp es la propia Pieza B.
export const metadata = {
  title: 'Criba para despachos — lo que su finalista entregó, a la vista',
  description: PROMESA,
  openGraph: { title: PRIMERA_LINEA, description: 'Datos inventados. Sin registro. Proyecto de estudiante.', images: [{ url: `${BASE}/piezas/b.png`, width: 1080, height: 1350 }] },
}

export default function Despachos() {
  return (
    <div className="max-w-2xl space-y-8">
      <Llegada evento="despachos_visto" pantalla="despachos" />
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para socios de despacho contable</p>
        <h1 className="text-3xl font-bold leading-tight">{PRIMERA_LINEA}</h1>
        <p className="text-lg text-neutral-300">{PROMESA}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Esto es lo que ve</h2>
        <p className="text-neutral-300">Una finalista que no existe hizo la muestra: 20 facturas ya clasificadas, 4 estaban mal. Así se lee su entrega. Con la suya verá estos mismos datos.</p>
        <Entrega e={DEMO_ENTREGA} cliente={DEMO_CLIENTE} />
        <p className="text-sm text-neutral-400">Siempre es una persona por pantalla. Criba no pone a dos finalistas lado a lado, no las ordena y no muestra cuántos minutos le tomó a cada una.</p>
        <p><Link href="/lectura" className="underline">Léala con calma y diga qué le preguntaría (2 minutos)</Link></p>
      </section>

      <section className="space-y-2 rounded-2xl border border-neutral-800 p-5">
        <h2 className="font-semibold">{POSICION}</h2>
        <p className="text-neutral-300">Lo que no le prometo: {NO_PROMETO.principal.toLowerCase()} Tampoco le digo {NO_PROMETO.tambien.map(t => t.replace(/\.$/, '').replace(/^Que /, 'que ').replace(/^Cómo /, 'cómo ')).join('; ')}.</p>
        <p className="text-sm text-neutral-400">Si lo que busca es una lista ordenada de candidatas con "apta" o "no apta", Criba no es para usted, y prefiero decírselo aquí.</p>
      </section>

      <Pasos pantalla="despachos" />

      <section className="space-y-2 text-sm text-neutral-300">
        <h2 className="font-semibold text-neutral-100">Cómo va esto, con sus ceros</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Despachos que han contestado las tres preguntas: <b>0 de 20</b> (<Link href="/tablero" className="underline">tablero</Link>).</li>
          <li>Conversaciones reales de precio con el dueño de un despacho: <b>1</b> (<Link href="/about" className="underline">memo</Link>).</li>
          <li>Finalistas reales que han usado una ventana: <b>0</b>. La pantalla está probada con pruebas automáticas, no con una contratación de verdad.</li>
          <li>Precio: la primera ventana de cada vacante es gratis; las demás, MX$490 por vacante, por transferencia y con recibo simple. Todavía no puedo dar factura.</li>
        </ul>
        <p className="text-xs text-neutral-500">Cómo se escribió esta página y qué se le cortó: <Link href="/proceso" className="underline">proceso</Link>. Quién la hace: Andrés Álvarez Morphy, estudiante (andres.builder@gmail.com).</p>
      </section>
    </div>
  )
}
