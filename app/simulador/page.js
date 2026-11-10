'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { registrar } from '../../lib/registrar'
import { CAMPOS, BASE, PRESETS, simular, limpiarValores, limpiarNombre, codificar, decodificar, fmt, pct } from '../../lib/precios'

const LLAVE = 'criba-escenarios-v1'
const MAX_GUARDADOS = 20
const GRUPOS = [
  ['Segmento 1 · despacho de 1–20, paga por vacante', ['despachos', 'alcance', 'conversion', 'vacantes', 'pagan', 'precioVacante']],
  ['Segmento 2 · despacho de 21–50 con RH, plan anual', ['despachos2', 'conversion2', 'precioAnual']],
  ['Costos fijos', ['costoSet', 'otrosFijos']],
]
const esPct = k => CAMPOS[k].u === '%'
const tagCls = t => t === 'medido' ? 'bg-emerald-400/15 text-emerald-300' : t === 'decisión' ? 'bg-sky-400/15 text-sky-300' : 'bg-amber-300/15 text-amber-200'

function leerGuardados() {
  try {
    const arr = JSON.parse(localStorage.getItem(LLAVE) || '[]')
    if (!Array.isArray(arr)) return []
    return arr.slice(0, MAX_GUARDADOS).map(e => ({ nombre: limpiarNombre(e?.nombre), valores: limpiarValores(e?.valores) })).filter(e => e.valores)
  } catch { return [] }
}

