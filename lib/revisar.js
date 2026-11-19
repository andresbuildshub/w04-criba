// Semana 15 — el revisor mecánico de afirmaciones.
// Por qué existe: en el Brain Bending del 2026-11-19 escribí cinco frases que mi propio Charter prohíbe.
// Las cinco las escribió el humano que aprueba, no un chat. Una lista en la cabeza no me detuvo; una prueba sí puede.
// Corre en `node --test` antes de cada deploy. Mi aprobación va DESPUÉS y no puede pasar por encima.
//
// LÍMITES DECLARADOS (no los vendo como resueltos):
//  1. Una lista de palabras va siempre un sinónimo atrás.
//  2. No ve dos oraciones que juntas prometen algo que ninguna promete sola.
//  3. Ve que hay fuente y cita; NO ve si la cita sostiene la oración. Eso sigue siendo juicio,
//     y por eso la cita se publica al lado de la oración (/proceso).

// `\b` de JavaScript no entiende acentos ("tardó " no tiene frontera después de la ó), así que las palabras se delimitan a mano.
const L = '[A-Za-z0-9_áéíóúüñÁÉÍÓÚÜÑ]'
const palabra = src => new RegExp(`(?<!${L})(?:${src})(?!${L})`, 'i')

// Grupo 1: la lista de verbos con la que empecé. Sola, detuvo 3 de mis 5 frases.
export const VERBOS = [
  ['certeza', palabra('sab(?:er|e|es|en|rá|rás|rán|emos|iendo)')],
  ['predicción de desempeño', palabra('sirv[ea]n?|servir[áa]?n?')],
  ['promesa de resultado', palabra('evit(?:a|ar|e|as|ará|an)')],
  ['promesa de resultado', /garantiz/i],
  ['promesa de resultado', palabra('reduc(?:e|ir|irá|en)')],
  ['promesa de resultado', /adelant/i],
  ['promesa de resultado', palabra('(?:detect|descubr|filtr)(?:a|ar|e|es|an|ir)')],
  ['certificación', /certific/i],
  ['veredicto sobre la persona', palabra('apt[ao]s?')],
  ['promesa de resultado', /contrat[a-zé]+ mejor|mejor contrataci[oó]n/i],
  ['comparación con el periodo de prueba', /periodo de prueba/i],
]

// Grupo 2: lo que agregué después de que la lista de verbos dejó pasar mis frases 4 y 5 (no tenían verbo prohibido).
export const PATRONES = [
  ['autoría que no registro', /(?:el|del) trabajo de (?:su|tu) finalista|lo (?:hizo|escribi[oó]) sola|trabaj[oó] sola/i],
  ['autoría que no registro', palabra('(?:su|tu) trabajo')],
  ['cercanía falsa (el cliente es el del ejercicio)', palabra('(?:su|tu) cliente')],
  ['comparar personas', palabra('compar(?:a|e|ar|an|ación|aciones)')],
  ['comparar personas', /lado a lado|cu[aá]l es mejor|ranking/i],
  ['comparar personas', palabra('(?:la|el) mejor')],
  ['tiempo como puntaje', palabra('tard(?:ó|aron|a)')],
  ['tiempo como puntaje', /cu[aá]nto tard/i],
  ['prueba social inventada', /ya lo usan|despachos (?:ya )?(?:lo )?usan/i],
  ['carnada', /¿sab[ií]as? que|comente abajo|comenta abajo|etiquet[ae] a |comparte si/i],
  ['signos de admiración', /[¡!]/],
  ['emoji', /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u],
  ['jerga', palabra('talento|match|onboarding|soft skills|candidate|hiring')],
  ['tuteo (la voz es de usted)', palabra('tú|tu|tus|te|ti|contigo')],
]

export function revisarTexto(texto, { soloVerbos = false } = {}) {
  const reglas = soloVerbos ? VERBOS : [...VERBOS, ...PATRONES]
  const faltas = []
  for (const [regla, re] of reglas) { const m = String(texto).match(re); if (m) faltas.push({ regla, hallazgo: m[0] }) }
  return faltas
}

// Cifras: todo número escrito con dígitos en una pieza debe estar en su lista `cifras`, y cada cifra apunta a una fuente.
export function cifrasDe(texto) { return [...String(texto).matchAll(/\d+(?:[.,]\d+)*/g)].map(m => m[0]) }

// Revisa una pieza completa: sus textos, sus cifras y sus afirmaciones (cada una con fuente y cita literal).
export function revisarPieza(pieza, fuentes) {
  const faltas = []
  // Aplana textos anidados (listas de objetos). Bug del pase mecánico: con objetos, String(obj) = "[object Object]" y no se revisaba nada.
  const hojas = v => typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(hojas) : (v && typeof v === 'object') ? Object.values(v).flatMap(hojas) : [String(v)]
  for (const [campo, t] of Object.entries(pieza.textos || {})) {
    for (const s of hojas(t)) {
      for (const f of revisarTexto(s)) faltas.push({ campo, ...f })
      for (const n of cifrasDe(s)) if (!(n in (pieza.cifras || {}))) faltas.push({ campo, regla: 'cifra sin fuente', hallazgo: n })
    }
  }
  for (const [n, f] of Object.entries(pieza.cifras || {})) if (!fuentes[f]) faltas.push({ campo: 'cifras', regla: 'cifra apunta a una fuente que no existe', hallazgo: `${n} → ${f}` })
  for (const a of pieza.afirmaciones || []) {
    const f = fuentes[a.fuente]
    if (!f) faltas.push({ campo: 'afirmaciones', regla: 'afirmación sin fuente', hallazgo: a.texto })
    else if (!f.cita || f.cita.trim().length < 8) faltas.push({ campo: 'afirmaciones', regla: 'fuente sin cita literal', hallazgo: a.fuente })
  }
  if (!pieza.afirmaciones || pieza.afirmaciones.length === 0) faltas.push({ campo: 'afirmaciones', regla: 'pieza sin ninguna afirmación con fuente', hallazgo: pieza.id })
  return faltas
}

// Mis cinco frases del 2026-11-19, en el orden en que salieron. Son los casos de prueba:
// si el revisor no las rechaza, el revisor está mal.
export const CASOS = [
  { frase: 'Contrata sabiendo si sirve.', origen: 'mi promesa de entrada' },
  { frase: 'Le adelanto la noticia del día 30 al 16.', origen: 'mi defensa del calendario' },
  { frase: 'El periodo de prueba es una muestra de trabajo de 30 días que pagas tú. Esta dura 40 minutos.', origen: 'mi primera Pieza B' },
  { frase: 'Antes de hacer la oferta: 40 minutos del trabajo de tu finalista, a la vista.', origen: 'mi primera línea nueva para la portada' },
  { frase: 'No te digo a quién contratar. Te enseño lo que le escribió a tu cliente.', origen: 'mi línea frente al ranking' },
]
