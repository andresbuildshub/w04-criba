'use client'
import { useState } from 'react'
import Link from 'next/link'

const ROL = [['dueño', 'Dueño/a del despacho'], ['gerente', 'Gerente / encargado'], ['contador_senior', 'Contador/a senior'], ['otro', 'Otro']]
const TAM = [['1-5', '1–5 personas'], ['6-20', '6–20'], ['21-50', '21–50'], ['mas_50', 'Más de 50']]
const DEC = [['si', 'Sí, la usaría para preseleccionar candidatos'], ['si_cambios', 'Sí, pero con cambios'], ['no', 'No']]
const CAM = [['mas_casos', 'Más casos (IVA, nómina)'], ['menos_tiempo', 'Que dure menos'], ['presencial', 'Que se aplique presencial'], ['sello_colegio', 'Que la avale un Colegio'], ['nada', 'Nada la haría útil']]

export default function Decision() {
  const [f, setF] = useState({ rol: '', tamano: '', decision: '', cambios: [], comentario: '', web: '' })
  const [estado, setEstado] = useState(null)
  const set = (k, v) => setF(s => ({ ...s, [k]: v }))
  const toggleC = v => setF(s => ({ ...s, cambios: s.cambios.includes(v) ? s.cambios.filter(x => x !== v) : [...s.cambios, v] }))
  const listo = f.rol && f.tamano && f.decision

  async function enviar(e) {
    e.preventDefault(); setEstado('enviando')
    const r = await fetch('/api/respuestas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
    setEstado(r.ok ? 'ok' : 'error')
  }

  if (estado === 'ok') return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Gracias. Quedó registrada, anónima.</h1>
      <p className="text-neutral-300">No guardamos nombre, correo ni teléfono: solo su decisión y su tamaño de despacho. Cuenta hacia el criterio de 5 de 20.</p>
      <Link href="/tablero" className="inline-block rounded-xl bg-amber-300 px-5 py-3 font-semibold text-neutral-950">Ver el tablero →</Link>
    </div>
  )

  return (
    <form onSubmit={enviar} className="max-w-2xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para dueños y encargados de despacho</p>
        <h1 className="text-3xl font-bold">¿Preseleccionaría con esta muestra?</h1>
        <p className="text-neutral-300">Si todavía no la vio, <Link href="/muestra" className="underline">véala primero como la vería una candidata</Link> (5 minutos). Luego responda aquí. Es anónimo: no pedimos nombre ni contacto.</p>
      </header>

      <fieldset className="space-y-2"><legend className="font-semibold">Su rol</legend>
        {ROL.map(([v, t]) => <label key={v} className="flex items-center gap-3"><input type="radio" name="rol" required checked={f.rol === v} onChange={() => set('rol', v)} className="h-5 w-5 accent-amber-300" />{t}</label>)}
      </fieldset>
      <fieldset className="space-y-2"><legend className="font-semibold">Tamaño del despacho</legend>
        {TAM.map(([v, t]) => <label key={v} className="flex items-center gap-3"><input type="radio" name="tamano" required checked={f.tamano === v} onChange={() => set('tamano', v)} className="h-5 w-5 accent-amber-300" />{t}</label>)}
      </fieldset>
      <fieldset className="space-y-2"><legend className="font-semibold">Si una candidata llega con la constancia de esta muestra, ¿la usaría para decidir a quién entrevistar?</legend>
        {DEC.map(([v, t]) => <label key={v} className="flex items-center gap-3"><input type="radio" name="decision" required checked={f.decision === v} onChange={() => set('decision', v)} className="h-5 w-5 accent-amber-300" />{t}</label>)}
      </fieldset>
      <fieldset className="space-y-2"><legend className="font-semibold">¿Qué tendría que cambiar? (opcional)</legend>
        {CAM.map(([v, t]) => <label key={v} className="flex items-center gap-3"><input type="checkbox" checked={f.cambios.includes(v)} onChange={() => toggleC(v)} className="h-5 w-5 accent-amber-300" />{t}</label>)}
      </fieldset>
      <div className="space-y-1">
        <label htmlFor="comentario" className="font-semibold">Comentario (opcional, máx. 300 caracteres)</label>
        <textarea id="comentario" rows={3} maxLength={300} value={f.comentario} onChange={e => set('comentario', e.target.value.slice(0, 300))} className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3" placeholder="Sin datos personales, por favor." />
        <div className="text-right text-xs text-neutral-500">{f.comentario.length}/300</div>
      </div>
      <input type="text" name="web" value={f.web} onChange={e => set('web', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" disabled={!listo || estado === 'enviando'} className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-neutral-950 disabled:opacity-40">{estado === 'enviando' ? 'Enviando…' : 'Registrar mi decisión'}</button>
      {estado === 'error' && <p className="text-rose-300">No se pudo registrar. Revise las opciones e intente de nuevo.</p>}
    </form>
  )
}
