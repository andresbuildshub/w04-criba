// Junta lo que dejó cada rol (docs/proceso/<pieza>/) en lib/rastro.json, que es lo que enseña /proceso.
// No resume ni corrige: copia la salida de cada chat tal cual, con cuántos segundos tardó.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const PASOS = [['1-ficha', 'Investigación'], ['2-borrador', 'Redacción'], ['3-visual', 'Producción visual'], ['4-afirmaciones', 'Verificación de afirmaciones'], ['5-estilo', 'Revisión de estilo'], ['6-final', 'Revisión final']]
const out = {}
for (const p of ['a', 'b', 'c']) {
  const dir = join(raiz, 'docs', 'proceso', p)
  if (!existsSync(join(dir, '6-final.md'))) continue
  const tiempos = Object.fromEntries(readFileSync(join(dir, 'tiempos.tsv'), 'utf8').trim().split('\n').map(l => { const [k, s, cuando] = l.split('\t'); return [k, { s: Number(s), cuando }] }))
  const pasos = PASOS.map(([k, rol]) => ({ clave: k, rol, segundos: tiempos[k]?.s ?? null, cuando: tiempos[k]?.cuando ?? null, salida: readFileSync(join(dir, `${k}.md`), 'utf8').trim() }))
  const fin = pasos[5].salida
  const seccion = nombre => { const m = fin.match(new RegExp(`## ${nombre}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)); return m ? m[1].trim() : '' }
  out[p] = { pasos, totalSegundos: pasos.reduce((a, x) => a + (x.segundos || 0), 0), cortes: seccion('Cortes'), pendiente: seccion('Pendiente') }
}
writeFileSync(join(raiz, 'lib', 'rastro.json'), JSON.stringify(out, null, 1))
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.totalSegundos} s`).join(' · '))
