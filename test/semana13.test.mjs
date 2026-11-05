import test from 'node:test'
import assert from 'node:assert/strict'
process.env.CONSTANCIA_SECRET = 'secreto-de-prueba'
const { firmar, cargaFirmable, verificar } = await import('../lib/firma.js')
const { validar, resumirEventos, EVENTOS } = await import('../lib/eventos.js')
const { calificarSeleccion } = await import('../lib/muestra.js')

const campos = { fecha: '2026-11-05', version: 'v0.1 (2026-09-06)', aciertos: '3', falsos: '1', cumplidos: '5', total: '6', asistencia: 'ninguna' }

test('firma determinista, 8 letras sin 0/O/1/I', () => {
  const a = firmar(cargaFirmable(campos)), b = firmar(cargaFirmable(campos))
  assert.equal(a, b); assert.match(a, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/)
})
test('cualquier campo editado cambia la firma y falla la verificación', () => {
  const codigo = firmar(cargaFirmable(campos))
  assert.ok(verificar(campos, codigo))
  assert.ok(verificar(campos, codigo.toLowerCase()))
  for (const k of Object.keys(campos)) {
    const editado = { ...campos, [k]: campos[k] + 'x' }
    assert.ok(!verificar(editado, codigo), `campo ${k}`)
  }
  assert.ok(!verificar(campos, codigo.slice(0, -1) + (codigo.endsWith('A') ? 'B' : 'A')))
  assert.ok(!verificar(campos, ''))
})
test('sin secreto no hay código y nada verifica', () => {
  const s = process.env.CONSTANCIA_SECRET; delete process.env.CONSTANCIA_SECRET
  assert.equal(firmar('x'), null); assert.equal(verificar(campos, 'AAAA-AAAA'), false)
  process.env.CONSTANCIA_SECRET = s
})
test('validar: lista cerrada, sin campos extra, sin hora', () => {
  const ok = validar({ evento: 'muestra_vista', pantalla: 'muestra' })
  assert.deepEqual(Object.keys(ok).sort(), ['dia', 'evento', 'pantalla'])
  assert.match(ok.dia, /^\d{4}-\d{2}-\d{2}$/)
  assert.equal(validar({ evento: 'inventado', pantalla: 'muestra' }), null)
  assert.equal(validar({ evento: 'muestra_vista', pantalla: 'muestra', ip: '1.2.3.4' }), null)
  assert.equal(validar({ evento: 'muestra_vista', pantalla: 'muestra', codigo: 'AAAA-AAAA' }), null)
  assert.equal(validar('muestra_vista'), null)
  assert.equal(validar({ evento: 'muestra_vista', pantalla: 'loquesea' }).pantalla, 'otra')
})
test('resumirEventos cuenta por día y arma embudos', () => {
  const hoy = new Date().toISOString().slice(0, 10)
  const items = [{ evento: 'muestra_vista', dia: hoy }, { evento: 'muestra_vista', dia: hoy }, { evento: 'muestra_calificada', dia: hoy }, { evento: 'constancia_verificada', dia: hoy }, { evento: 'muestra_vista', dia: '2020-01-01' }]
  const r = resumirEventos(items, 14)
  assert.equal(r.total, 4); assert.equal(r.conteo.muestra_vista, 2); assert.equal(r.verificaciones, 1)
  assert.equal(r.embudoCandidata[0].n, 2); assert.equal(r.embudoCandidata[1].n, 1)
  assert.equal(r.porDia[hoy].total, 4); assert.equal(r.porDia['2020-01-01'], undefined)
  assert.equal(EVENTOS.length, 9)
})
test('calificación sigue determinista (regresión w04)', () => {
  assert.equal(calificarSeleccion([2, 4, 6, 1]).aprobado, true)
  assert.equal(calificarSeleccion([2, 4, 1, 3]).aprobado, false)
})
