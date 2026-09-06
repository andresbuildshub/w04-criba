// Muestra de trabajo v0.1 — "Criba" (w04-criba). TODOS LOS DATOS SON INVENTADOS.
// Cliente ficticio: "Ferretería El Tornillo, S.A. de C.V." (RFC inventado FET010203AB1).
// Un "agente" (simulado) clasificó 20 CFDIs del mes. Exactamente 4 clasificaciones están mal.
// La candidata debe encontrarlas y redactar el mensaje al cliente. Puntuación DETERMINISTA (ver /rubrica).

export const RUBRICA_VERSION = 'v0.1 (2026-09-06)'
export const CLIENTE = { nombre: 'Ferretería El Tornillo, S.A. de C.V.', rfc: 'FET010203AB1', periodo: 'agosto 2026' }

// Cada renglón: lo que ve la candidata. `error` es la verdad de terreno (NUNCA se envía al cliente).
export const CFDIS = [
  { id: 1,  folio: 'A-1041', fecha: '2026-08-01', emisor: 'Aceros del Norte SA de CV', rfc_emisor: 'ANO990101XX1', rfc_receptor: 'FET010203AB1', concepto: 'Varilla corrugada 3/8", 200 pzas', monto: 48200.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Compra de mercancía', nota: 'Inventario para reventa.' } },
  { id: 2,  folio: 'F-77812', fecha: '2026-08-02', emisor: 'Gasolinera La Curva SA de CV', rfc_emisor: 'GLC050505YY2', rfc_receptor: 'FET010203AB1', concepto: 'Gasolina magna 120 L (camioneta de reparto)', monto: 2890.00, metodo: 'PUE', forma: '01 Efectivo', agente: { deducible: 'Sí', categoria: 'Combustible', nota: 'Vehículo de la empresa.' },
    error: { tipo: 'PAGO_EFECTIVO', explicacion: 'Combustible pagado en EFECTIVO. El combustible solo es deducible pagado con medio bancario (tarjeta, transferencia, monedero), sin importar el monto; además rebasa $2,000. No deducible tal como está.', accion: 'Pedir al cliente que pague combustible siempre con tarjeta o monedero; esta factura no se deduce.' } },
  { id: 3,  folio: 'B-3390', fecha: '2026-08-03', emisor: 'Papelería Central SA de CV', rfc_emisor: 'PCE080808ZZ3', rfc_receptor: 'FET010203AB1', concepto: 'Papelería y consumibles de oficina', monto: 1340.50, metodo: 'PUE', forma: '04 Tarjeta de crédito', agente: { deducible: 'Sí', categoria: 'Gastos de administración', nota: '' } },
  { id: 4,  folio: 'R-2201', fecha: '2026-08-04', emisor: 'Restaurante Los Arcos SA de CV', rfc_emisor: 'RLA111111AA4', rfc_receptor: 'FET010203AB1', concepto: 'Consumo de alimentos — comida con proveedor', monto: 3150.00, metodo: 'PUE', forma: '04 Tarjeta de crédito', agente: { deducible: 'Sí', categoria: 'Gastos de operación (100%)', nota: 'Comida de negocios.' },
    error: { tipo: 'RESTAURANTE_8_5', explicacion: 'Consumo en restaurante clasificado 100% deducible. Los consumos en restaurantes solo son deducibles al 8.5% (y pagados con tarjeta). El 91.5% es no deducible.', accion: 'Reclasificar: 8.5% deducible, resto no deducible.' } },
  { id: 5,  folio: 'T-9001', fecha: '2026-08-05', emisor: 'Telcel (Radiomóvil Dipsa)', rfc_emisor: 'RDI841003QJ4', rfc_receptor: 'FET010203AB1', concepto: 'Plan telefonía empresarial 5 líneas', monto: 2199.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Servicios', nota: '' } },
  { id: 6,  folio: 'C-1180', fecha: '2026-08-06', emisor: 'Computadoras MX SA de CV', rfc_emisor: 'CMX121212BB5', rfc_receptor: 'FET010203AB1', concepto: 'Laptop Dell Latitude 15" i7 (equipo de cómputo)', monto: 28400.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Gastos de administración', nota: 'Equipo para el área de ventas.' },
    error: { tipo: 'ACTIVO_FIJO', explicacion: 'Laptop de $28,400 registrada como GASTO del periodo. Es una INVERSIÓN (activo fijo): se deduce vía depreciación (equipo de cómputo, 30% anual), no de golpe en el mes.', accion: 'Reclasificar a activo fijo y correr la depreciación.' } },
  { id: 7,  folio: 'N-0801', fecha: '2026-08-07', emisor: 'Ferretería El Tornillo SA de CV (nómina)', rfc_emisor: 'FET010203AB1', rfc_receptor: 'FET010203AB1', concepto: 'CFDI de nómina quincenal, 6 empleados', monto: 61200.00, metodo: 'PUE', forma: '99 Por definir', agente: { deducible: 'Sí', categoria: 'Nómina', nota: 'Timbrada en tiempo.' } },
  { id: 8,  folio: 'S-4402', fecha: '2026-08-08', emisor: 'Seguros Monterrey New York Life', rfc_emisor: 'SMN960101CC6', rfc_receptor: 'FET010203AB1', concepto: 'Prima seguro de mercancía en bodega (anual)', monto: 14800.00, metodo: 'PPD', forma: '99 Por definir', agente: { deducible: 'Sí', categoria: 'Seguros y fianzas', nota: 'Pago en parcialidades; complemento de pago recibido el 20/08.' } },
  { id: 9,  folio: 'L-1500', fecha: '2026-08-09', emisor: 'Inmobiliaria Roble SA de CV', rfc_emisor: 'IRO000101DD7', rfc_receptor: 'FET010203AB1', concepto: 'Renta local comercial agosto', monto: 22000.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Arrendamiento', nota: '' } },
  { id: 10, folio: 'U-0030', fecha: '2026-08-10', emisor: 'Uniformes Industriales del Bajío', rfc_emisor: 'UIB030303EE8', rfc_receptor: 'FET010203AB1', concepto: 'Uniformes y botas de seguridad, 6 empleados', monto: 7320.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Previsión social / seguridad', nota: 'Uniformes obligatorios.' } },
  { id: 11, folio: 'E-6621', fecha: '2026-08-11', emisor: 'CFE Suministrador de Servicios Básicos', rfc_emisor: 'CSS160330CP7', rfc_receptor: 'FET010203AB1', concepto: 'Energía eléctrica local comercial', monto: 4870.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Servicios', nota: '' } },
  { id: 12, folio: 'M-2210', fecha: '2026-08-12', emisor: 'Mantenimiento Integral Pérez', rfc_emisor: 'MAPE850505FF9', rfc_receptor: 'FET010203AB1', concepto: 'Reparación de cortina metálica del local', monto: 5600.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Mantenimiento', nota: 'Persona física con actividad empresarial.' } },
  { id: 13, folio: 'H-0912', fecha: '2026-08-13', emisor: 'Herramientas Truper SA de CV', rfc_emisor: 'HTR920202GG1', rfc_receptor: 'FET010203AB1', concepto: 'Herramienta manual surtida para reventa', monto: 19750.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Compra de mercancía', nota: '' } },
  { id: 14, folio: 'P-5050', fecha: '2026-08-14', emisor: 'Publicidad Digital Norte SA de CV', rfc_emisor: 'PDN170707HH2', rfc_receptor: 'DGO050505KK5', concepto: 'Campaña en redes sociales agosto', monto: 9000.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Publicidad', nota: 'Campaña de la ferretería.' },
    error: { tipo: 'RFC_RECEPTOR', explicacion: 'La factura está emitida a OTRO RFC (DGO050505KK5), no al del cliente (FET010203AB1). No es un comprobante del contribuyente: no se puede deducir aunque el gasto haya sido suyo.', accion: 'Pedir cancelación y refacturación a nombre del cliente.' } },
  { id: 15, folio: 'W-1201', fecha: '2026-08-15', emisor: 'Agua Purificada del Centro', rfc_emisor: 'APC090909JJ3', rfc_receptor: 'FET010203AB1', concepto: 'Garrafones de agua para el local (mes)', monto: 640.00, metodo: 'PUE', forma: '01 Efectivo', agente: { deducible: 'Sí', categoria: 'Gastos generales', nota: 'Menor a $2,000, efectivo permitido.' } },
  { id: 16, folio: 'K-3311', fecha: '2026-08-18', emisor: 'Multas y Recargos SAT (línea de captura)', rfc_emisor: 'SAT970701NN3', rfc_receptor: 'FET010203AB1', concepto: 'Recargos por pago extemporáneo IVA julio', monto: 1120.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'No', categoria: 'No deducible', nota: 'Recargos y multas no son deducibles.' } },
  { id: 17, folio: 'D-7702', fecha: '2026-08-20', emisor: 'Transportes Rápidos del Golfo', rfc_emisor: 'TRG101010LL4', rfc_receptor: 'FET010203AB1', concepto: 'Fletes de mercancía desde proveedor', monto: 6300.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Fletes y acarreos', nota: '' } },
  { id: 18, folio: 'G-0017', fecha: '2026-08-22', emisor: 'Regalos Corporativos Aurora', rfc_emisor: 'RCA141414MM6', rfc_receptor: 'FET010203AB1', concepto: 'Obsequios de fin de mes a clientes frecuentes', monto: 2400.00, metodo: 'PUE', forma: '04 Tarjeta de crédito', agente: { deducible: 'No', categoria: 'No deducible (obsequios)', nota: 'Obsequios no relacionados directamente con la venta: no deducibles.' } },
  { id: 19, folio: 'Q-8801', fecha: '2026-08-25', emisor: 'Despacho Contable Ríos y Asociados', rfc_emisor: 'DCR121212PP7', rfc_receptor: 'FET010203AB1', concepto: 'Honorarios contables agosto', monto: 4500.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Honorarios', nota: '' } },
  { id: 20, folio: 'V-0402', fecha: '2026-08-28', emisor: 'Arrendadora de Vehículos del Norte', rfc_emisor: 'AVN161616QQ8', rfc_receptor: 'FET010203AB1', concepto: 'Renta camioneta de reparto agosto', monto: 9800.00, metodo: 'PUE', forma: '03 Transferencia', agente: { deducible: 'Sí', categoria: 'Arrendamiento de equipo de transporte', nota: 'Dentro del tope diario deducible.' } },
]

export const ERRORES_IDS = CFDIS.filter(c => c.error).map(c => c.id)   // [2, 4, 6, 14]

// Puntuación determinista (rubrica v0.1): aciertos = marcados que sí estaban mal; falsos = marcados que estaban bien.
// APROBADO si aciertos >= 3 y falsos <= 1. No hay puntaje de "aptitud": solo conteos sobre ESTA muestra.
export function calificarSeleccion(seleccion) {
  const sel = new Set((seleccion || []).map(Number))
  const aciertos = ERRORES_IDS.filter(id => sel.has(id))
  const omitidos = ERRORES_IDS.filter(id => !sel.has(id))
  const falsos = [...sel].filter(id => !ERRORES_IDS.includes(id))
  return { aciertos, omitidos, falsos, aprobado: aciertos.length >= 3 && falsos.length <= 1, version: RUBRICA_VERSION }
}

// Revisión del mensaje al cliente. ⚠️ SIMULADA: reglas deterministas de texto, NO un juicio de IA real.
// Devuelve una lista de verificación (sí/no), nunca un puntaje de la persona.
const PISTAS = {
  2:  [/efectivo/i, /gasolin|combustible/i],
  4:  [/restaurant|comida|consumo/i, /8\.?5|ocho punto cinco|8,5/i],
  6:  [/laptop|c[oó]mputo|computadora/i, /activo fijo|inversi[oó]n|deprecia/i],
  14: [/rfc/i, /a nombre|receptor|refactur|cancel/i],
}
export function revisarMensaje(texto, aciertos) {
  const t = (texto || '').trim()
  const palabras = t ? t.split(/\s+/).length : 0
  const checks = []
  checks.push({ k: 'longitud', ok: palabras >= 40 && palabras <= 220, texto: `Entre 40 y 220 palabras (tiene ${palabras}).` })
  for (const id of aciertos) {
    const c = CFDIS.find(x => x.id === id)
    const ok = PISTAS[id].every(re => re.test(t))
    checks.push({ k: `error_${id}`, ok, texto: `Explica el error del folio ${c.folio} con el término correcto.` })
  }
  checks.push({ k: 'accion', ok: /favor de|necesit|puede|podr[ií]a|te pido|le pido|env[ií]e|refactur|pagar con|reclasific/i.test(t), texto: 'Pide una acción concreta al cliente.' })
  checks.push({ k: 'tono', ok: !/idiota|tonto|culpa|est[uú]pid|incompeten/i.test(t), texto: 'Tono profesional (sin culpar al cliente).' })
  return { checks, cumplidos: checks.filter(c => c.ok).length, total: checks.length, simulado: true }
}
