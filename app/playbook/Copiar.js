'use client'
import { useState } from 'react'
export default function Copiar({ texto }) {
  const [ok, setOk] = useState(false)
  return <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(texto); setOk(true); setTimeout(() => setOk(false), 2000) } catch {} }} className="mt-3 rounded-lg border border-amber-300 px-4 py-2 text-sm text-amber-200">{ok ? 'Copiado' : 'Copiar el texto'}</button>
}
