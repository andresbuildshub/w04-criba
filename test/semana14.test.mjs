import test from 'node:test'
import assert from 'node:assert/strict'
const P = await import('../lib/precios.js')

test('memo: caso base = 2.4:1 y umbral de 10:1 ≈ MX$58,800', () => {
  assert.equal(Math.round(P.costoMala()), 14119)
  assert.equal(Math.round(P.valorVacante()), 1177)
  assert.equal(P.ratio().toFixed(1), '2.4')
  assert.equal(Math.round(P.umbralCosto(10)), 58800)
})

test('sensibilidad: 40% y 70% ≈ 5:1, ninguna celda llega a 10', () => {
  const s = P.sensibilidad()
  const alta = s.find(x => x.pMala === 0.4 && x.deteccion === 0.7)
  assert.equal(Math.round(alta.ratio), 5)
  assert.ok(s.every(x => x.ratio < 10))
})

test('simulador: base calculado a mano', () => {
  const r = P.simular(P.BASE)
  assert.equal(Math.round(r.ingreso1), 37317)   // 16924·5%·10%·1.5·60%·490
  assert.equal(Math.round(r.ingreso2), 9800)    // 800·5%·5%·4900
  assert.equal(Math.round(r.ingresoAnual), 47117)
  assert.equal(r.fijosAnual, 5100)
  assert.equal(Math.round(r.netoAnual), 42017)
  assert.ok(Math.abs(r.ingresoMensual * 12 - r.ingresoAnual) < 1e-6)
})

test('el precio del memo, del tier y del simulador es el mismo', () => {
  const tier = P.TIERS.find(t => t.id === 'vacante').precio
  assert.equal(tier, P.MEMO.precio.v)
  assert.equal(tier, P.CAMPOS.precioVacante.base)
  assert.equal(P.TIERS.find(t => t.id === 'anual').precio, P.CAMPOS.precioAnual.base)
})

test('escenario: codificar → decodificar es idéntico', () => {
  const v = { ...P.BASE, precioVacante: 890, conversion: 0.2 }
  assert.deepEqual(P.decodificar(P.codificar(v)), v)
  assert.deepEqual(P.decodificar(P.codificar(P.BASE)), P.BASE)
})

test('escenario: entradas malas se rechazan o se topan', () => {
  assert.equal(P.limpiarValores({ precioVacante: 490, hack: 1 }), null)       // llave extra
  assert.equal(P.limpiarValores({ precioVacante: '490' }), null)              // texto
  assert.equal(P.limpiarValores({ precioVacante: Infinity }), null)
  assert.equal(P.limpiarValores([1, 2]), null)
  assert.equal(P.limpiarValores({ conversion: 1.5 }).conversion, 1)           // >100% → tope
  assert.equal(P.limpiarValores({ precioVacante: -5 }).precioVacante, 0)
  assert.equal(P.decodificar('no válido!!'), null)
  assert.equal(P.decodificar('x'.repeat(601)), null)
  assert.equal(P.limpiarNombre('<script>alert(1)</script>'.repeat(3)).includes('<'), false)
  assert.ok(P.limpiarNombre('a'.repeat(99)).length <= 40)
})