export default function Simulador() {
  const [v, setV] = useState({ ...BASE })
  const [guardados, setGuardados] = useState([])
  const [nombre, setNombre] = useState('')
  const [aviso, setAviso] = useState('')
  const [borradores, setBorradores] = useState({}) // texto que la persona está escribiendo; un campo vacío NO es 0
  const r = useMemo(() => simular(v), [v])

  useEffect(() => {
    registrar('simulador_visto', 'simulador')
    setGuardados(leerGuardados())
    const e = new URLSearchParams(window.location.search).get('e')
    if (e !== null) {
      const d = decodificar(e)
      if (d) { setV(d); setAviso('Escenario cargado desde el enlace.') } else setAviso('El enlace traía un escenario inválido; se muestra el Base.')
    }
  }, [])

  function cambiar(k, texto) {
    const c = CAMPOS[k]
    setBorradores(b => ({ ...b, [k]: texto }))
    // BUG del pase mecánico (semana 14): Number('') === 0, así que borrar el precio para reescribirlo lo volvía 0 en silencio.
    if (String(texto).trim() === '') return
    let n = Number(String(texto).replace(',', '.'))
    if (!Number.isFinite(n)) return
    if (esPct(k)) n = n / 100
    setV(prev => ({ ...prev, [k]: Math.min(c.max, Math.max(c.min, n)) }))
  }

  function guardar(e) {
    e.preventDefault()
    const lista = [{ nombre: limpiarNombre(nombre), valores: { ...v } }, ...guardados].slice(0, MAX_GUARDADOS)
    localStorage.setItem(LLAVE, JSON.stringify(lista)); setGuardados(lista); setNombre('')
    setAviso('Guardado en este navegador. No se manda a ningún servidor.')
    registrar('escenario_guardado', 'simulador')
  }
  function borrar(i) {
    const lista = guardados.filter((_, j) => j !== i)
    localStorage.setItem(LLAVE, JSON.stringify(lista)); setGuardados(lista)
  }
  async function compartir() {
    const url = `${window.location.origin}/simulador?e=${codificar(v)}`
    try { await navigator.clipboard.writeText(url); setAviso('Enlace copiado: quien lo abra ve exactamente estos supuestos.') } catch { setAviso(url) }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Simulador de ingresos · mismos supuestos que el memo</p>
        <h1 className="text-3xl font-bold">Mueva los supuestos y vea cuánto da Criba</h1>
        <p className="max-w-2xl text-neutral-300">Cada número dice si está <span className={`rounded px-1 ${tagCls('medido')}`}>medido</span>, es <span className={`rounded px-1 ${tagCls('supuesto')}`}>supuesto</span> o es una <span className={`rounded px-1 ${tagCls('decisión')}`}>decisión</span> mía. El "Base" es el del <Link href="/about" className="underline">memo 10:1</Link>. Todo se calcula en su navegador; nada se guarda en un servidor.</p>
      </header>

      <section className="flex flex-wrap gap-2" aria-label="Escenarios de fábrica">
        {PRESETS.map(p => <button key={p.nombre} onClick={() => { setV({ ...p.valores }); setBorradores({}); setAviso(`Escenario: ${p.nombre}`) }} className="rounded-full border border-neutral-700 px-3 py-1.5 text-sm hover:border-amber-300">{p.nombre}</button>)}
      </section>

      <section className="sticky top-0 z-10 grid grid-cols-2 gap-2 rounded-2xl border border-amber-300/40 bg-neutral-950/95 p-4 backdrop-blur sm:grid-cols-4" aria-live="polite">
        <div><p className="text-xs text-neutral-400">Ingreso al mes</p><p data-testid="mensual" className="font-mono text-xl font-bold">{fmt(r.ingresoMensual)}</p></div>
        <div><p className="text-xs text-neutral-400">Ingreso al año</p><p data-testid="anual" className="font-mono text-xl font-bold">{fmt(r.ingresoAnual)}</p></div>
        <div><p className="text-xs text-neutral-400">Neto al año (menos fijos)</p><p className={`font-mono text-xl font-bold ${r.netoAnual < 0 ? 'text-red-300' : ''}`}>{fmt(r.netoAnual)}</p></div>
        <div><p className="text-xs text-neutral-400">Vacantes pagadas al mes para cubrir fijos</p><p className="font-mono text-xl font-bold">{Number.isFinite(r.equilibrioVacantesMes) ? r.equilibrioVacantesMes.toFixed(1) : '—'}</p></div>
      </section>
      <p className="-mt-5 text-xs text-neutral-500">{Math.round(r.clientes1)} despachos chicos pagando · {Math.round(r.vacantesPagadas)} vacantes pagadas al año ({fmt(r.ingreso1)}) · {Math.round(r.clientes2)} planes anuales ({fmt(r.ingreso2)}) · fijos {fmt(r.fijosAnual)} al año</p>
      {aviso && <p role="status" className="rounded-xl bg-neutral-900 p-3 text-sm text-neutral-200">{aviso}</p>}

      {GRUPOS.map(([titulo, llaves]) => (
        <section key={titulo} className="space-y-3">
          <h2 className="font-semibold">{titulo}</h2>
          {llaves.map(k => {
            const c = CAMPOS[k]
            const mostrado = esPct(k) ? Math.round(v[k] * 1000) / 10 : v[k]
            return (
              <div key={k} className="rounded-2xl border border-neutral-800 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label htmlFor={k} className="text-sm font-medium">{c.label}</label>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagCls(c.tipo)}`}>{c.tipo}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input id={k} type="number" inputMode="decimal" value={borradores[k] ?? mostrado} onBlur={() => setBorradores(b => { const { [k]: _, ...resto } = b; return resto })} min={esPct(k) ? c.min * 100 : c.min} max={esPct(k) ? c.max * 100 : c.max} step={esPct(k) ? c.paso * 100 : c.paso}
                    onChange={e => cambiar(k, e.target.value)} className="w-36 rounded-xl border border-neutral-700 bg-neutral-900 p-2 font-mono" />
                  <span className="text-sm text-neutral-400">{c.u}</span>
                  {borradores[k] !== undefined && String(borradores[k]).trim() === '' && <span className="text-xs text-amber-200">vacío: se sigue usando {esPct(k) ? pct(v[k]) : v[k].toLocaleString('es-MX')}</span>}
                  {v[k] !== BASE[k] && <span className="text-xs text-neutral-500">(base: {esPct(k) ? pct(BASE[k]) : BASE[k].toLocaleString('es-MX')})</span>}
                </div>
                <p className="mt-2 text-xs text-neutral-500">{c.fuente}</p>
              </div>
            )
          })}
        </section>
      ))}

      <section className="space-y-3 rounded-2xl border border-neutral-800 p-4">
        <h2 className="font-semibold">Guardar este escenario</h2>
        <form onSubmit={guardar} className="flex flex-wrap gap-2">
          <label htmlFor="nombre" className="sr-only">Nombre del escenario</label>
          <input id="nombre" value={nombre} onChange={e => setNombre(e.target.value.slice(0, 40))} maxLength={40} placeholder="Ej. 890 por vacante" className="min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-900 p-2" />
          <button className="rounded-xl bg-amber-300 px-4 py-2 font-semibold text-neutral-950">Guardar</button>
          <button type="button" onClick={compartir} className="rounded-xl border border-neutral-700 px-4 py-2">Copiar enlace</button>
        </form>
        <p className="text-xs text-neutral-500">Se guarda solo en este navegador (hasta {MAX_GUARDADOS}). El enlace lleva únicamente los números, sin nombre ni datos de nadie.</p>
        {guardados.length > 0 && (
          <ul className="space-y-2" aria-label="Escenarios guardados">
            {guardados.map((g, i) => {
              const gr = simular(g.valores)
              return (
                <li key={i} className="flex flex-wrap items-center gap-2 rounded-xl bg-neutral-900 p-3 text-sm">
                  <span className="mr-auto font-medium">{g.nombre}</span>
                  <span className="font-mono text-neutral-300">{fmt(gr.ingresoAnual)}/año</span>
                  <button onClick={() => { setV({ ...g.valores }); setBorradores({}); setAviso(`Cargado: ${g.nombre}`) }} className="rounded-lg border border-neutral-700 px-2 py-1">Cargar</button>
                  <button onClick={() => borrar(i)} className="rounded-lg border border-neutral-700 px-2 py-1 text-neutral-400" aria-label={`Borrar ${g.nombre}`}>Borrar</button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
