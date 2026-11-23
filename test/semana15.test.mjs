// Semana 15 — distribución. La prueba que corre antes de cada deploy: lo que sale de Criba pasa por aquí.
import test from 'node:test'
import assert from 'node:assert/strict'

const { revisarTexto, revisarPieza, cifrasDe, CASOS } = await import('../lib/revisar.js')
const P = await import('../lib/piezas.js')
const { DEMO_ENTREGA, DEMO_FOLIOS } = await import('../lib/demo.js')
const { CFDIS } = await import('../lib/muestra.js')
const { validar, parsearNombre, resumirEventos, EVENTOS, FUENTES_LOG } = await import('../lib/eventos.js')

test('el revisor rechaza las cinco frases que escribí el 2026-11-19', () => {
  for (const c of CASOS) assert.ok(revisarTexto(c.frase).length > 0, `debió rechazar: ${c.frase}`)
})

test('límite medido: la lista de verbos sola detiene 3 de 5; las otras dos no tienen verbo prohibido', () => {
  const detenidas = CASOS.filter(c => revisarTexto(c.frase, { soloVerbos: true }).length > 0)
  assert.equal(detenidas.length, 3)
  assert.deepEqual(CASOS.slice(3).map(c => revisarTexto(c.frase, { soloVerbos: true }).length), [0, 0])
})

test('el revisor entiende acentos: "tardó", "sabrá" y "tú" se detectan; "No sé" y "usted ve" pasan', () => {
  assert.ok(revisarTexto('Tardó 31 minutos').some(f => f.regla === 'tiempo como puntaje'))
  assert.ok(revisarTexto('Usted sabrá a quién contratar').some(f => f.regla === 'certeza'))
  assert.ok(revisarTexto('Esto es para tú decidir').some(f => f.regla.startsWith('tuteo')))
  assert.deepEqual(revisarTexto('Usted ve qué facturas marcó y cuáles se le fueron.'), [])
})

test('la promesa, la primera línea, la posición y todos los mensajes pasan el revisor', () => {
  const textos = { PROMESA: P.PROMESA, PRIMERA_LINEA: P.PRIMERA_LINEA, POSICION: P.POSICION, invitacion: P.invitacion('https://ejemplo/x'), ...P.MENSAJES }
  for (const [k, t] of Object.entries(textos)) assert.deepEqual(revisarTexto(t), [], `${k}: ${JSON.stringify(revisarTexto(t))}`)
})

test('la línea débil del playbook es de verdad débil, y su reescritura pasa', () => {
  assert.ok(revisarTexto(P.LINEA_DEBIL.antes).length >= 2)
  assert.deepEqual(revisarTexto(P.LINEA_DEBIL.despues), [])
})

test('las tres piezas terminadas pasan: verbos, patrones, cifras con fuente, afirmaciones con cita', () => {
  for (const pieza of Object.values(P.PIEZAS)) {
    assert.ok(Object.keys(pieza.textos).length > 0, `pieza ${pieza.id} sin textos`)
    assert.deepEqual(revisarPieza(pieza, P.FUENTES), [], `pieza ${pieza.id}`)
    assert.ok(pieza.afirmaciones.length >= 2, `pieza ${pieza.id}: al menos dos afirmaciones con fuente`)
  }
})

test('el revisor sí truena con una pieza mala: cifra sin fuente, afirmación sin cita, verbo vetado', () => {
  const mala = { id: 'x', textos: { linea: 'El 70% de las candidatas falla. Usted evita una mala contratación.' }, cifras: {}, afirmaciones: [{ texto: 'x', fuente: 'no_existe' }] }
  const reglas = revisarPieza(mala, P.FUENTES).map(f => f.regla)
  assert.ok(reglas.includes('cifra sin fuente') && reglas.includes('afirmación sin fuente') && reglas.includes('promesa de resultado'))
  assert.deepEqual(cifrasDe('3 de 4 y 2.4 a 1, $640'), ['3', '4', '2.4', '1', '640'])
})

test('la aprobación humana no puede pasar por encima de la prueba, y lleva nombre y día', () => {
  for (const pieza of Object.values(P.PIEZAS)) {
    if (pieza.aprobada === null) continue
    assert.match(pieza.aprobada.dia, /^\d{4}-\d{2}-\d{2}$/); assert.ok(pieza.aprobada.por.length > 2)
    assert.deepEqual(revisarPieza(pieza, P.FUENTES), [], `pieza ${pieza.id} aprobada con faltas`)
  }
})

test('seis conceptos en tres series, dos por serie; tres terminadas, una por serie, en al menos dos formatos', () => {
  assert.equal(P.SERIES.length, 3)
  for (const s of P.SERIES) { assert.equal(s.conceptos.length, 2); assert.equal(s.conceptos.filter(c => c.estado === 'terminada').length, 1) }
  const formatos = new Set(Object.values(P.PIEZAS).map(p => p.formato.split(' ')[0]))
  assert.ok(formatos.size >= 2, [...formatos].join(','))
  for (const s of P.SERIES) for (const c of s.conceptos) if (c.estado === 'boceto') assert.ok(c.proposito && c.proposito.length > 10)
})

