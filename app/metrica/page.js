import { leerEventos, resumirEventos, EVENTOS } from '../../lib/eventos'
import { leer, resumir } from '../../lib/store'
import Evento from '../Evento'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
const NOMBRE = {
  inicio_visto: 'Abrieron la portada', muestra_vista: 'Abrieron la muestra', muestra_calificada: 'Terminaron la muestra', constancia_copiada: 'Copiaron su constancia',
  constancia_verificada: 'Verificaron una constancia', decision_abierta: 'Abrieron el formulario de despacho', decision_enviada: 'Registraron una decisión', tablero_visto: 'Vieron el tablero', regreso: 'Volvieron con el enlace "volver"',
}

export default async function Metrica() {
  const [{ items, persistencia }, resp] = await Promise.all([leerEventos(), leer()])
  const s = resumirEventos(items, 14)
  const r = resumir(resp.items)
  const dias = Object.keys(s.porDia).sort()
  return (
    <div className="space-y-8">
      <Evento evento="tablero_visto" pantalla="metrica" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Bitácora de eventos · últimos 14 días · datos reales</p>
        <h1 className="text-3xl font-bold">Métrica: qué hizo la gente, no quién</h1>
        <p className="text-neutral-300">Cada visita deja a lo más un evento con nombre y el día. Sin hora, sin IP, sin cookie, sin código de constancia, sin texto. Con pocas visitas una hora sería un nombre; por eso solo se guarda el día.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"><div className="text-xs uppercase text-neutral-500">Eventos en 14 días</div><div className="text-4xl font-bold">{s.total}</div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"><div className="text-xs uppercase text-neutral-500">Constancias verificadas</div><div className="text-4xl font-bold">{s.verificaciones}</div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"><div className="text-xs uppercase text-neutral-500">Regresos declarados</div><div className="text-4xl font-bold">{s.regresos}</div></div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-semibold">Embudo candidata</h2>
          <ul className="mt-2 space-y-1 text-sm">{s.embudoCandidata.map(e => <li key={e.evento} className="flex justify-between"><span>{NOMBRE[e.evento]}</span><b>{e.n}</b></li>)}</ul>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-5">
          <h2 className="font-semibold">Embudo despacho</h2>
          <ul className="mt-2 space-y-1 text-sm">{s.embudoDueno.map(e => <li key={e.evento} className="flex justify-between"><span>{NOMBRE[e.evento]}</span><b>{e.n}</b></li>)}</ul>
          <p className="mt-3 text-xs text-neutral-400">Regla 5 de 20 (del <Link href="/tablero" className="underline">tablero</Link>): {r.si} sí de {r.n} respuestas reales.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 p-5">
        <h2 className="font-semibold">Precio (semana 14)</h2>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          {[['pricing_visto', 'Vieron /pricing'], ['simulador_visto', 'Abrieron el simulador'], ['escenario_guardado', 'Guardaron un escenario (el escenario no viaja aquí)'], ['about_visto', 'Leyeron el memo 10:1']].map(([e, t]) => <li key={e} className="flex justify-between gap-4"><span>{t}</span><b>{s.conteo[e] || 0}</b></li>)}
        </ul>
        <p className="mt-3 text-sm text-neutral-300">Aviso de /convocar, “si pruebas a una sola, la comparas con nadie”: <b>a todas</b> {s.conteo.convocar_a_todas || 0} · <b>a ninguna</b> {s.conteo.convocar_a_ninguna || 0}. Si casi nadie elige “a ninguna”, el aviso puede estar empujando a pagar: este conteo decide si es un patrón oscuro.</p>
      </section>

      <section className="rounded-2xl border border-neutral-800 p-5">
        <h2 className="font-semibold">Por día</h2>
        {dias.length === 0 ? <p className="mt-2 text-sm text-neutral-500">Todavía ningún evento en 14 días.</p> : (
          <div className="mt-2 overflow-x-auto"><table className="w-full text-left text-xs"><thead className="text-neutral-500"><tr><th className="p-2">Día</th>{EVENTOS.map(e => <th key={e} className="p-2">{e}</th>)}</tr></thead>
            <tbody>{dias.map(d => <tr key={d} className="border-t border-neutral-800"><td className="p-2 font-mono">{d}</td>{EVENTOS.map(e => <td key={e} className="p-2">{s.porDia[d][e] || ''}</td>)}</tr>)}</tbody></table></div>
        )}
      </section>

      <section className="space-y-2 text-sm text-neutral-300">
        <h2 className="font-semibold text-neutral-100">Lo que este log nunca hace</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Guardar quién: ni IP, ni cookie, ni id de sesión, ni dispositivo. No existe una fila por persona.</li>
          <li>Guardar la hora: solo el día. Con cinco visitas, "16:07" es un nombre.</li>
          <li>Guardar el código de una constancia al verificarla: nunca sabremos cuántas veces revisaron la constancia de UNA persona, y así se queda.</li>
          <li>Guardar lo que alguien escribió: ni mensajes, ni comentarios, ni selecciones.</li>
          <li>Grabar sesiones o teclas (sin Clarity, sin Hotjar): un grabador guardaría las respuestas de la candidata.</li>
        </ul>
        <p className="text-xs text-neutral-500">Nota de honestidad: los eventos del 2026-11-05 incluyen el pase mecánico (pruebas automatizadas de la semana 13), no solo personas. Persistencia: {persistencia}. Las dos columnas de esta semana: el log mide credibilidad (abrió, verificó); las sesiones con personas miden compromiso (pidió entrevista, reenvió el link), y eso no vive aquí.</p>
      </section>
    </div>
  )
}
