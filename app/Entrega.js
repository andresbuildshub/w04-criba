// Semana 15 — la entrega de UNA finalista, como papel de trabajo. Mismo contenido que /verificar, con el sistema visual de las piezas:
// papel = dato del ejercicio · mono = dato · marcatextos = una sola cosa · gris en mayúsculas = etiqueta.
// Regla de sombra: este componente recibe UNA entrega. No existe una versión de dos columnas, ni muestra minutos.
export default function Entrega({ e, cliente, grande = false }) {
  const t = grande ? { base: 'text-[26px] leading-[1.45]', chico: 'text-[20px]', pad: 'p-10', gap: 'space-y-6' } : { base: 'text-sm leading-relaxed', chico: 'text-xs', pad: 'p-4', gap: 'space-y-3' }
  return (
    <section aria-label="Entrega de una finalista inventada" className={`rounded-2xl bg-[#F5F0E6] font-mono text-[#0A0A0A] ${t.pad} ${t.gap} ${t.base}`}>
      <p className={`font-sans font-semibold uppercase tracking-widest text-neutral-600 ${t.chico}`}>Inventado · {e.quien} · cliente del ejercicio: {cliente.nombre}</p>
      <p>Registrado por Criba. Entregó dentro de la ventana de 60 minutos, una sola sesión.</p>
      <div>
        <p className="font-semibold">Marcó y sí estaba mal: {e.encontro.length} de 4</p>
        <ul className="list-disc pl-6">{e.encontro.map(x => <li key={x}>{x}</li>)}</ul>
      </div>
      <p><span className="bg-[#FCD34D] px-1 font-semibold">Se le fue: {e.seLeFue.join('; ')}</span></p>
      <p>Marcó de más (estaba bien): {e.deMas.map(d => `${d.folio}, ${d.concepto}`).join('; ')}</p>
      <div>
        <p className="font-semibold">Lo que le escribió al cliente del ejercicio (tal cual):</p>
        <p className="mt-1 border-l-4 border-neutral-400 pl-3 font-sans">«{e.mensaje}»</p>
      </div>
      <p className={`${t.chico} text-neutral-700`}>Ayuda que ella declaró: {e.asistencia}.</p>
    </section>
  )
}
