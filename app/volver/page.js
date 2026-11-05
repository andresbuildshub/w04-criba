import Evento from '../Evento'
import Link from 'next/link'
// Enlace "volver": se entrega al final de una sesión de prueba. Abrirlo cuenta como segunda visita declarada (evento "regreso").
// No lleva código ni identificador: cuenta regresos, no personas.
export default function Volver() {
  return (
    <div className="max-w-2xl space-y-6">
      <Evento evento="regreso" pantalla="otra" />
      <h1 className="text-3xl font-bold">Gracias por volver.</h1>
      <p className="text-neutral-300">Esta visita se contó como un regreso (sin saber quién es usted). Siga por donde quiera:</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/decision" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 hover:border-amber-300">Soy despacho → dar mi decisión</Link>
        <Link href="/muestra" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 hover:border-amber-300">Soy candidata/o → hacer la muestra</Link>
      </div>
    </div>
  )
}
