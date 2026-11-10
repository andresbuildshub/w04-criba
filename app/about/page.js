import Link from 'next/link'
import Evento from '../Evento'
import { MEMO, HOY, costoMala, valorVacante, ratio, umbralCosto, sensibilidad, simular, BASE, fmt, pct } from '../../lib/precios'
import { CONVERSACIONES, REGLA } from '../../lib/conversaciones'

export const metadata = { title: 'El memo 10:1 — Criba' }

const Tag = ({ t }) => <span className={`ml-1 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${t === 'medido' ? 'bg-emerald-400/15 text-emerald-300' : t === 'decisión' ? 'bg-sky-400/15 text-sky-300' : 'bg-amber-300/15 text-amber-200'}`}>{t}</span>

export default function About() {
  const r = ratio(), s = sensibilidad(), sim = simular(BASE)
  return (
    <article className="max-w-3xl space-y-7">
      <Evento evento="about_visto" pantalla="about" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">El memo 10:1 · una página · 2026-11-10</p>
        <h1 className="text-3xl font-bold">Con mis supuestos Criba da {r.toFixed(1)} a 1, no 10 a 1. Esto es lo que tendría que ser verdad.</h1>
        <p className="text-neutral-300"><b>Usuario y pagador:</b> el socio o dueño de un despacho de 1–20 personas, sin RH, con una vacante de auxiliar contable y tres finalistas. <b>Tarea comparada:</b> saber si la junior sirve antes de que le cueste. <b>Periodo:</b> una vacante. <b>Quien nunca paga:</b> la candidata.</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold">1 · Lo que hace hoy, para la misma tarea</h2>
        <ul className="mt-2 space-y-2 text-sm text-neutral-300">
          {HOY.map(h => <li key={h.que}><b className="text-neutral-100">{h.que}</b>: {h.costo} <span className="text-xs text-neutral-500">({h.tipo})</span>. {h.nota}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">2 · Lo que de verdad le cuesta (dinero + tiempo + riesgo)</h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody className="[&_td]:border-t [&_td]:border-neutral-800 [&_td]:p-2">
              <tr><td>Sueldo de una auxiliar</td><td className="text-right font-mono">{fmt(MEMO.sueldo.v)}/mes</td><td><Tag t={MEMO.sueldo.tipo} /></td></tr>
              <tr><td>+ cargas sociales</td><td className="text-right font-mono">{pct(MEMO.cargas.v)}</td><td><Tag t={MEMO.cargas.tipo} /></td></tr>
              <tr><td><b>Costo de un mes de prueba que no sirvió</b></td><td className="text-right font-mono">{fmt(costoMala())}</td><td></td></tr>
              <tr><td>× probabilidad de que salga mala</td><td className="text-right font-mono">{pct(MEMO.pMala.v)}</td><td><Tag t={MEMO.pMala.tipo} /></td></tr>
              <tr><td>× cuántas detecta Criba antes</td><td className="text-right font-mono">{pct(MEMO.deteccion.v)}</td><td><Tag t={MEMO.deteccion.tipo} /></td></tr>
              <tr><td>× lo que agregan las finalistas 2 y 3 (la 1 es gratis)</td><td className="text-right font-mono">⅔</td><td><Tag t={MEMO.fraccion.tipo} /></td></tr>
              <tr><td><b>Valor esperado por vacante</b></td><td className="text-right font-mono">{fmt(valorVacante())}</td><td></td></tr>
              <tr><td><b>Mi precio</b></td><td className="text-right font-mono">{fmt(MEMO.precio.v)}</td><td><Tag t={MEMO.precio.tipo} /></td></tr>
              <tr><td><b>Ratio</b></td><td className="text-right font-mono text-amber-200"><b>{r.toFixed(1)} : 1</b></td><td></td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-neutral-500">Fuentes: {Object.values(MEMO).map(m => m.fuente).join(' · ')}</p>
        <p className="mt-2 text-sm text-neutral-300"><b>Tiempo:</b> no lo sumo. Las horas del dueño supervisando cuentan solo si las habría cobrado, y muchos despachos chicos cobran iguala mensual, no por hora (supuesto). <b>Riesgo:</b> está dentro de la probabilidad × costo. Lo que falta medir es si el error llega al cliente o al SAT, que costaría mucho más que la nómina.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">3 · Por qué el ratio NO aguanta todavía, y qué lo haría aguantar</h2>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          {s.map(x => <div key={`${x.pMala}-${x.deteccion}`} className="rounded-xl border border-neutral-800 p-3"><p className="text-xs text-neutral-400">malas {pct(x.pMala)} · detecta {pct(x.deteccion)}</p><p className="font-mono text-lg">{x.ratio.toFixed(1)} : 1</p></div>)}
        </div>
        <ul className="mt-3 space-y-1 text-sm text-neutral-300">
          <li>• Ninguna combinación razonable de los dos números que nadie ha medido llega a 10.</li>
          <li>• Para que <b>MX$490 dé 10 a 1</b>, una mala contratación le tendría que costar al dueño <b>{fmt(umbralCosto(10))}</b>: unos cuatro meses de sueldo, o un cliente perdido. Una historia así, n=1, diría "existe un caso", no "aguanta".</li>
          <li>• <b>No bajo el precio para llegar a 10:1</b> (≈ {fmt(MEMO.precio.v * r / 10)}). Sería cortesía: a ese precio no se paga validar un set de CFDIs (≈ MX$400 al mes) hasta pasar las 4 vacantes al mes.</li>
          <li>• <b>Qué lo mediría:</b> la detección, con candidatas cuya calidad el dueño ya conoce (sus auxiliares actuales haciendo la muestra a ciegas); el costo, con la historia de la última mala contratación de cada dueño.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">4 · La conversación real de precio</h2>
        {CONVERSACIONES.length === 0 ? (
          <div className="mt-2 rounded-2xl border border-amber-300/40 bg-amber-300/5 p-4 text-sm">
            <p className="font-semibold text-amber-200">PENDIENTE. Todavía no hay una conversación real registrada.</p>
            <p className="mt-1 text-neutral-300">Las sesiones con usuarios de la semana 13 fueron <b>simuladas</b> y no cuentan aquí. Plan: preguntarle a socios de despacho con una vacante abierta esta semana si pagarían MX$490. Cada conversación se registra con uno de tres resultados:</p>
            <ul className="mt-2 space-y-1 text-neutral-300">{REGLA.resultados.map(([n, d]) => <li key={n}><b>{n}</b>: {d}</li>)}</ul>
            <p className="mt-2 text-xs text-neutral-400">La regla completa (guion y qué cambia en el precio según cada respuesta) se escribió antes de la primera conversación y está fechada en el repositorio: <a href="https://github.com/andresbuildshub/w04-criba/blob/main/lib/conversaciones.js" className="underline">lib/conversaciones.js</a>. No va en esta página: quien está decidiendo si paga no tiene por qué leer el experimento.</p>
          </div>
        ) : (
          <ul className="mt-2 space-y-3 text-sm">{CONVERSACIONES.map((c, i) => (
            <li key={i} className="rounded-2xl border border-neutral-800 p-4">
              <p className="text-neutral-400">{c.dia} · {c.quien} · {c.canal}</p>
              <p className="mt-1"><b>{c.resultado}</b> a {fmt(c.precioPreguntado)} · finalistas: {c.finalistas} · se enteró: {c.semanaQueSeEntero}</p>
              <p className="mt-1 text-neutral-200">“{c.palabras}”</p>
              {c.razon && <p className="mt-1 text-neutral-300">Razón: {c.razon}</p>}
              <p className="mt-1 text-amber-200">Qué cambia: {c.queCambia}</p>
            </li>))}
          </ul>
        )}
      </section>

      <section className="text-sm text-neutral-300">
        <h2 className="text-lg font-semibold text-neutral-100">5 · Qué da el negocio con estos mismos supuestos</h2>
        <p className="mt-2">Escenario "Base" del <Link href="/simulador" className="underline">simulador</Link>: {Math.round(sim.clientes1)} despachos pagando ≈ {Math.round(sim.vacantesPagadas)} vacantes al año + {Math.round(sim.clientes2)} planes anuales = <b>{fmt(sim.ingresoAnual)} al año</b> ({fmt(sim.ingresoMensual)} al mes), menos {fmt(sim.fijosAnual)} de fijos. Es poco, y lo digo. Los dos números que más lo mueven (cuántos la conocen y cuántos pagan) hoy valen cero medidos.</p>
        <p className="mt-2 text-xs text-neutral-500">Mismos supuestos en <Link href="/pricing" className="underline">/pricing</Link>, el simulador y este memo: salen de un solo archivo (`lib/precios.js`). Cada número dice si es medido, supuesto o decisión.</p>
      </section>
    </article>
  )
}
