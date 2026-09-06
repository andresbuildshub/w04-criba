import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para una junior sin experiencia, la prueba ES el CV</p>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Criba: una muestra de trabajo de 40 minutos para auxiliar contable</h1>
        <p className="max-w-2xl text-lg text-neutral-300">
          20 facturas que un agente ya clasificó. Cuatro están mal. Encuéntralas y escríbele al cliente.
          Eso es lo que un despacho contrata en 2029: juicio sobre lo que hizo la máquina, no captura.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/muestra" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-300">
          <h2 className="text-xl font-semibold">Soy candidata/o → hacer la muestra</h2>
          <p className="mt-2 text-neutral-400">Sin cuenta. Nada se guarda. Al final recibes una constancia acotada que es tuya: la copias y la mandas tú.</p>
        </Link>
        <Link href="/decision" className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-amber-300">
          <h2 className="text-xl font-semibold">Soy dueño/a de despacho → dar mi decisión</h2>
          <p className="mt-2 text-neutral-400">Dos minutos, anónimo, sin hacer el examen: un resumen de la muestra y tres preguntas. Veinte respuestas deciden si esto sigue existiendo.</p>
        </Link>
      </section>

      <section className="rounded-2xl border border-amber-300/30 bg-amber-300/5 p-6">
        <h2 className="font-semibold text-amber-200">La regla de este piloto, a la vista</h2>
        <p className="mt-2 text-neutral-300">
          Si menos de <b>5 de 20</b> dueños de despacho dicen que preseleccionarían con esta muestra, el proyecto cambia de vacío.
          El conteo es público en el <Link href="/tablero" className="underline">tablero</Link>. Ningún candidato paga un peso antes de que un despacho diga que sí.
        </p>
      </section>

      <p className="text-sm text-neutral-400">¿Quién hace esto? Andrés Álvarez Morphy, estudiante. Es un proyecto de curso (Crystal Ball Studio, semana 4) para probar una idea con despachos reales antes de cobrarle a nadie. Dudas: andres.builder@gmail.com</p>

      <section className="grid gap-6 text-sm text-neutral-300 sm:grid-cols-3">
        <div><h3 className="font-semibold text-neutral-100">Lo que certifica</h3><p className="mt-1">Que en esta tarea, esta persona detectó N de 4 errores y redactó un mensaje que cumple X de Y verificaciones. Nada más.</p></div>
        <div><h3 className="font-semibold text-neutral-100">Lo que nunca hará</h3><p className="mt-1">Puntaje de aptitud, de potencial o de "empleabilidad". Ranking de candidatos. Guardar tus resultados sin que tú lo pidas. Cámara.</p></div>
        <div><h3 className="font-semibold text-neutral-100">Quién manda en la rúbrica</h3><p className="mt-1">Es <Link href="/rubrica" className="underline">pública y versionada</Link>. Ningún socio de canal puede pagar por agregar, quitar o ponderar un módulo.</p></div>
      </section>
    </div>
  )
}
