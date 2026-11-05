'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { registrar } from '../../lib/registrar'

// Fix #1 de la semana 13: el DUEÑO abre la ventana. Un enlace, una candidata, 24 h para abrirlo, 60 min para entregar.
export default function Convocar() {
  const [despacho, setDespacho] = useState('')
  const [web, setWeb] = useState('')
  const [res, setRes] = useState(null)
  const [err, setErr] = useState(null)
  const [copiado, setCopiado] = useState(false)
  useEffect(() => { registrar('convocar_abierto', 'convocar') }, [])

  async function crear(e) {
    e.preventDefault(); setErr(null)
    const r = await fetch('/api/convocar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ despacho, web }) })
    const j = await r.json()
    if (!r.ok) { setErr(j.error || 'No se pudo crear el enlace.'); return }
    setRes(j); registrar('convocatoria_creada', 'convocar')
  }
  const texto = res ? `Hola. Antes de la entrevista, le pido que haga esta muestra de trabajo de 40 minutos (20 facturas, 4 están mal clasificadas, me escribe qué corregir). El enlace es de un solo uso y se abre una sola vez: ${res.enlace} — Cuando termine, mándeme la constancia que le da la página. Gracias.` : ''
  async function copiar() { try { await navigator.clipboard.writeText(texto); setCopiado(true); setTimeout(() => setCopiado(false), 2000) } catch {} }

  return (
    <div className="max-w-2xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para dueños y encargados de despacho</p>
        <h1 className="text-3xl font-bold">Abra la muestra para su candidata</h1>
        <p className="text-neutral-300">Usted decide cuándo la hace. El enlace es de <b>un solo uso</b>: caduca en 24 horas si no se abre y, una vez abierto, da <b>60 minutos</b>. Criba registra el intento (hora de inicio, hora de entrega, qué marcó) <b>sin nombre, sin teléfono, sin correo</b>, y la constancia que ella le mande dirá que se hizo con su enlace, en una sola sesión. Así ya no es "en su casa, dice que sola".</p>
      </header>

      {!res ? (
        <form onSubmit={crear} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="despacho" className="font-semibold">Nombre de su despacho (aparece en la constancia)</label>
            <input id="despacho" value={despacho} onChange={e => setDespacho(e.target.value.slice(0, 40))} maxLength={40} required minLength={2} placeholder="Despacho Contable García" className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3" />
            <p className="text-xs text-neutral-500">Solo el nombre del negocio. No ponga correo ni teléfono: no los pedimos ni los guardamos.</p>
          </div>
          <input type="text" name="web" value={web} onChange={e => setWeb(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={despacho.trim().length < 2} className="rounded-xl bg-amber-300 px-5 py-3 font-semibold text-neutral-950 disabled:opacity-40">Crear el enlace de un solo uso</button>
          {err && <p className="text-rose-300">{err}</p>}
        </form>
      ) : (
        <section className="space-y-4 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <h2 className="text-xl font-semibold text-emerald-200">Listo. Mándele esto a su candidata por WhatsApp:</h2>
          <pre className="whitespace-pre-wrap rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-200">{texto}</pre>
          <div className="flex flex-wrap gap-3">
            <button onClick={copiar} className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-neutral-950">{copiado ? 'Copiado ✓' : 'Copiar mensaje'}</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(texto)}`} target="_blank" rel="noreferrer" className="rounded-lg border border-amber-300 px-4 py-2 text-sm text-amber-200">Abrir en WhatsApp</a>
          </div>
          <ul className="space-y-1 text-sm text-neutral-300">
            <li>Despacho: <b>{res.despacho}</b> · enlace <span className="font-mono">{res.id}</span> · caduca {new Date(res.expira).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}.</li>
            <li>Cuando ella termine, le llega una constancia con un código. Ábralo en <Link href="/verificar" className="underline">verificar</Link>: ahí verá "Registrado por Criba", la hora de inicio y entrega, y qué error se le fue.</li>
            <li>Guarde este enlace si quiere saber después si ya se abrió: <span className="font-mono text-xs">/api/convocar?id={res.id}</span></li>
          </ul>
        </section>
      )}

      <section className="space-y-2 text-sm text-neutral-400">
        <h2 className="font-semibold text-neutral-200">Lo que esto no hace</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>No pide ni guarda su teléfono, su correo ni el de la candidata. El enlace lo manda usted, desde su WhatsApp.</li>
          <li>No vigila: sin cámara, sin grabación de pantalla, sin captura de teclas. Registra hora de inicio, hora de entrega y qué marcó.</li>
          <li>No garantiza que lo hizo sola. Garantiza que fue en una sola sesión de 60 minutos, con su enlace. En la entrevista, pídale que explique una de las cuatro facturas en voz alta.</li>
        </ul>
      </section>
    </div>
  )
}
