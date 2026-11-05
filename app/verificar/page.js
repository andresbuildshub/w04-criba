import { verificar, haySecreto } from '../../lib/firma'
import { leerIntento, horaMX, minutos } from '../../lib/convocatorias'
import { RUBRICA_VERSION } from '../../lib/muestra'
import Evento from '../Evento'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
const ASIST = { ninguna: 'no usó ninguna ayuda', consulte_fuentes: 'consultó leyes o apuntes', use_ia: 'usó una IA', no_declarada: 'no declarada' }
const TIPO = { 2: 'gasto pagado en efectivo que no se deduce así', 4: 'consumo en restaurante al 100% (solo 8.5%)', 6: 'inversión (activo fijo) registrada como gasto', 14: 'factura emitida a otro RFC' }
const ids = s => String(s || '').split('.').map(Number).filter(n => TIPO[n])

// Dos caminos:
//  (1) /verificar?c=XXXX-XXXX → busca el INTENTO registrado (muestra abierta por un despacho): "Registrado por Criba el …".
//  (2) /verificar?c=…&f=…&a=… → muestra libre: recalcula la firma con los campos de la URL (no guarda nada).
// En ningún caso se guarda el código ni quién verificó: solo el evento "constancia_verificada".
export default async function Verificar({ searchParams }) {
  const q = await searchParams
  const c = (q.c || '').toString().toUpperCase().trim()
  const intento = c ? await leerIntento(c) : null
  const campos = { fecha: q.f, version: q.v || RUBRICA_VERSION, aciertos: q.a, falsos: q.x, cumplidos: q.m, total: q.t, asistencia: q.s }
  const completo = !intento && Object.values(campos).every(v => typeof v === 'string' && v.length > 0 && v.length < 40)
  const firmaOk = completo && verificar(campos, c)
  const ok = Boolean(intento) || firmaOk
  return (
    <div className="max-w-2xl space-y-6">
      <Evento evento={ok ? 'constancia_verificada' : 'inicio_visto'} pantalla="verificar" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para dueños de despacho · 30 segundos</p>
        <h1 className="text-3xl font-bold">¿Esta constancia es de verdad?</h1>
      </header>

      {!c && <p className="text-neutral-300">Abra el enlace que viene dentro de la constancia (empieza con <span className="font-mono">/verificar?c=</span>), o escriba el código aquí: <form className="mt-3 flex gap-2"><input name="c" placeholder="XXXX-XXXX" className="rounded-lg border border-neutral-700 bg-neutral-900 p-2 font-mono" /><button className="rounded-lg bg-amber-300 px-3 py-2 text-sm font-semibold text-neutral-950">Buscar</button></form></p>}

      {intento && (
        <section className="space-y-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <p className="text-xl font-semibold text-emerald-200">Registrado por Criba el {horaMX(intento.entrega)}. Coincide.</p>
          <ul className="space-y-1 text-neutral-200">
            <li>Muestra abierta con el enlace de <b>{intento.despacho}</b> · inició {horaMX(intento.inicio)} · entregó {horaMX(intento.entrega)} ({minutos(intento.inicio, intento.entrega)} min) · una sola sesión, un solo intento.</li>
            <li>Encontró <b>{intento.aciertos.length} de 4</b>: {intento.aciertos.map(i => TIPO[i]).join('; ') || 'ninguno'}.</li>
            <li className={intento.omitidos.length ? 'text-amber-200' : ''}>Se le fue: <b>{intento.omitidos.length ? intento.omitidos.map(i => TIPO[i]).join('; ') : 'ninguno'}</b>.</li>
            <li>Marcó de más (estaba bien): <b>{intento.falsos.length}</b>. {intento.aprobado ? 'Pasó' : 'No pasó'} la regla (3 o más, a lo sumo una de más).</li>
            <li>Su mensaje al cliente cumplió {intento.cumplidos} de {intento.total} verificaciones de texto (reglas, no IA). Ayuda declarada: {ASIST[intento.asistencia] || intento.asistencia}.</li>
          </ul>
          <details className="rounded-lg border border-neutral-800 p-3 text-sm"><summary className="cursor-pointer">Lo que escribió al cliente (tal cual)</summary><p className="mt-2 whitespace-pre-wrap text-neutral-200">«{intento.mensaje}»</p></details>
          <p className="text-sm text-neutral-400">Lo que esto NO dice: que esté certificada, que sea apta, ni cómo va a trabajar. Lo que sí: fue una sola sesión de 60 minutos con su enlace, y aquí está lo que se le fue. En la entrevista pídale que explique en voz alta justo esa factura.</p>
        </section>
      )}

      {!intento && c && !completo && (
        <section className="rounded-2xl border border-rose-400/40 bg-rose-400/5 p-5">
          <p className="text-xl font-semibold text-rose-200">No existe registro con este código.</p>
          <p className="mt-2 text-sm text-neutral-300">Si la constancia dice "muestra libre", abra el enlace completo que viene dentro (trae los datos que el código firma). Si dice "abierta con el enlace de un despacho", el código debería existir: pídale a la candidata que lo copie otra vez, o la constancia no es de Criba.</p>
        </section>
      )}

      {!intento && completo && !haySecreto() && <p className="rounded-xl border border-rose-400/40 bg-rose-400/5 p-4 text-rose-200">Este servidor no tiene configurada la firma de constancias libres: no se puede verificar aquí.</p>}
      {!intento && completo && haySecreto() && (firmaOk ? (
        <section className="space-y-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <p className="text-xl font-semibold text-emerald-200">Firma válida: estos números no se editaron.</p>
          <p className="text-sm text-amber-200">Pero es una muestra LIBRE: la hizo por su cuenta, sin ventana de despacho. Criba no registró el intento; solo puede decir que el texto no cambió. Si quiere una sesión única con su enlace, <Link href="/convocar" className="underline">abra una muestra</Link>.</p>
          <ul className="space-y-1 text-neutral-200">
            <li>Fecha: <b>{campos.fecha}</b> · rúbrica <b>{campos.version}</b></li>
            <li>Encontró <b>{campos.aciertos} de 4</b>; marcó <b>{campos.falsos}</b> de más.</li>
            {ids(q.o).length > 0 && <li className="text-amber-200">Se le fue: <b>{ids(q.o).map(i => TIPO[i]).join('; ')}</b>.</li>}
            <li>Mensaje al cliente: <b>{campos.cumplidos} de {campos.total}</b> verificaciones de texto (reglas, no IA). Ayuda declarada: <b>{ASIST[campos.asistencia] || campos.asistencia}</b>.</li>
          </ul>
        </section>
      ) : (
        <section className="rounded-2xl border border-rose-400/40 bg-rose-400/5 p-5">
          <p className="text-xl font-semibold text-rose-200">No: el código no coincide con estos datos.</p>
          <p className="mt-2 text-sm text-neutral-300">Dos causas distintas: el enlace llegó cortado (vuelva a abrirlo completo desde la constancia) o alguien cambió un número. Si al abrirlo completo sigue en rojo, los datos se editaron.</p>
        </section>
      ))}
      <p className="text-xs text-neutral-500">Esta página no guarda el código, ni quién lo abrió. Solo cuenta que alguien verificó una constancia hoy (ver <Link href="/metrica" className="underline">métrica</Link>).</p>
    </div>
  )
}
