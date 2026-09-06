import { NextResponse } from 'next/server'
import { calificarSeleccion, revisarMensaje, CFDIS, RUBRICA_VERSION, CLIENTE } from '../../../lib/muestra'

export const dynamic = 'force-dynamic'
const ASISTENCIA = ['ninguna', 'consulte_fuentes', 'use_ia']

// La verdad de terreno vive aquí, en el servidor. La respuesta NO se guarda (Condición 5: la evidencia es de la candidata).
export async function POST(req) {
  let b; try { b = await req.json() } catch { return NextResponse.json({ error: 'JSON inválido' }, { status: 400 }) }
  const seleccion = Array.isArray(b.seleccion) ? b.seleccion.map(Number).filter(n => Number.isInteger(n) && n >= 1 && n <= 20).slice(0, 20) : []
  const mensaje = typeof b.mensaje === 'string' ? b.mensaje.slice(0, 2000) : ''
  const asistencia = ASISTENCIA.includes(b.asistencia) ? b.asistencia : 'no_declarada'
  const sel = calificarSeleccion(seleccion)
  const msg = revisarMensaje(mensaje, sel.aciertos)
  const detalle = CFDIS.filter(c => c.error).map(c => ({ id: c.id, folio: c.folio, encontrado: sel.aciertos.includes(c.id), explicacion: c.error.explicacion, accion: c.error.accion }))
  const falsos = CFDIS.filter(c => sel.falsos.includes(c.id)).map(c => ({ id: c.id, folio: c.folio, nota: c.agente.nota || 'Clasificación correcta.' }))
  const fecha = new Date()
  const vence = new Date(fecha); vence.setMonth(vence.getMonth() + 12)
  // Constancia ACOTADA (Condición 2): dice exactamente qué se probó, en qué condiciones, y qué NO afirma.
  const constancia = `Constancia acotada · Criba muestra ${RUBRICA_VERSION} · ${fecha.toISOString().slice(0, 10)}\n` +
    `Tarea: revisar 20 CFDIs (datos inventados, cliente ficticio ${CLIENTE.nombre}) clasificados por un agente simulado y detectar los 4 mal clasificados; redactar el mensaje al cliente.\n` +
    `Resultado: identificó ${sel.aciertos.length} de 4 errores, con ${sel.falsos.length} falso(s) positivo(s). Regla v0.1: aprobado si ≥3 aciertos y ≤1 falso positivo → ${sel.aprobado ? 'APROBADO' : 'NO APROBADO'} en esta muestra.\n` +
    `Mensaje al cliente: ${msg.cumplidos} de ${msg.total} verificaciones de texto cumplidas (revisión SIMULADA por reglas, no juicio de IA).\n` +
    `Asistencia declarada: ${asistencia}. Aplicación remota sin supervisión. Vigencia informativa hasta ${vence.toISOString().slice(0, 10)}.\n` +
    `Esta constancia NO afirma que la persona esté certificada, que sea apta para el puesto, que haya trabajado sin ayuda, ni predice su desempeño. Solo describe esta tarea.`
  return NextResponse.json({ seleccion: sel, mensaje: msg, detalle, falsos, constancia, asistencia })
}
