import { PIEZAS } from '../../../lib/piezas'

// Pieza B · Serie 2 «La pantalla, a la vista». Molde 1080×1350 que renderiza EXACTAMENTE el texto final del proceso
// (lib/piezas.js ← docs/proceso/b/6-final.md). El rol 6 avisó que el molde anterior pintaba la entrega completa de lib/demo.js,
// con lo que la revisión había cortado. Plantilla: franja → una línea → evidencia sobre papel con marcatextos → pie.
export const metadata = { title: 'Pieza B (molde)', robots: { index: false } }

export default function PiezaB() {
  const t = PIEZAS.b.textos
  return (
    <div id="pieza-b" style={{ width: 1080, height: 1350 }} className="fixed left-0 top-0 z-50 flex flex-col bg-[#0A0A0A] text-neutral-100">
      <p className="flex h-[72px] items-center justify-between px-[72px] text-[24px] uppercase tracking-wide text-[#A3A3A3]"><b className="text-[#F5F0E6]">Criba</b><span>{t.franja}</span></p>
      <div className="flex flex-1 flex-col justify-center gap-10 bg-[#F5F0E6] px-[72px] py-12 text-[#0A0A0A]">
        <h1 className="font-sans text-[62px] font-bold leading-[1.12]">{t.linea}</h1>
        <div className="space-y-5">
          <p className="inline-block bg-[#0A0A0A] px-3 py-1 font-sans text-[24px] font-bold tracking-widest text-[#F5F0E6]">EJEMPLO INVENTADO</p>
          {t.evidencia.map(l => l === t.marcatextos
            ? <p key={l} className="font-mono text-[32px] font-bold leading-[1.35]"><span className="bg-[#FCD34D] px-2 [box-decoration-break:clone]">{l}</span></p>
            : <p key={l} className="border-b border-[#0A0A0A]/20 pb-4 font-mono text-[30px] leading-[1.35]">{l}</p>)}
        </div>
      </div>
      <div className="space-y-3 px-[72px] py-8 text-[24px] leading-snug">{t.pie.map((l, i) => <p key={l} className={i === 0 ? 'text-[#A3A3A3]' : i === 1 ? 'text-[#F5F0E6]' : 'font-mono text-[30px] font-bold text-[#34D399]'}>{l}</p>)}</div>
    </div>
  )
}
