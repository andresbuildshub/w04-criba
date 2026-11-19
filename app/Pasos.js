'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { registrar, conFuente } from '../lib/registrar'
import { MENSAJES } from '../lib/piezas'

// Los cuatro siguientes pasos del socio. Ninguno pide un dato.
// "Guardar" y "colega" abren la hoja de compartir del teléfono: lo manda él, desde su WhatsApp. Yo no recibo a quién.
// Lo que se cuenta es que ABRIÓ compartir (no si de verdad guardó o mandó): así se llama el evento.
export default function Pasos({ pantalla }) {
  const [aviso, setAviso] = useState(null)
  const [hrefs, setHrefs] = useState({ convocar: '/convocar', decision: '/decision' })
  useEffect(() => { setHrefs({ convocar: conFuente('/convocar'), decision: conFuente('/decision') }) }, [])
  async function compartir(tipo) {
    registrar(tipo === 'colega' ? 'compartir_colega' : 'compartir_guardar', pantalla)
    const texto = MENSAJES[tipo]
    try {
      if (navigator.share) { await navigator.share({ text: texto }); return }
      await navigator.clipboard.writeText(texto); setAviso(tipo === 'colega' ? 'Texto copiado. Péguelo en el chat de su colega.' : 'Enlace copiado. Péguelo en sus notas o mándeselo a usted mismo.')
    } catch (err) { if (err && err.name !== 'AbortError') setAviso('No se pudo abrir compartir. Copie la dirección de esta página.') }
  }
  const boton = 'block w-full rounded-xl border px-4 py-3 text-left'
  return (
    <section aria-labelledby="pasos" className="space-y-3">
      <h2 id="pasos" className="text-xl font-semibold">Qué puede hacer ahora</h2>
      <Link href={hrefs.convocar} className={`${boton} border-emerald-400/60 bg-emerald-400/10`}>
        <span className="font-semibold text-emerald-200">Tengo una finalista esta semana → abrirle una ventana</span>
        <span className="block text-sm text-neutral-300">Dos minutos. La primera de cada vacante es gratis. No pide correo ni teléfono.</span>
      </Link>
      <button type="button" onClick={() => compartir('guardar')} className={`${boton} border-neutral-600`}>
        <span className="font-semibold">Hoy no tengo finalistas → guardarme el enlace</span>
        <span className="block text-sm text-neutral-300">Abre compartir en su teléfono para que se lo mande a usted mismo o lo deje en sus notas. Aquí no se guarda nada suyo.</span>
      </button>
      <button type="button" onClick={() => compartir('colega')} className={`${boton} border-neutral-600`}>
        <span className="font-semibold">Conozco a un colega con despacho → mandárselo</span>
        <span className="block text-sm text-neutral-300">Lo manda usted, desde su WhatsApp. No le pido el nombre ni el número de nadie.</span>
      </button>
      <Link href={hrefs.decision} className={`${boton} border-neutral-600`}>
        <span className="font-semibold">Solo quiero opinar → tres preguntas, anónimo</span>
        <span className="block text-sm text-neutral-300">Dos minutos. Veinte respuestas de despachos deciden si esto sigue.</span>
      </Link>
      {aviso && <p role="status" className="text-sm text-amber-200">{aviso}</p>}
    </section>
  )
}
