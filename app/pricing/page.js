import Link from 'next/link'
import Evento from '../Evento'
import { TIERS, MEMO, ratio, fmt } from '../../lib/precios'

export const metadata = { title: 'Precios — Criba' }

export default function Pricing() {
  return (
    <div className="space-y-10">
      <Evento evento="pricing_visto" pantalla="pricing" />
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-amber-300">Precios · paga el despacho que abre la ventana</p>
        <h1 className="text-3xl font-bold sm:text-4xl">La primera candidata de cada vacante es gratis. Para probar a todas sus finalistas, MX$490.</h1>
        <p className="max-w-2xl text-neutral-300">Usted paga por <b>abrir ventanas registradas</b> (enlaces de un solo uso para que sus finalistas hagan la muestra), no por datos de nadie. <b>La candidata nunca paga</b>: ni por la muestra ni por su constancia.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Planes">
        {TIERS.map(t => (
          <article key={t.id} className={`flex flex-col rounded-2xl border p-5 ${t.id === 'vacante' ? 'border-amber-300 bg-amber-300/5' : 'border-neutral-800 bg-neutral-900'}`}>
            <h2 className="text-lg font-semibold">{t.nombre}</h2>
            <p className="mt-1 text-3xl font-bold">{t.precio === 0 ? 'MX$0' : `MX$${t.precio.toLocaleString('es-MX')}`}</p>
            <p className="text-sm text-neutral-400">{t.unidad}</p>
            <p className="mt-3 text-sm text-neutral-200">{t.para}</p>
            <ul className="mt-3 space-y-1 text-sm text-neutral-300">{t.incluye.map(i => <li key={i}>• {i}</li>)}</ul>
            <p className="mt-auto pt-4 text-xs text-neutral-400">{t.porque}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-amber-300/40 bg-amber-300/5 p-5">
        <h2 className="font-semibold text-amber-200">Dónde está la línea de lo gratis, y por qué ahí</h2>
        <ul className="mt-2 space-y-2 text-sm text-neutral-200">
          <li><b>Gratis: la primera ventana de cada vacante.</b> Si lo gratis fuera una constancia "sin registro", habría dos clases de candidatas, y la que no tiene red quedaría como sospechosa. Aquí cualquier candidata puede decir "ábrame una ventana, la primera es gratis".</li>
          <li><b>De pago: probar a la segunda finalista en adelante.</b> El valor de Criba está en comparar: con una sola, el dueño la compara con nadie.</li>
          <li><b>Siempre gratis: verificar.</b> Nadie paga por comprobar una constancia.</li>
          <li><b>Nunca se vende:</b> rankings de candidatas, búsquedas de quién hizo la muestra o un precio por candidata "aprobada". Pagarle a Criba para que alguien pase sería la sombra.</li>
        </ul>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-semibold">Dos segmentos</h2>
          <p className="mt-2 text-sm text-neutral-300"><b>1 · Despacho de 1–20 personas sin RH</b> (el de record): contrata una o dos veces al año y hoy se entera de si la auxiliar sirve pagándole el periodo de prueba. Paga <b>por vacante</b>.</p>
          <p className="mt-2 text-sm text-neutral-300"><b>2 · Despacho de 21–50 con RH</b>: contrata 4+ veces al año. Paga <b>por año</b>. <span className="text-amber-200">Segmento supuesto: todavía no he hablado con nadie de este tamaño.</span></p>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-semibold">Cómo se cobra hoy, sin adornos</h2>
          <p className="mt-2 text-sm text-neutral-300">Todavía <b>no puedo facturar</b> (no tengo RFC con actividad ni PAC). Mientras tanto: <b>recibo simple, sin IVA, por transferencia</b>, cuando su segunda ventana se use. El sitio no bloquea nada mientras no exista una forma honesta de cobrar en línea.</p>
          <p className="mt-2 text-sm text-neutral-300">Si "sin factura no pago" es su respuesta, es una respuesta útil: me dice que el precio real incluye darme de alta.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 p-5">
        <h2 className="font-semibold">¿Vale los MX$490? Con mis supuestos, todavía no llega a 10 a 1.</h2>
        <p className="mt-2 text-sm text-neutral-300">Contra el periodo de prueba, una vacante con tres finalistas le ahorra en promedio {fmt(ratio() * MEMO.precio.v)}: <b>{ratio().toFixed(1)} a 1</b>. Las cuentas, qué está medido y qué es supuesto, están en el <Link href="/about" className="underline">memo 10:1</Link>. Los supuestos se pueden mover en el <Link href="/simulador" className="underline">simulador</Link>.</p>
      </section>
    </div>
  )
}
