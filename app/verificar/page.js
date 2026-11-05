import { verificar, haySecreto } from '../../lib/firma'
import { RUBRICA_VERSION } from '../../lib/muestra'
import Evento from '../Evento'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
const ASIST = { ninguna: 'no usó ninguna ayuda', consulte_fuentes: 'consultó leyes o apuntes', use_ia: 'usó una IA', no_declarada: 'no declarada' }

// /verificar?c=XXXX-XXXX&f=2026-11-05&a=3&x=1&m=5&t=6&s=ninguna
// Recalcula la firma con los campos de la URL. NO guarda el código, ni los campos, ni quién verificó: solo el evento "constancia_verificada".
export default async function Verificar({ searchParams }) {
  const q = await searchParams
  const campos = { fecha: q.f, version: q.v || RUBRICA_VERSION, aciertos: q.a, falsos: q.x, cumplidos: q.m, total: q.t, asistencia: q.s }
  const completo = Object.values(campos).every(v => typeof v === 'string' && v.length > 0 && v.length < 40)
  const ok = completo && verificar(campos, q.c || '')
  return (
    <div className="max-w-2xl space-y-6">
      <Evento evento={ok ? 'constancia_verificada' : 'inicio_visto'} pantalla="verificar" />
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Para dueños de despacho · 30 segundos</p>
        <h1 className="text-3xl font-bold">¿Esta constancia es de verdad?</h1>
      </header>
      {!haySecreto() && <p className="rounded-xl border border-rose-400/40 bg-rose-400/5 p-4 text-rose-200">Este servidor no tiene configurada la firma de constancias: no se puede verificar nada aquí.</p>}
      {haySecreto() && !completo && <p className="text-neutral-300">Abra el enlace que viene dentro de la constancia (empieza con <span className="font-mono">/verificar?c=</span>). Si solo tiene el código, pídale a la candidata el enlace completo: el código no dice nada sin los datos que firma.</p>}
      {haySecreto() && completo && (ok ? (
        <section className="space-y-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-5">
          <p className="text-xl font-semibold text-emerald-200">Sí: el código coincide con estos datos.</p>
          <ul className="space-y-1 text-neutral-200">
            <li>Fecha: <b>{campos.fecha}</b> · rúbrica <b>{campos.version}</b></li>
            <li>Encontró <b>{campos.aciertos} de 4</b> facturas mal clasificadas, con <b>{campos.falsos}</b> marcada(s) de más.</li>
            <li>Su mensaje al cliente cumplió <b>{campos.cumplidos} de {campos.total}</b> verificaciones (revisión por reglas, no por IA).</li>
            <li>Ayuda declarada: <b>{ASIST[campos.asistencia] || campos.asistencia}</b>. Aplicación remota, sin supervisión.</li>
          </ul>
          <p className="text-sm text-neutral-400">Lo que esto NO dice: que esté certificada, que sea apta, que lo haya hecho sola, ni cómo va a trabajar. Lo que sí sirve: pídale en la entrevista que le explique una de las cuatro facturas en voz alta. Dos minutos.</p>
        </section>
      ) : (
        <section className="rounded-2xl border border-rose-400/40 bg-rose-400/5 p-5">
          <p className="text-xl font-semibold text-rose-200">No: el código no coincide con estos datos.</p>
          <p className="mt-2 text-sm text-neutral-300">O el enlace se copió incompleto, o los datos se cambiaron. Pídale a la candidata que vuelva a copiar la constancia completa.</p>
        </section>
      ))}
      <p className="text-xs text-neutral-500">Esta página no guarda el código, ni los datos, ni quién los abrió. Solo cuenta que alguien verificó una constancia hoy (ver <Link href="/metrica" className="underline">métrica</Link>).</p>
    </div>
  )
}
