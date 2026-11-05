// Pase mecánico semana 13. Uso: NODE_PATH=<scratchpad>/pw/node_modules node test/e2e.cjs <base>
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:3113';
let n = 0, fails = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('  ✗', m) } else console.log('  ✓', m) };
if (!process.argv.includes("--conv")) (async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  const posts = []; p.on('request', r => { if (r.url().includes('/api/eventos') && r.method() === 'POST') posts.push(r.postData() || '') });
  console.log('E2E vs', base);
  // 1. muestra → constancia con mensaje arriba + código
  await p.goto(base + '/muestra');
  for (const f of ['F-77812','R-2201','C-1180','T-9001']) await p.getByLabel(`Marcar ${f} como mal clasificado`).first().check();
  const MENSAJE = 'Hola Don Julio, revisé las facturas de agosto y encontré cuatro cosas que corregir. La gasolina se pagó en efectivo y así no se deduce; favor de pagar combustible con tarjeta. La comida del restaurante no es deducible al cien por ciento, solo al 8.5. La laptop es un activo fijo, no un gasto; hay que reclasificarla y depreciar. Le pido que me confirme para hacer los ajustes antes de la declaración.';
  await p.fill('#mensaje', MENSAJE); await p.click('text=Calificar mi revisión'); await p.waitForSelector('pre');
  const pre = await p.locator('pre').innerText();
  ok(pre.indexOf('LO QUE ESCRIBIÓ LA CANDIDATA') < pre.indexOf('LO QUE SE MIDIÓ'), 'constancia: mensaje de la candidata ANTES del conteo');
  const firmado = /código [A-Z2-9]{4}-[A-Z2-9]{4}/.test(pre);
  ok(firmado || /SIN CÓDIGO/.test(pre), 'constancia firmada, o dice explícitamente SIN CÓDIGO');
  const noScroll = await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1); ok(noScroll, 'sin scroll horizontal a 390 px');
  // 2. verificar: sí / no
  if (firmado) {
    const url = (pre.match(/https?:\S+verificar\?\S+/) || [''])[0].replace('https://w04-criba.vercel.app', base);
    await p.goto(url); ok(await p.locator('text=Sí: el código coincide').count() === 1, '/verificar dice Sí con el enlace íntegro');
    await p.goto(url.replace('a=3', 'a=4')); ok(await p.locator('text=No: el código no coincide').count() === 1, '/verificar dice No con un dato editado');
    await p.goto(url.replace(/c=[A-Z2-9]{4}/, 'c=ZZZZ')); ok(await p.locator('text=No: el código no coincide').count() === 1, '/verificar dice No con el código editado');
  }
  // 3. eventos: lista cerrada, sin texto
  const r400 = await p.request.post(base + '/api/eventos', { data: { evento: 'inventado', pantalla: 'muestra' } }); ok(r400.status() === 400, 'POST evento inventado → 400');
  const rExtra = await p.request.post(base + '/api/eventos', { data: { evento: 'muestra_vista', pantalla: 'muestra', ip: '1.2.3.4' } }); ok(rExtra.status() === 400, 'POST con campo extra → 400');
  const r201 = await p.request.post(base + '/api/eventos', { data: { evento: 'tablero_visto', pantalla: 'tablero' } }); ok(r201.status() === 201, 'POST evento válido → 201');
  ok(posts.length >= 2 && posts.every(d => !d.includes('Don Julio') && !/[A-Z2-9]{4}-[A-Z2-9]{4}/.test(d)), `ningún POST a /api/eventos lleva el mensaje ni el código (${posts.length} enviados)`);
  const g = await (await p.request.get(base + '/api/eventos')).json();
  ok(g.resumen && typeof g.resumen.total === 'number' && !JSON.stringify(g).includes('"ts"'), 'GET /api/eventos: conteos, sin timestamps por evento');
  // 4. metrica y volver cargan
  await p.goto(base + '/metrica'); ok(await p.locator('text=Lo que este log nunca hace').count() === 1, '/metrica carga con la regla visible');
  await p.goto(base + '/volver'); ok(await p.locator('text=Gracias por volver').count() === 1, '/volver carga');
  // 5. decision sigue funcionando
  await p.goto(base + '/decision'); ok(await p.locator('text=¿Preseleccionaría con esta muestra?').count() === 1, '/decision carga');
  await b.close(); console.log(`\n${n - fails}/${n} checks OK`); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1) });
