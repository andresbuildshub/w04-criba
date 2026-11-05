'use client'
import { useEffect } from 'react'
import { registrar } from '../lib/registrar'
// Registra un evento de "pantalla vista" al montar. Se usa en server components que no pueden llamar al log.
export default function Evento({ evento, pantalla }) {
  useEffect(() => { registrar(evento, pantalla) }, [evento, pantalla])
  return null
}
