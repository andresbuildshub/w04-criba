import Link from 'next/link'
import Evento from '../Evento'
import Copiar from './Copiar'
import { leerEventos, resumirEventos, FUENTES_LOG } from '../../lib/eventos'
import { PUBLICO, PROMESA, PRIMERA_LINEA, POSICION, NO_PROMETO, NO_PUBLICO, EVIDENCIA, VOZ, LINEA_DEBIL, PALETA, TIPOGRAFIA, PLANTILLA, POR_QUE_ENCAJA, SERIES, PIEZAS, MENSAJES, REGLA_ENVIO, PRUEBA } from '../../lib/piezas'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Criba — playbook de lanzamiento', description: 'A quién le habla Criba, qué le promete, cómo suena y cómo se ve, y qué pasó cuando lo mandé.' }

const NOMBRE_FUENTE = { tibio_a: 'Tibio · Pieza A', tibio_b: 'Tibio · Pieza B', frio_a: 'Frío, no pedido · Pieza A', frio_b: 'Frío, no pedido · Pieza B', guardado: 'Enlace guardado', colega: 'Reenviado por un colega', prueba: 'Mis pruebas automáticas' }
const COLS = [['llegada', 'Llegaron'], ['lectura_terminada', 'Terminaron la lectura'], ['compartir_guardar', 'Abrieron guardar'], ['compartir_colega', 'Abrieron mandar a colega'], ['convocar_abierto', 'Abrieron /convocar'], ['convocatoria_creada', 'Crearon una ventana'], ['decision_enviada', 'Contestaron el tablero']]
const H2 = ({ children }) => <h2 className="text-2xl font-bold">{children}</h2>
const Caja = ({ children }) => <div className="rounded-2xl border border-neutral-800 p-5">{children}</div>

