'use client'
import { useEffect, useState } from 'react'
import { registrar, fuenteActual } from '../../lib/registrar'
import Pasos from '../Pasos'

// Lo que el socio elige o escribe aquí NO sale de su teléfono: al servidor solo viaja "alguien terminó la lectura" y el día.
export default function Lectura({ t, noDice, children }) {
  const [eleccion, setEleccion] = useState(null)
  const [propia, setPropia] = useState('')
  const [listo, setListo] = useState(false)
  useEffect(() => { registrar('lectura_vista', 'lectura'); if (fuenteActual()) registrar('llegada', 'lectura') }, [])
  const puede = eleccion !== null && (eleccion !== 'otra' || propia.trim().length > 3)
  function terminar() { setListo(true); registrar('lectura_terminada', 'lectura') }
  const laPregunta = eleccion === 'otra' ? propia.trim() : (eleccion !== null ? t.opciones[eleccion].pregunta : '')
  return (
    <div className="max-w-2xl space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Serie 1 · Lea una entrega · para socios de despacho</p>
        <h1 className="text-3xl font-bold leading-tight">{t.titular}</h1>
        <p className="text-neutral-300">{t.entrada}</p>
      </header>

      {children}

      <fieldset className="space-y-3" disabled={listo}>
        <legend className="text-xl font-semibold">{t.pregunta}</legend>
        {t.opciones.map((o, i) => (
          <label key={i} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${eleccion === i ? 'border-amber-300 bg-amber-300/10' : 'border-neutral-700'}`}>
            <input type="radio" name="pregunta" checked={eleccion === i} onChange={() => setEleccion(i)} className="mt-1 h-5 w-5 shrink-0 accent-amber-300" />
            <span><span className="block font-semibold">{o.pregunta}</span><span className="block text-sm text-neutral-400">Porque se ve: {o.se_ve}</span></span>
          </label>
        ))}
        <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${eleccion === 'otra' ? 'border-amber-300 bg-amber-300/10' : 'border-neutral-700'}`}>
          <input type="radio" name="pregunta" checked={eleccion === 'otra'} onChange={() => setEleccion('otra')} className="mt-1 h-5 w-5 shrink-0 accent-amber-300" />
          <span className="flex-1">Otra pregunta
            {eleccion === 'otra' && <textarea aria-label="Su pregunta" value={propia} onChange={e => setPropia(e.target.value.slice(0, 200))} maxLength={200} rows={2} placeholder="Escríbala aquí" className="mt-2 block w-full rounded-lg border border-neutral-700 bg-neutral-900 p-2" />}
          </span>
        </label>
        <p className="text-xs text-neutral-500">Lo que elija o escriba no sale de su teléfono. Solo se cuenta que alguien terminó la lectura hoy.</p>
        {!listo && <button type="button" onClick={terminar} disabled={!puede} className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-neutral-950 disabled:opacity-40">Terminar</button>}
      </fieldset>

      {listo && (
        <section role="status" className="space-y-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <p className="text-sm uppercase tracking-widest text-emerald-200">Su pregunta para la llamada</p>
          <p className="text-lg font-semibold">{/^«/.test(laPregunta) ? laPregunta : `«${laPregunta}»`}</p>
          <p className="text-neutral-200">{t.cierre}</p>
          <p className="text-sm text-neutral-300">{t.autoria}</p>
          {noDice.map(n => <p key={n} className="text-sm text-neutral-300">{n}</p>)}
        </section>
      )}

      {listo && <Pasos pantalla="lectura" />}
    </div>
  )
}
