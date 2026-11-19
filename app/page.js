import Link from 'next/link'
import Evento from './Evento'
import { PRIMERA_LINEA, PROMESA } from '../lib/piezas'

export default function Home() {
  return (
    <div className="space-y-10">
      <Evento evento="inicio_visto" pantalla="inicio" />
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para socios de despacho contable</p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{PRIMERA_LINEA}</h1>
        <p className="max-w-2xl text-lg text-neutral-300">{PROMESA} Criba es una muestra de trabajo de 40 minutos para auxiliar contable: 20 facturas ya clasificadas, cuatro están mal.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/despachos" className="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-6 hover:border-emerald-300 sm:col-span-2">
          <h2 className="text-xl font-semibold">Soy socio de un despacho → ver qué voy a ver</h2>
          <p className="mt-2 text-neutral-400">La entrega de una finalista inventada, tal como se la enseña Criba antes de la oferta. Dos minutos, sin registro. Una persona por pantalla: sin ranking y sin "apta o no apta".</p>
        </Link>
        <Link href="/convocar" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-300">
          <h2 className="text-xl font-semibold">Tengo una finalista → abrirle la muestra</h2>
          <p className="mt-2 text-neutral-400">Un enlace de un solo uso: 24 horas para abrirlo, 60 minutos para entregar, una sola sesión. Se registra el intento sin nombre ni teléfono.</p>
        </Link>
        <Link href="/decision" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-300">
          <h2 className="text-xl font-semibold">Soy dueño/a de despacho → solo opinar (2 min, sin abrir nada)</h2>
          <p className="mt-2 text-neutral-400">Dos minutos, anónimo, sin hacer el examen: un resumen de la muestra y tres preguntas. Veinte respuestas deciden si esto sigue existiendo.</p>
        </Link>
        <Link href="/muestra" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-300 sm:col-span-2">
          <p className="text-xs uppercase tracking-widest text-amber-300">Para una junior sin experiencia, la prueba ES el CV</p>
          <h2 className="mt-1 text-xl font-semibold">Soy candidata/o → hacer la muestra</h2>
          <p className="mt-2 text-neutral-400">Sin cuenta y sin costo, siempre. Por tu cuenta puedes practicar; el registro que un despacho puede comprobar existe cuando el despacho te abre la ventana.</p>
        </Link>
      </section>

      <section className="rounded-2xl border border-amber-300/30 bg-amber-300/5 p-6">
        <h2 className="font-semibold text-amber-200">La regla de este piloto, a la vista</h2>
        <p className="mt-2 text-neutral-300">
          Si menos de <b>5 de 20</b> dueños de despacho dicen que preseleccionarían con esta muestra, el proyecto cambia de vacío.
          El conteo es público en el <Link href="/tablero" className="underline">tablero</Link>. <b>La candidata nunca paga.</b> Paga el despacho que abre la ventana: la primera de cada vacante es gratis, las demás MX$490 por vacante (<Link href="/pricing" className="underline">precios</Link> · <Link href="/about" className="underline">el memo 10:1</Link>).
        </p>
      </section>

      <p className="text-sm text-neutral-400">¿Quién hace esto? Andrés Álvarez Morphy, estudiante. Es un proyecto de curso (Crystal Ball Studio) para probar una idea con despachos reales antes de cobrarle a nadie. Dudas: andres.builder@gmail.com</p>

      <section className="grid gap-6 text-sm text-neutral-300 sm:grid-cols-3">
        <div><h3 className="font-semibold text-neutral-100">Lo que certifica</h3><p className="mt-1">Que en esta tarea, esta persona detectó N de 4 errores y redactó un mensaje que cumple X de Y verificaciones. Nada más.</p></div>
        <div><h3 className="font-semibold text-neutral-100">Lo que nunca hará</h3><p className="mt-1">Puntaje de aptitud, de potencial o de "empleabilidad". Ranking de candidatos. Guardar tus resultados sin que tú lo pidas. Cámara.</p></div>
        <div><h3 className="font-semibold text-neutral-100">Quién manda en la rúbrica</h3><p className="mt-1">Es <Link href="/rubrica" className="underline">pública y versionada</Link>. Ningún socio de canal puede pagar por agregar, quitar o ponderar un módulo.</p></div>
      </section>
    </div>
  )
}