// (apéndice) Fix #1: ventana del dueño. Se ejecuta si se pasa --conv
if (process.argv.includes('--conv')) (async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }); const p = await ctx.newPage();
  let n = 0, fails = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('  ✗', m) } else console.log('  ✓', m) };
  console.log('E2E convocar vs', base);
  const r = await p.request.post(base + '/api/convocar', { data: { despacho: 'Despacho E2E' } }); const j = await r.json();
  ok(r.status() === 201 && /\/muestra\?conv=[A-Z2-9]{10}$/.test(j.enlace), 'POST /api/convocar → enlace de un solo uso');
  const rb = await p.request.post(base + '/api/convocar', { data: { despacho: 'x@y.com' } }); ok(rb.status() === 400, 'despacho con correo → 400');
  const url = j.enlace.replace('https://w04-criba.vercel.app', base);
  await p.goto(url); ok(await p.locator('text=Muestra abierta por Despacho E2E').count() === 1, 'la candidata ve la ventana abierta (60 min)');
  const est = await (await p.request.get(base + '/api/convocar?id=' + j.id)).json(); ok(Boolean(est.abierta) && !est.entregada, 'primer acceso abre la ventana');
  for (const f of ['F-77812','R-2201','C-1180','T-9001']) await p.getByLabel(`Marcar ${f} como mal clasificado`).first().check();
  await p.fill('#mensaje', 'Hola Don Julio, revisé las facturas de agosto y encontré cuatro cosas que corregir. La gasolina se pagó en efectivo y así no se deduce; favor de pagar combustible con tarjeta. La comida del restaurante no es deducible al cien por ciento, solo al 8.5. La laptop es un activo fijo, no un gasto; hay que reclasificarla y depreciar. Le pido que me confirme para hacer los ajustes.');
  await p.click('text=Calificar mi revisión'); await p.waitForSelector('pre');
  const pre = await p.locator('pre').innerText();
  ok(/Abierta con el enlace de Despacho E2E/.test(pre) && /SE LE FUE: factura emitida a otro RFC/.test(pre), 'constancia registrada: despacho, sesión única, y cuál se le fue');
  ok(/Marcó de más \(estaba bien\): T-9001/.test(pre), 'constancia nombra el folio marcado de más');
  const cod = (pre.match(/código ([A-Z2-9]{4}-[A-Z2-9]{4})/) || [])[1];
  await p.goto(base + '/verificar?c=' + cod); ok(await p.locator('text=Registrado por Criba').count() === 1, '/verificar?c=CODIGO → "Registrado por Criba"');
  ok(await p.locator('text=factura emitida a otro RFC').count() >= 1, '/verificar muestra lo que se le fue');
  await p.goto(base + '/verificar?c=ZZZZ-ZZZZ'); ok(await p.locator('text=No existe registro con este código').count() === 1, 'código inexistente → "No existe registro"');
  await p.goto(url); ok(await p.locator('text=ya se usó').count() === 1, 'segundo uso del enlace → rechazado');
  await p.goto(base + '/decision'); const txt = await p.locator('body').innerText(); ok(!/gasolina pagada en efectivo/.test(txt) && !/otro RFC/.test(txt), '/decision ya no publica las cuatro respuestas');
  const ev = await (await p.request.get(base + '/api/eventos')).json(); ok(ev.eventos.includes('intento_registrado'), 'evento intento_registrado existe');
  await b.close(); console.log(`\n${n - fails}/${n} checks OK (convocar)`); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1) });