export default async function Playbook() {
  const { items } = await leerEventos()
  const s = resumirEventos(items, 30)
  const aprobadas = Object.values(PIEZAS).filter(p => p.aprobada).length
  return (
    <article className="max-w-3xl space-y-10">
      <Evento evento="playbook_visto" pantalla="playbook" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Semana 15 · distribución · escrito antes de enviar nada</p>
        <h1 className="text-3xl font-bold">Playbook de lanzamiento</h1>
        <p className="text-neutral-300">A quién le habla Criba primero, qué le promete con evidencia, cómo suena, cómo se ve, qué piezas existen y qué pasó cuando las mandé. Cómo se escribe cada pieza y qué se le corta está en <Link href="/proceso" className="underline">proceso</Link>.</p>
      </header>

      <section className="space-y-4">
        <H2>1 · Estrategia</H2>
        <Caja>
          <dl className="space-y-3 text-neutral-200">
            <div><dt className="text-xs uppercase text-neutral-500">Primer público</dt><dd>{PUBLICO.quien} {PUBLICO.usuarioPagador}</dd></div>
            <div><dt className="text-xs uppercase text-neutral-500">El momento</dt><dd>{PUBLICO.momento} {PUBLICO.limite}</dd></div>
            <div><dt className="text-xs uppercase text-neutral-500">Lo que hace hoy</dt><dd>{PUBLICO.hoy}</dd></div>
            <div><dt className="text-xs uppercase text-neutral-500">Posicionamiento</dt><dd>{POSICION} Frente a una prueba que entrega un ranking, Criba pide leer y no da veredicto. A quien quiere una lista ordenada lo pierdo, y no lo intento convencer.</dd></div>
            <div><dt className="text-xs uppercase text-neutral-500">La promesa</dt><dd className="font-semibold text-amber-200">{PROMESA}</dd></div>
            <div><dt className="text-xs uppercase text-neutral-500">La promesa que no hago</dt><dd>{NO_PROMETO.principal} Tampoco: {NO_PROMETO.tambien.join(' ')}</dd></div>
          </dl>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Con qué evidencia</h3>
          <ul className="mt-2 space-y-1 text-sm">{EVIDENCIA.map(e => <li key={e.que} className="flex justify-between gap-4 border-b border-neutral-900 py-1"><span>{e.que} <span className="text-xs uppercase text-neutral-500">· {e.tipo}</span></span><b className="shrink-0">{e.valor}</b></li>)}</ul>
        </Caja>
        <Caja>
          <h3 className="font-semibold">A quién no le hablo todavía</h3>
          <ul className="mt-2 space-y-2 text-sm text-neutral-300">{NO_PUBLICO.map(n => <li key={n.quien}><b className="text-neutral-100">{n.quien}.</b> {n.porque} <span className="text-neutral-400">Si llega solo: {n.siLlega}</span></li>)}</ul>
        </Caja>
      </section>

      <section className="space-y-4">
        <H2>2 · Marca</H2>
        <Caja>
          <h3 className="font-semibold">Tres reglas de voz</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-neutral-300">{VOZ.map(v => <li key={v.regla}><b className="text-neutral-100">{v.regla}.</b> {v.como}</li>)}</ol>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Una línea débil, reescrita</h3>
          <p className="mt-2 text-neutral-400 line-through">{LINEA_DEBIL.antes}</p>
          <p className="mt-1 text-sm text-neutral-400">{LINEA_DEBIL.porque}</p>
          <p className="mt-2 font-semibold text-amber-200">{LINEA_DEBIL.despues}</p>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Sistema visual</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">{PALETA.map(c => <li key={c.hex}><span className="block h-10 rounded-lg border border-neutral-700" style={{ background: c.hex }} /><b>{c.nombre}</b> <span className="font-mono text-xs text-neutral-400">{c.hex}</span><span className="block text-xs text-neutral-400">{c.uso}</span></li>)}</ul>
          <ul className="mt-4 space-y-1 text-sm text-neutral-300">{TIPOGRAFIA.map(t => <li key={t.nivel}><b className="text-neutral-100">{t.nivel}:</b> {t.como}</li>)}</ul>
          <p className="mt-3 text-sm text-neutral-300"><b className="text-neutral-100">Plantilla que se repite:</b> {PLANTILLA.join(' → ')}.</p>
          <p className="mt-3 text-sm text-neutral-300"><b className="text-neutral-100">Por qué le queda a este público y a México:</b> {POR_QUE_ENCAJA}</p>
        </Caja>
      </section>

      <section className="space-y-4">
        <H2>3 · Seis conceptos en tres series</H2>
        <p className="text-neutral-300">Tres terminadas, una por serie, en tres formatos. Las otras tres son bocetos con propósito: no son piezas.</p>
        {SERIES.map(se => (
          <Caja key={se.id}>
            <h3 className="font-semibold">Serie {se.id} · {se.nombre} <span className="text-sm font-normal text-neutral-400">· {se.formato}</span></h3>
            <p className="text-sm text-neutral-400">{se.para}</p>
            <ul className="mt-2 space-y-2 text-sm">{se.conceptos.map(c => (
              <li key={c.id} className="flex gap-3"><span className={`h-fit shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${c.estado === 'terminada' ? 'bg-emerald-400/20 text-emerald-200' : 'bg-neutral-800 text-neutral-300'}`}>{c.estado === 'terminada' ? `Pieza ${c.pieza.toUpperCase()}` : 'Boceto'}</span>
                <span>{c.titulo}{c.proposito && <span className="block text-neutral-400">Para qué: {c.proposito}</span>}</span></li>))}
            </ul>
          </Caja>
        ))}
      </section>

      <section className="space-y-4">
        <H2>4 · Las tres piezas</H2>
        <p className="text-sm text-neutral-300">Aprobadas por una persona: <b>{aprobadas} de 3</b>. {aprobadas < 3 && 'Una pieza sin aprobar no se le ha enviado a nadie.'}</p>
        <Caja>
          <h3 className="font-semibold">Pieza A · interactiva · <Link href="/lectura" className="underline">/lectura</Link></h3>
          <p className="mt-1 text-neutral-300">{PIEZAS.a.textos.titular}</p>
          <p className="mt-1 text-sm text-neutral-400">{PIEZAS.a.aprobada ? `Aprobada por ${PIEZAS.a.aprobada.por} el ${PIEZAS.a.aprobada.dia}.` : 'Pendiente de aprobación humana.'}</p>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Pieza B · imagen · se manda dentro del mensaje y aterriza en <Link href="/despachos" className="underline">/despachos</Link></h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/piezas/b.png" alt={PIEZAS.b.textos.texto_alternativo} width={1080} height={1350} className="mt-3 w-full max-w-sm rounded-xl border border-neutral-800" />
          <p className="mt-1 text-sm text-neutral-400">{PIEZAS.b.aprobada ? `Aprobada por ${PIEZAS.b.aprobada.por} el ${PIEZAS.b.aprobada.dia}.` : 'Pendiente de aprobación humana.'}</p>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Pieza C · texto · WhatsApp o LinkedIn</h3>
          <div className="mt-3 whitespace-pre-wrap rounded-xl bg-[#F5F0E6] p-4 text-sm text-[#0A0A0A]"><b>{PIEZAS.c.textos.titular || 'En proceso'}</b>{'\n\n'}{PIEZAS.c.textos.cuerpo}{'\n\n'}{PIEZAS.c.textos.siguiente_paso}</div>
          <Copiar texto={`${PIEZAS.c.textos.titular}\n\n${PIEZAS.c.textos.cuerpo}\n\n${PIEZAS.c.textos.siguiente_paso}`} />
          <p className="mt-1 text-sm text-neutral-400">{PIEZAS.c.aprobada ? `Aprobada por ${PIEZAS.c.aprobada.por} el ${PIEZAS.c.aprobada.dia}.` : 'Pendiente de aprobación humana.'}</p>
        </Caja>
      </section>

      <section className="space-y-4">
        <H2>5 · La prueba de distribución</H2>
        <Caja>
          <h3 className="font-semibold">Quién puede recibir un mensaje sobre Criba</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-300">{REGLA_ENVIO.quien.map(q => <li key={q}>{q}</li>)}</ol>
          <ul className="mt-3 space-y-1 text-sm text-neutral-300">
            <li><b className="text-neutral-100">Cuántas veces:</b> {REGLA_ENVIO.veces}</li>
            <li><b className="text-neutral-100">Reenvíos:</b> {REGLA_ENVIO.terceros}</li>
            <li><b className="text-neutral-100">Qué guardo:</b> {REGLA_ENVIO.guardo}</li>
            <li><b className="text-neutral-100">Lo que no hago aunque funcione:</b> {REGLA_ENVIO.nunca.join(' · ')}.</li>
            <li><b className="text-neutral-100">La ley:</b> {REGLA_ENVIO.ley}</li>
          </ul>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Lo que espero, escrito el {PRUEBA.escrita}, antes de enviar</h3>
          <p className="mt-1 text-sm text-neutral-400">{PRUEBA.canal} {PRUEBA.reparto}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-300">{PRUEBA.esperado.map(e => <li key={e}>{e}</li>)}</ul>
          <h4 className="mt-3 text-sm font-semibold">Qué cuenta como falla</h4>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-neutral-300">{PRUEBA.umbrales.map(e => <li key={e}>{e}</li>)}</ul>
          <h4 className="mt-3 text-sm font-semibold">La regla para el público</h4>
          <p className="mt-1 text-sm text-neutral-300">{PRUEBA.reglaPublico}</p>
        </Caja>
        <Caja>
          <h3 className="font-semibold">Los mensajes, tal como salen</h3>
          <p className="text-sm text-neutral-400">Viven en el mismo archivo que las piezas y pasan la misma prueba. Yo copio y pego; lo único libre es el saludo.</p>
          <ul className="mt-2 space-y-2 text-sm">{['tibio_a', 'tibio_b', 'frio_a', 'frio_b'].map(k => <li key={k}><span className="text-xs uppercase text-neutral-500">{NOMBRE_FUENTE[k]}</span><p className="rounded-lg bg-neutral-900 p-3 text-neutral-200">{MENSAJES[k]}</p></li>)}</ul>
        </Caja>
      </section>

      <section className="space-y-4">
        <H2>6 · Resultados, como salgan</H2>
        <Caja>
          {PRUEBA.envio ? (
            <div className="space-y-2 text-sm text-neutral-200">
              <p><b>Enviado el {PRUEBA.envio.dia}:</b> {PRUEBA.envio.tibios} mensajes tibios y {PRUEBA.envio.frios} en frío.</p>
              {PRUEBA.envio.piezaA != null && <p>Pieza A a {PRUEBA.envio.piezaA}, Pieza B a {PRUEBA.envio.piezaB}. Contestaron por escrito {PRUEBA.envio.respuestas.length}; sin respuesta {PRUEBA.envio.sinRespuesta}.</p>}
              {PRUEBA.envio.log && <p className="text-neutral-300">{PRUEBA.envio.log}</p>}
              {PRUEBA.envio.contraLoEsperado && <p><b>Contra lo que esperaba:</b> {PRUEBA.envio.contraLoEsperado}</p>}
              {PRUEBA.envio.respuestas.length === 0 ? <p>Nadie contestó por escrito.</p> : <ul className="space-y-1">{PRUEBA.envio.respuestas.map((r, i) => <li key={i}>{r.rol} · {r.canal} · Pieza {r.pieza}: “{r.palabras}”</li>)}</ul>}
              <p className="text-amber-200">Qué me quedo y qué cambio: {PRUEBA.envio.queCambia}</p>
            </div>
          ) : (
            <p className="font-semibold text-amber-200">PENDIENTE. Todavía no se le ha enviado ninguna pieza a nadie. Cuando salgan, aquí va cuántos mensajes fueron, lo que contestaron con sus palabras (rol, nunca nombre) y qué cambio. Si nadie contesta, aquí dirá cero.</p>
          )}
          <h3 className="mt-4 font-semibold">Lo que cuenta el log por canal · últimos 30 días · en vivo</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="text-neutral-500"><tr><th className="p-2">Canal</th>{COLS.map(([, t]) => <th key={t} className="p-2">{t}</th>)}</tr></thead>
              <tbody>{FUENTES_LOG.map(f => <tr key={f} className={`border-t border-neutral-800 ${f === 'prueba' ? 'text-neutral-500' : ''}`}><td className="p-2">{NOMBRE_FUENTE[f]}</td>{COLS.map(([e]) => <td key={e} className="p-2 font-mono">{s.porFuente[f][e] || 0}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-neutral-500">Cada renglón es un canal, no una persona: el log guarda evento, día y por cuál enlace llegó, de una lista cerrada. "Abrieron guardar" y "abrieron mandar a colega" cuentan que se abrió la hoja de compartir, no que se mandó. El renglón de pruebas automáticas es mío y no cuenta como público.</p>
        </Caja>
      </section>
    </article>
  )
}