test('el juego de demostración no toca el juego de 20, y la entrega es de una sola persona', () => {
  const folios20 = new Set(CFDIS.map(c => c.folio))
  for (const f of DEMO_FOLIOS) assert.ok(!folios20.has(f), f)
  for (const c of CFDIS) assert.ok(!JSON.stringify(DEMO_ENTREGA).includes(c.folio), c.folio)
  assert.ok(!Array.isArray(DEMO_ENTREGA) && typeof DEMO_ENTREGA.mensaje === 'string')
  assert.ok(!/min\b|minutos tard|tardó/i.test(JSON.stringify(DEMO_ENTREGA)), 'la entrega de demostración no trae minutos')
})

test('eventos: la fuente es de lista cerrada; cualquier otra cosa → rechazo', () => {
  assert.equal(validar({ evento: 'llegada', pantalla: 'lectura', fuente: 'colega' }).fuente, 'colega')
  assert.equal(validar({ evento: 'llegada', pantalla: 'lectura', fuente: 'Juan Pérez 5512345678' }), null)
  assert.equal(validar({ evento: 'llegada', pantalla: 'lectura', fuente: 'colega', quien: 'x' }), null)
  assert.equal(validar({ evento: 'lectura_terminada', pantalla: 'lectura', pregunta: '¿por qué marcó los garrafones?' }), null)
  assert.deepEqual(Object.keys(validar({ evento: 'lectura_terminada', pantalla: 'lectura' })).sort(), ['dia', 'evento', 'pantalla'])
  for (const e of ['llegada', 'despachos_visto', 'lectura_vista', 'lectura_terminada', 'compartir_guardar', 'compartir_colega', 'playbook_visto', 'proceso_visto']) assert.ok(EVENTOS.includes(e))
})

test('eventos: el nombre del archivo guarda día, evento y fuente, y los archivos viejos se siguen leyendo', () => {
  assert.deepEqual(parsearNombre('2026-11-19-lectura_terminada__tibio_a-AbC123.json'), { evento: 'lectura_terminada', dia: '2026-11-19', fuente: 'tibio_a' })
  assert.deepEqual(parsearNombre('2026-11-10-pricing_visto-Zx9.json'), { evento: 'pricing_visto', dia: '2026-11-10' })
  assert.deepEqual(parsearNombre('2026-11-19-llegada__inventada-AbC.json'), { evento: 'llegada', dia: '2026-11-19' })
  assert.equal(parsearNombre('2026-11-19-evento_inventado-AbC.json'), null)
  const hoy = new Date().toISOString().slice(0, 10)
  const r = resumirEventos([{ evento: 'llegada', dia: hoy, fuente: 'colega' }, { evento: 'llegada', dia: hoy, fuente: 'tibio_a' }, { evento: 'lectura_terminada', dia: hoy, fuente: 'tibio_a' }, { evento: 'llegada', dia: hoy }], 30)
  assert.equal(r.porFuente.colega.llegada, 1); assert.equal(r.porFuente.tibio_a.lectura_terminada, 1); assert.equal(r.conteo.llegada, 3)
  assert.deepEqual(Object.keys(r.porFuente), FUENTES_LOG)
})

test('la regla de envío y el pre-registro existen antes de cualquier resultado', () => {
  assert.equal(P.REGLA_ENVIO.quien.length, 3); assert.ok(P.REGLA_ENVIO.nunca.length >= 6)
  assert.match(P.PRUEBA.escrita, /^2026-11-\d{2}$/); assert.ok(P.PRUEBA.esperado.length >= 4 && P.PRUEBA.umbrales.length >= 2 && P.PRUEBA.reglaPublico.includes('15 de diciembre'))
  if (P.PRUEBA.envio) { assert.ok(P.PRUEBA.envio.dia >= P.PRUEBA.escrita, 'el envío no puede ser anterior al pre-registro'); for (const r of P.PRUEBA.envio.respuestas) assert.ok(!/@|\d{8,}/.test(JSON.stringify(r)), 'sin correos ni teléfonos') }
})

test('bug del pase mecánico: el revisor lee texto anidado (opciones como objetos)', () => {
  const pieza = { id: 'x', textos: { opciones: [{ se_ve: 'Se le fue 1', pregunta: 'Así usted sabrá si sirve' }] }, cifras: { '1': 'demo' }, afirmaciones: [{ texto: 'x', fuente: 'demo' }] }
  const reglas = revisarPieza(pieza, P.FUENTES).map(f => f.regla)
  assert.ok(reglas.includes('certeza') && reglas.includes('predicción de desempeño'), JSON.stringify(reglas))
})

test('"Qué mirar" (agregado tras la prueba real) pasa el revisor', () => {
  assert.equal(P.QUE_MIRAR.length, 3)
  for (const m of P.QUE_MIRAR) assert.deepEqual(revisarTexto(`${m.que} ${m.para}`), [], m.que)
})

test('resultados reales: roles, nunca nombres; sin correos ni teléfonos', () => {
  const e = P.PRUEBA.envio
  assert.ok(e && e.respuestas.length === 4 && e.tibios === e.piezaA + e.piezaB)
  const txt = JSON.stringify(e)
  for (const n of ['Ricardo', 'Mariana', 'Alejandro', 'Fernando', 'Gabriela', 'Daniela', 'Namnum', 'Samantha', 'Ginna', 'Mauricio']) assert.ok(!txt.includes(n), n)
})
