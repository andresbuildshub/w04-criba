import { leer, DEMO, ETIQUETAS, resumir } from '../../lib/store'

export const dynamic = 'force-dynamic'

function Fila({ r }) {
  return (
    <li className="rounded-lg border border-neutral-800 p-3 text-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className={r.decision === 'no' ? 'text-rose-300' : 'text-emerald-300'}>{ETIQUETAS.decision[r.decision]}</span>
        <span className="text-xs text-neutral-500">{r.ts.slice(0, 10)}{r.demo ? ' · DEMO (inventada)' : ''}</span>
      </div>
      <div className="text-neutral-400">{ETIQUETAS.rol[r.rol]} · {ETIQUETAS.tamano[r.tamano]}{r.cambios?.length ? ' · cambios: ' + r.cambios.map(c => ETIQUETAS.cambios[c]).join(', ') : ''}</div>
      {r.comentario && <div className="mt-1 text-neutral-200">“{r.comentario}”</div>}
    </li>
  )
}

export default async function Tablero() {
  const { items, persistencia } = await leer()
  const s = resumir(items)
  const pct = Math.min(100, Math.round((s.n / s.umbral.muestra) * 100))
  const estado = s.cumple ? 'CUMPLIDO: el vacío sigue vivo' : s.cerrado ? 'NO CUMPLIDO: cambiar de vacío (reinserción nini vía centros JCF)' : 'PENDIENTE: faltan respuestas'
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Condición 1 del Blueprint · criterio de muerte</p>
        <h1 className="text-3xl font-bold">Tablero de reconocimiento</h1>
        <p className="text-neutral-300">Ningún candidato paga antes de que los despachos digan que sí. Aquí se cuenta, en público.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"><div className="text-xs uppercase text-neutral-500">Respuestas reales</div><div className="text-4xl font-bold">{s.n}<span className="text-lg text-neutral-500"> / {s.umbral.muestra}</span></div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"><div className="text-xs uppercase text-neutral-500">Dirían que sí (incl. con cambios)</div><div className="text-4xl font-bold">{s.si}<span className="text-lg text-neutral-500"> / {s.umbral.minimo_si} necesarias</span></div></div>
        <div className={`rounded-2xl border p-5 ${s.cumple ? 'border-emerald-400/40 bg-emerald-400/5' : s.cerrado ? 'border-rose-400/40 bg-rose-400/5' : 'border-amber-300/40 bg-amber-300/5'}`}><div className="text-xs uppercase text-neutral-500">Criterio 5 de 20</div><div className="mt-1 font-semibold">{estado}</div></div>
      </section>
      <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800"><div className="h-3 bg-amber-300" style={{ width: pct + '%' }} /></div>

      <section>
        <h2 className="font-semibold">Respuestas reales ({s.n})</h2>
        {s.n === 0 ? <p className="mt-2 text-sm text-neutral-500">Todavía ninguna. La primera entrevista con un dueño de despacho se registra aquí.</p>
          : <ul className="mt-2 space-y-2">{items.filter(i => !i.demo).slice().reverse().map(r => <Fila key={r.id} r={r} />)}</ul>}
      </section>

      <section>
        <h2 className="font-semibold text-neutral-400">Respuestas DEMO — inventadas para mostrar el formato; <u>no cuentan</u></h2>
        <ul className="mt-2 space-y-2 opacity-70">{DEMO.map(r => <Fila key={r.id} r={r} />)}</ul>
      </section>
      <p className="text-xs text-neutral-500">Almacenamiento: {persistencia}. No se guarda ningún dato personal.</p>
    </div>
  )
}
