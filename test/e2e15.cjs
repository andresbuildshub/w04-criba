// Pase mecánico semana 15 (distribución). Uso: NODE_PATH=<scratchpad>/pw/node_modules node test/e2e15.cjs <base>
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:3115';
let n = 0, fails = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('  ✗', m) } else console.log('  ✓', m) };
const sinScroll = p => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, permissions: ['clipboard-read', 'clipboard-write'] });
  await ctx.addInitScript(() => { try { Object.defineProperty(navigator, 'sendBeacon', { value: undefined }) } catch {} }) // el cuerpo de un beacon no se ve en Playwright: forzamos fetch
  const p = await ctx.newPage();
  const posts = []; p.on('request', r => { if (r.url().includes('/api/eventos') && r.method() === 'POST') posts.push(r.postData() || '') });
  console.log('E2E semana 15 vs', base);

  // 1. Portada: primero el socio
  await p.goto(base + '/'); await p.waitForLoadState('networkidle');
  const h1 = await p.locator('h1').first().innerText();
  ok(/Antes de hacer la oferta/.test(h1), `portada: la primera línea es para el socio («${h1.slice(0, 40)}…»)`);
  const txtHome = await p.locator('main').innerText();
  ok(txtHome.indexOf('Soy socio') < txtHome.indexOf('Soy candidata'), 'portada: el socio antes que la candidata');
  ok(await sinScroll(p), 'portada: sin scroll horizontal');

  // 2. /despachos con fuente: llegada contada por canal, una sola finalista
  posts.length = 0;
  await p.goto(base + '/despachos?f=prueba'); await p.waitForLoadState('networkidle'); await p.waitForTimeout(400);
  ok(await p.locator('section[aria-label="Entrega de una finalista inventada"]').count() === 1, '/despachos: una sola entrega en pantalla');
  ok(await p.getByText('INVENTADO', { exact: false }).count() >= 1, '/despachos: etiqueta INVENTADO visible');
  const tD = await p.locator('main').innerText();
  ok(!/\d+\s*min\b/.test(tD.replace(/60 minutos/g, '')), '/despachos: no muestra minutos de nadie');
  ok(posts.some(d => d.includes('"llegada"') && d.includes('"prueba"')) && posts.some(d => d.includes('despachos_visto')), `/despachos?f=prueba: cuenta llegada con fuente (${posts.length} POST)`);
  ok(await sinScroll(p), '/despachos: sin scroll horizontal');

  // 3. ?f= inválido: no viaja
  posts.length = 0;
  await p.goto(base + '/despachos?f=Juan%205512345678'); await p.waitForLoadState('networkidle'); await p.waitForTimeout(400);
  ok(posts.length >= 1 && posts.every(d => !d.includes('Juan') && !d.includes('fuente')), '?f= fuera de la lista cerrada: el evento sale sin fuente');

  // 4. Botón colega: cuenta que abrió compartir, el texto prellenado lleva fuente colega, nada de nombres
  posts.length = 0;
  await p.goto(base + '/despachos?f=prueba'); await p.waitForLoadState('networkidle');
  await p.evaluate(() => { delete navigator.share })
  await p.getByRole('button', { name: /colega/ }).click(); await p.waitForTimeout(300);
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok(/\/despachos\?f=colega/.test(clip), 'colega: el texto que se manda trae ?f=colega');
  ok(posts.some(d => d.includes('compartir_colega')), 'colega: cuenta compartir_colega');

  // 5. /lectura (si la pieza A ya existe): terminar sin que viaje lo escrito
  await p.goto(base + '/lectura?f=prueba'); await p.waitForLoadState('networkidle');
  if (await p.locator('legend').count()) {
    posts.length = 0;
    await p.getByLabel('Otra pregunta').check().catch(async () => { await p.locator('input[type=radio]').last().check() });
    await p.getByLabel('Su pregunta').fill('¿Por qué marcó los garrafones? SECRETO-E2E');
    await p.getByRole('button', { name: 'Terminar' }).click(); await p.waitForTimeout(400);
    ok(await p.getByText('SECRETO-E2E').count() >= 1, '/lectura: le devuelve su pregunta en pantalla');
    ok(posts.some(d => d.includes('lectura_terminada')) && posts.every(d => !d.includes('SECRETO')), '/lectura: cuenta lectura_terminada; lo escrito no viaja');
    ok(await sinScroll(p), '/lectura: sin scroll horizontal');
  } else console.log('  · /lectura todavía sin pieza A (se salta)');

  // 6. /convocar: ya no vende comparar; invitación con salida y ayuda
  await p.goto(base + '/convocar'); await p.waitForLoadState('networkidle');
  const tC = await p.locator('main').innerText();
  ok(!/sirve para comparar|la compara con nadie/i.test(tC), '/convocar: el aviso ya no vende comparar');
  ok(/a ella misma/.test(tC), '/convocar: reabrir a la misma finalista no se cobra');
  const r = await p.request.post(base + '/api/convocar', { data: { despacho: 'Despacho E2E15' } }); const j = await r.json();
  await p.getByRole('button', { name: 'Probar a todas mis finalistas' }).click();
  await p.fill('#despacho', 'Despacho E2E15'); await p.click('text=Crear el enlace de un solo uso'); await p.waitForSelector('pre');
  const inv = await p.locator('pre').innerText();
  ok(/le abro otro/.test(inv) && /no me la muestra/.test(inv) && /IA/.test(inv) && /un solo aparato|uno solo/.test(inv), 'invitación: salida, ayuda permitida y "no veo cuántos minutos"');

  // 6b. Fix persona r1 (finalista): si se cae la conexión y vuelve a abrir el mismo enlace, no pierde lo marcado ni lo escrito
  const r2 = await p.request.post(base + '/api/convocar', { data: { despacho: 'Despacho Recarga' } }); const j2 = await r2.json();
  const url2 = j2.enlace.replace('https://w04-criba.vercel.app', base);
  await p.goto(url2); await p.waitForLoadState('networkidle');
  await p.getByLabel('Marcar F-77812 como mal clasificado').first().check(); await p.fill('#mensaje', 'BORRADOR-E2E a medias'); await p.waitForTimeout(300);
  await p.goto(url2); await p.waitForLoadState('networkidle'); await p.waitForTimeout(300);
  ok(await p.getByLabel('Marcar F-77812 como mal clasificado').first().isChecked() && (await p.inputValue('#mensaje')) === 'BORRADOR-E2E a medias', 'recargar el enlace dentro de los 60 min: conserva lo marcado y lo escrito (en su teléfono)');

  // 6c. Fix persona r2 (finalista): la ayuda no viene preseleccionada; sin elegir, no se puede entregar
  await p.goto(url2); await p.waitForLoadState('networkidle');
  ok(await p.getByRole('button', { name: 'Calificar mi revisión' }).isDisabled() && (await p.inputValue('#asistencia')) === '', 'ayuda declarada: sin respuesta por defecto, hay que elegir antes de entregar');

  // 7. /verificar con una entrega real del flujo: sin minutos, nombra el folio de más
  const url = j.enlace.replace('https://w04-criba.vercel.app', base);
  await p.goto(url); await p.waitForLoadState('networkidle');
  for (const f of ['F-77812', 'R-2201', 'C-1180', 'T-9001']) await p.getByLabel(`Marcar ${f} como mal clasificado`).first().check();
  await p.fill('#mensaje', 'Hola Don Julio, revisé las facturas de agosto. La gasolina se pagó en efectivo y así no se deduce; favor de pagar con tarjeta. La comida del restaurante solo es deducible al 8.5. La laptop es activo fijo y hay que depreciarla. Le pido que me confirme para hacer los ajustes.');
  await p.selectOption('#asistencia', 'consulte_fuentes'); await p.click('text=Calificar mi revisión'); await p.waitForSelector('pre');
  const pre = await p.locator('pre').innerText();
  ok(!/\(\d+ min\)/.test(pre) && !/inició/.test(pre), 'constancia: sin hora de inicio ni minutos');
  const cod = (pre.match(/código ([A-Z2-9]{4}-[A-Z2-9]{4})/) || [])[1];
  await p.goto(base + '/verificar?c=' + cod); await p.waitForLoadState('networkidle');
  const tV = await p.locator('main').innerText();
  ok(/Registrado por Criba/.test(tV) && !/\(\d+ min\)/.test(tV) && !/inició/.test(tV), '/verificar: sin minutos ni hora de inicio');
  ok(/T-9001, Plan telefonía/.test(tV), '/verificar: nombra el folio marcado de más (igual que la constancia)');
  ok(/una sola persona/.test(tV), '/verificar: dice que es una persona por pantalla');

  // 8. /playbook y /proceso cargan con lo que el curso pide
  await p.goto(base + '/playbook'); await p.waitForLoadState('networkidle');
  const tP = await p.locator('main').innerText();
  ok(['Tres reglas de voz', 'Una línea débil', 'Sistema visual', 'Seis conceptos', 'La prueba de distribución', 'Resultados'].every(s => tP.includes(s)), '/playbook: estrategia, voz, línea débil, visual, conceptos, prueba, resultados');
  ok(/PENDIENTE|Enviado el/.test(tP), '/playbook: resultados PENDIENTE o reales, nunca vacío');
  ok(await sinScroll(p), '/playbook: sin scroll horizontal');
  await p.goto(base + '/proceso'); await p.waitForLoadState('networkidle');
  const tR = await p.locator('main').innerText();
  ok(/rechaza 5 de 5/.test(tR) && /detuvo 3 de 5/.test(tR), '/proceso: los números del revisor');
  ok(/Investigación/.test(tR) && /Revisión final/.test(tR), '/proceso: los seis roles');
  ok(await sinScroll(p), '/proceso: sin scroll horizontal');

  // 9. Eventos: fuente fuera de lista → 400
  const bad = await p.request.post(base + '/api/eventos', { data: { evento: 'llegada', pantalla: 'despachos', fuente: 'juan' } });
  ok(bad.status() === 400, 'POST con fuente inventada → 400');

  await b.close();
  console.log(`\n${n - fails}/${n} OK`); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1) });
