'use client'
import { useState } from 'react'
import Link from 'next/link'

const mxn = n => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

export default function Muestra({ cfdis, cliente, version }) {
  const [sel, setSel] = useState(new Set())
  const [mensaje, setMensaje] = useState('')
  const [asistencia, setAsistencia] = useState('ninguna')
  const [res, setRes] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const toggle = id => setSel(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  async function calificar() {
    setCargando(true); setRes(null)
    try {
      const r = await fetch('/api/calificar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ seleccion: [...sel], mensaje, asistencia }) })
      setRes(await r.json())
    } finally { setCargando(false) }
  }
  async function copiar() { try { await navigator.clipboard.writeText(res.constancia); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch {} }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Muestra de trabajo · {version}</p>
        <h1 className="text-3xl font-bold">Revisa lo que clasificó el agente</h1>
        <p className="max-w-3xl text-neutral-300">
          Cliente ficticio: <b>{cliente.nombre}</b> ({cliente.rfc}), periodo {cliente.periodo}. Un agente <span className="rounded bg-neutral-800 px-1 text-xs">SIMULADO</span> clasificó sus 20 CFDIs.
          <b> Exactamente 4 están mal.</b> Marca cuáles y explícale al cliente qué hay que corregir. Sin cámara, sin cuenta: nada de esto se guarda.
        </p>
      </header>

      {/* Móvil: tarjetas (la tabla escondía la columna "Clasificación del agente" fuera de pantalla). */}
      <ul className="space-y-3 sm:hidden">
        {cfdis.map(c => (
          <li key={c.id} className={`rounded-xl border p-3 text-sm ${sel.has(c.id) ? 'border-amber-300 bg-amber-300/10' : 'border-neutral-800'}`}>
            <label className="flex items-start gap-3">
              <input type="checkbox" aria-label={`Marcar ${c.folio} como mal clasificado`} checked={sel.has(c.id)} onChange={() => toggle(c.id)} className="mt-1 h-6 w-6 shrink-0 accent-amber-300" />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3"><span className="font-mono font-semibold">{c.folio}</span><span className="text-neutral-400">{c.fecha}</span><span className="font-semibold">{mxn(c.monto)}</span></div>
                <div>{c.emisor}</div>
                <div className="font-mono text-xs text-neutral-500">{c.rfc_emisor} → {c.rfc_receptor}</div>
                <div className="text-neutral-300">{c.concepto}</div>
                <div className="text-xs text-neutral-400">Pago: {c.metodo} · {c.forma}</div>
                <div className="rounded-lg bg-neutral-900 p-2"><span className="text-xs uppercase text-neutral-500">El agente dijo: </span><span className={c.agente.deducible === 'Sí' ? 'text-emerald-300' : 'text-rose-300'}>{c.agente.deducible}</span> · {c.agente.categoria}{c.agente.nota && <div className="text-xs text-neutral-500">{c.agente.nota}</div>}</div>
                <div className="text-xs text-neutral-500">{sel.has(c.id) ? 'Marcado como MAL clasificado' : 'Toca la casilla si está mal clasificado'}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-xl border border-neutral-800 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 text-xs uppercase text-neutral-400">
            <tr><th className="p-3">¿Mal?</th><th className="p-3">Folio / fecha</th><th className="p-3">Emisor → receptor</th><th className="p-3">Concepto</th><th className="p-3 text-right">Monto</th><th className="p-3">Pago</th><th className="p-3">Clasificación del agente</th></tr>
          </thead>
          <tbody>
            {cfdis.map(c => (
              <tr key={c.id} className={`border-t border-neutral-800 ${sel.has(c.id) ? 'bg-amber-300/10' : ''}`}>
                <td className="p-3"><input type="checkbox" aria-label={`Marcar ${c.folio} como mal clasificado`} checked={sel.has(c.id)} onChange={() => toggle(c.id)} className="h-5 w-5 accent-amber-300" /></td>
                <td className="p-3 whitespace-nowrap"><div className="font-mono">{c.folio}</div><div className="text-neutral-500">{c.fecha}</div></td>
                <td className="p-3"><div>{c.emisor}</div><div className="font-mono text-xs text-neutral-500">{c.rfc_emisor} → {c.rfc_receptor}</div></td>
                <td className="p-3">{c.concepto}</td>
                <td className="p-3 text-right whitespace-nowrap">{mxn(c.monto)}</td>
                <td className="p-3 whitespace-nowrap text-neutral-400">{c.metodo} · {c.forma}</td>
                <td className="p-3"><div><span className={c.agente.deducible === 'Sí' ? 'text-emerald-300' : 'text-rose-300'}>{c.agente.deducible}</span> · {c.agente.categoria}</div>{c.agente.nota && <div className="text-xs text-neutral-500">{c.agente.nota}</div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-neutral-400">Marcados: <b className="text-neutral-100">{sel.size}</b> de 20 (deberían ser 4).</p>

      <section className="space-y-3">
        <label className="block font-semibold" htmlFor="mensaje">Mensaje al cliente (WhatsApp o correo, 40–220 palabras)</label>
        <textarea id="mensaje" value={mensaje} onChange={e => setMensaje(e.target.value.slice(0, 2000))} rows={7} maxLength={2000}
          placeholder="Hola Don Julio, revisé las facturas de agosto y hay cuatro cosas que corregir…"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-neutral-100 placeholder:text-neutral-600" />
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label htmlFor="asistencia" className="text-neutral-300">Declaro que para esta muestra:</label>
          <select id="asistencia" value={asistencia} onChange={e => setAsistencia(e.target.value)} className="rounded-lg border border-neutral-700 bg-neutral-900 p-2">
            <option value="ninguna">no usé ninguna ayuda</option>
            <option value="consulte_fuentes">consulté leyes o apuntes</option>
            <option value="use_ia">usé una IA</option>
          </select>
          <span className="text-xs text-neutral-500">(se imprime en la constancia; no se verifica ni se castiga)</span>
        </div>
        <button onClick={calificar} disabled={cargando || sel.size === 0} className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-neutral-950 disabled:opacity-40">
          {cargando ? 'Calificando…' : 'Calificar mi revisión'}
        </button>
      </section>

      {res && (
        <section className="space-y-6 rounded-2xl border border-neutral-700 bg-neutral-900 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-bold">{res.seleccion.aprobado ? 'Aprobado en esta muestra' : 'No aprobado en esta muestra'}</h2>
            <span className="text-sm text-neutral-400">{res.seleccion.aciertos.length} de 4 errores · {res.seleccion.falsos.length} falso(s) positivo(s) · regla {res.seleccion.version}</span>
          </div>

          <div>
            <h3 className="font-semibold">Los 4 errores, uno por uno</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {res.detalle.map(d => (
                <li key={d.id} className="rounded-lg border border-neutral-800 p-3">
                  <div className="font-mono">{d.encontrado ? '✅' : '❌'} {d.folio} {d.encontrado ? '— lo encontraste' : '— se te fue'}</div>
                  <div className="text-neutral-300">{d.explicacion}</div>
                  <div className="text-neutral-500">Acción: {d.accion}</div>
                </li>
              ))}
            </ul>
            {res.falsos.length > 0 && (
              <div className="mt-3 text-sm text-neutral-300">Marcaste como mal, pero estaban bien: {res.falsos.map(f => <span key={f.id} className="mr-2 font-mono">{f.folio}</span>)}</div>
            )}
          </div>

          <div>
            <h3 className="font-semibold">Tu mensaje al cliente <span className="ml-2 rounded bg-neutral-800 px-2 py-0.5 text-xs font-normal text-amber-200">REVISIÓN SIMULADA POR REGLAS — no es juicio de IA</span></h3>
            <ul className="mt-2 space-y-1 text-sm">
              {res.mensaje.checks.map(c => <li key={c.k}>{c.ok ? '✅' : '⬜'} {c.texto}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Tu constancia acotada (es tuya, no la guardamos)</h3>
            <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-xs leading-relaxed text-neutral-200">{res.constancia}</pre>
            <div className="mt-3 flex flex-wrap gap-3">
              <button onClick={copiar} className="rounded-lg border border-amber-300 px-4 py-2 text-sm text-amber-200">{copiado ? 'Copiada ✓' : 'Copiar constancia'}</button>
              <Link href="/decision" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300">¿Eres dueño de despacho? Da tu decisión →</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
