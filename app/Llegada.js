'use client'
import { useEffect } from 'react'
import { registrar, fuenteActual } from '../lib/registrar'
// Cuenta la pantalla vista y, si el enlace traía ?f= de la lista cerrada, una llegada por ese canal. Un canal, no una persona.
export default function Llegada({ evento, pantalla }) {
  useEffect(() => { registrar(evento, pantalla); if (fuenteActual()) registrar('llegada', pantalla) }, [evento, pantalla])
  return null
}
