import { CFDIS, CLIENTE, RUBRICA_VERSION } from '../../lib/muestra'
import Muestra from './Muestra'

// Server component: la verdad de terreno (campo `error`) se quita ANTES de enviar al navegador.
export default function Page() {
  const publicos = CFDIS.map(({ error, ...c }) => c)
  return <Muestra cfdis={publicos} cliente={CLIENTE} version={RUBRICA_VERSION} />
}
