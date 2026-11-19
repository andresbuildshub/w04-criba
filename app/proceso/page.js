import Link from 'next/link'
import Evento from '../Evento'
import rastro from '../../lib/rastro.json'
import { ROLES, DESPUES_DE_LOS_ROLES, LIMITES_DEL_PROCESO, PIEZAS, FUENTES } from '../../lib/piezas'
import { CASOS, revisarTexto, revisarPieza } from '../../lib/revisar'
import { CONVERSACIONES } from '../../lib/conversaciones'

export const metadata = { title: 'Criba — cómo se escribe una pieza y qué se le corta', description: 'Seis roles, una prueba automática y una aprobación humana. Cada oración se puede abrir.' }
const REPO = 'https://github.com/andresbuildshub/w04-criba/blob/main/'
const min = s => s == null ? '—' : s < 90 ? `${s} s` : `${Math.round(s / 6) / 10} min`
const H2 = ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>
const Caja = ({ children }) => <div className="rounded-2xl border border-neutral-800 p-5">{children}</div>
const NOMBRE = { a: 'Pieza A · interactiva (/lectura)', b: 'Pieza B · imagen', c: 'Pieza C · texto' }

function Rastro({ id }) {
  const r = rastro[id]
  if (!r) return <p className="text-sm text-amber-200">El proceso de esta pieza todavía no se ha corrido.</p>
  return (
    <div className="space-y-2">
      <p className="text-sm text-neutral-400">Seis chats, uno por rol, cada uno nuevo y sin memoria del anterior. Tiempo total de máquina: <b className="text-neutral-200">{min(r.totalSegundos)}</b>.</p>
      {r.pasos.map((p, i) => (
        <details key={p.clave} className="rounded-xl border border-neutral-800 p-3 text-sm">
          <summary className="cursor-pointer"><b>{i + 1} · {p.rol}</b> <span className="text-neutral-500">· {min(p.segundos)} · salida completa, sin editar</span></summary>
          <pre className="mt-2 max-h-[28rem] overflow-auto whitespace-pre-wrap text-xs text-neutral-300">{p.salida}</pre>
        </details>
      ))}
      <div className="rounded-xl border border-amber-300/40 bg-amber-300/5 p-3 text-sm">
        <b className="text-amber-200">Lo que se cortó o cambió, y por qué</b>
        <pre className="mt-1 whitespace-pre-wrap font-sans text-neutral-200">{r.cortes || '(nada)'}</pre>
        {r.pendiente && <><b className="mt-2 block text-amber-200">Lo que quedó pendiente de verificar</b><pre className="mt-1 whitespace-pre-wrap font-sans text-neutral-300">{r.pendiente}</pre></>}
      </div>
    </div>
  )
}

export default function Proceso() {
  const conv = CONVERSACIONES[0]
  const soloVerbos = CASOS.filter(c => revisarTexto(c.frase, { soloVerbos: true }).length > 0).length
  const todas = CASOS.filter(c => revisarTexto(c.frase).length > 0).length
  return (
    <article className="max-w-3xl space-y-10">
      <Evento evento="proceso_visto" pantalla="proceso" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Semana 15 · el proceso creativo, a la vista</p>
        <h1 className="text-3xl font-bold">Cómo se escribe una pieza de Criba, y qué se le corta</h1>
        <p className="text-neutral-300">Las piezas las redactan modelos de lenguaje y las corrijo yo. No le pido que me crea que las escribió un humano. Le enseño de qué registro salió cada una, qué dijo cada revisión, qué se cortó y de dónde sale cada oración. El plan completo está en el <Link href="/playbook" className="underline">playbook</Link>.</p>
      </header>

      <section className="space-y-4">
        <H2>1 · Seis roles, cada uno un chat aparte</H2>
        <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase text-neutral-500"><tr><th className="p-2">Rol</th><th className="p-2">Recibe</th><th className="p-2">Entrega</th><th className="p-2">Chequeo</th></tr></thead>
          <tbody>{ROLES.map(r => <tr key={r.n} className="border-t border-neutral-800 align-top"><td className="p-2 font-semibold">{r.n} · {r.rol}</td><td className="p-2 text-neutral-300">{r.entrada}</td><td className="p-2 text-neutral-300">{r.salida}</td><td className="p-2 text-neutral-300">{r.chequeo}</td></tr>)}</tbody>
        </table></div>
        {DESPUES_DE_LOS_ROLES.map(d => <Caja key={d.paso}><h3 className="font-semibold">{d.paso} <span className="text-sm font-normal text-neutral-400">· {d.quien}</span></h3><p className="mt-1 text-sm text-neutral-300">{d.que}</p></Caja>)}
        <p className="text-sm text-neutral-400">Sin framework de agentes ni herramienta de paga: cada rol es una instrucción en <a className="underline" href={`${REPO}scripts/proceso/roles`}>scripts/proceso/roles</a> y un guion que los corre en orden con cronómetro (<a className="underline" href={`${REPO}scripts/proceso/correr.sh`}>correr.sh</a>).</p>
      </section>

      <section className="space-y-4">
        <H2>2 · Un ejemplo completo: de un registro real a la Pieza B</H2>
        <Caja>
          <h3 className="font-semibold">La entrada: un registro del repositorio</h3>
          <p className="mt-1 text-sm text-neutral-400">La única conversación real de precio (<a className="underline" href={`${REPO}lib/conversaciones.js`}>lib/conversaciones.js</a>). Rol, nunca nombre.</p>
          <ul className="mt-2 space-y-1 font-mono text-sm text-neutral-200">
            <li>día: {conv.dia} · {conv.quien}</li>
            <li>canal: {conv.canal} · finalistas: {conv.finalistas}</li>
            <li>se enteró: {conv.semanaQueSeEntero} · resultado: {conv.resultado}</li>
            <li>“{conv.palabras}”</li>
          </ul>
        </Caja>
        <Caja><h3 className="mb-2 font-semibold">El método: lo que hizo cada rol</h3><Rastro id="b" /></Caja>
        <Caja>
          <h3 className="font-semibold">La salida</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/piezas/b.png" alt={PIEZAS.b.textos.texto_alternativo} width={1080} height={1350} className="mt-3 w-full max-w-sm rounded-xl border border-neutral-800" />
          <p className="mt-2 text-sm text-neutral-400">{PIEZAS.b.aprobada ? `Aprobada por ${PIEZAS.b.aprobada.por} el ${PIEZAS.b.aprobada.dia}.` : 'Pasó la prueba automática. Pendiente de aprobación humana: no se le ha enviado a nadie.'}</p>
        </Caja>
      </section>

      <section className="space-y-4">
        <H2>3 · Las otras dos piezas</H2>
        {['a', 'c'].map(id => <Caja key={id}><h3 className="mb-2 font-semibold">{NOMBRE[id]}</h3><Rastro id={id} /><p className="mt-2 text-sm text-neutral-400">{PIEZAS[id].aprobada ? `Aprobada por ${PIEZAS[id].aprobada.por} el ${PIEZAS[id].aprobada.dia}.` : 'Pasó la prueba automática. Pendiente de aprobación humana: no se le ha enviado a nadie.'}</p></Caja>)}
      </section>

      <section className="space-y-4">
        <H2>4 · Cada oración se puede abrir</H2>
        <p className="text-neutral-300">Las afirmaciones que quedaron en las tres piezas, cada una con las palabras literales de su fuente. Compare usted la oración con la cita: decidir si la cita la sostiene sigue siendo juicio, y por eso va a la vista.</p>
        {Object.values(PIEZAS).map(p => (
          <Caja key={p.id}>
            <h3 className="font-semibold">{NOMBRE[p.id]} <span className="text-sm font-normal text-neutral-400">· faltas de la prueba automática: {revisarPieza(p, FUENTES).length}</span></h3>
            <ul className="mt-2 space-y-3 text-sm">{p.afirmaciones.map(a => { const f = FUENTES[a.fuente]; return (
              <li key={a.texto}><p className="text-neutral-100">{a.texto}</p>
                <p className="mt-1 border-l-2 border-amber-300/60 pl-3 font-mono text-xs text-neutral-400">{f ? f.cita : 'SIN FUENTE'} <span className="text-neutral-500">— {f ? f.donde : ''}</span></p></li>) })}
            </ul>
          </Caja>
        ))}
      </section>

      <section className="space-y-4">
        <H2>5 · Cinco frases mías que la prueba rechaza</H2>
        <p className="text-neutral-300">El 19 de noviembre, discutiendo esta semana con un modelo, escribí cinco frases que mi propio Charter prohíbe. Las cinco las escribí yo, que soy el humano que aprueba. Por eso la regla no puede ser un chat ni puedo ser yo: es una prueba que corre antes de cada publicación, y estas frases son sus casos.</p>
        <ul className="space-y-2 text-sm">{CASOS.map(c => { const f = revisarTexto(c.frase); return (
          <li key={c.frase} className="rounded-xl border border-neutral-800 p-3"><p className="text-neutral-200 line-through decoration-rose-400/70">{c.frase}</p>
            <p className="mt-1 text-xs text-neutral-400">{c.origen} · la rechaza por: {[...new Set(f.map(x => x.regla))].join('; ')}</p></li>) })}
        </ul>
        <p className="text-sm text-neutral-300">La lista de verbos con la que empecé detuvo <b>{soloVerbos} de {CASOS.length}</b>. Las otras dos no tenían ningún verbo prohibido: afirmaban autoría y cercanía con un posesivo. Agregué esos patrones y hoy rechaza <b>{todas} de {CASOS.length}</b>. La sexta todavía no la he escrito.</p>
      </section>

      <section className="space-y-3">
        <H2>6 · Lo que este proceso no resuelve</H2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-300">{LIMITES_DEL_PROCESO.map(l => <li key={l}>{l}</li>)}</ul>
        <p className="text-sm text-neutral-400">Ninguna pieza usa la entrega de una candidata real, ni una estadística sobre candidatas. La finalista de las piezas no existe (<a className="underline" href={`${REPO}lib/demo.js`}>lib/demo.js</a>).</p>
      </section>
    </article>
  )
}
