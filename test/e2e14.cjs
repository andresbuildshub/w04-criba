// Pase mecánico semana 14 (precio). Uso: NODE_PATH=<scratchpad>/pw/node_modules node test/e2e14.cjs <base> [carpeta-capturas]
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:3114';
const shots = process.argv[3];
let n = 0, fails = 0; const ok = (c, m) => { n++; if (!c) { fails++; console.log('  ✗', m) } else console.log('  ✓', m) };
const sinScroll = p => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
const num = s => Number(String(s).replace(/[^0-9-]/g, ''));
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage();
  const posts = []; p.on('request', r => { if (r.url().includes('/api/eventos') && r.method() === 'POST') posts.push(r.postData() || '') });
  console.log('E2E semana 14 vs', base);
  const snap = async nombre => { if (shots) await p.screenshot({ path: `${shots}/${nombre}.png`, fullPage: true }) };

  // 1. /pricing
  await p.goto(base + '/pricing'); await p.waitForLoadState('networkidle');
  ok(await p.locator('article').count() === 3, '/pricing: 3 tiers');
  ok(await p.getByText('La candidata nunca paga').count() >= 1, '/pricing: "La candidata nunca paga"');
  ok(await p.getByText('Dos segmentos').count() === 1, '/pricing: dos segmentos');
  ok(!(await p.locator('main').innerText()).includes('2.4'), '/pricing: no discute contra su propio precio (fix persona: sin "2.4 a 1" en la página del cliente)');
  ok(await sinScroll(p), '/pricing: sin scroll horizontal a 390 px'); await snap('01-pricing');

  // 2. /simulador: base = memo, mover precio cambia el ingreso
  await p.goto(base + '/simulador'); await p.waitForLoadState('networkidle');
  const anualBase = num(await p.getByTestId('anual').innerText());
  ok(anualBase === 47117, `/simulador: ingreso anual base = 47,117 (vio ${anualBase})`);
  await p.fill('#precioVacante', '890');
  const anual890 = num(await p.getByTestId('anual').innerText());
  ok(anual890 > anualBase, `/simulador: subir el precio a 890 sube el ingreso (${anual890})`);
  // borrar el campo no debe volver el precio 0 en silencio
  await p.fill('#precioVacante', '');
  const anualVacio = num(await p.getByTestId('anual').innerText());
  ok(anualVacio !== num('9,800'), `/simulador: campo vacío no convierte el precio en 0 (anual ${anualVacio})`);
  await p.fill('#precioVacante', '890');
  ok(await sinScroll(p), '/simulador: sin scroll horizontal'); await snap('02-simulador');

  // 3. guardar escenario → recargar → sigue
  await p.fill('#nombre', 'Prueba 890');
  await p.click('button:has-text("Guardar")');
  await p.reload(); await p.waitForLoadState('networkidle');
  ok(await p.getByRole('list', { name: 'Escenarios guardados' }).getByText('Prueba 890').count() === 1, 'escenario guardado sobrevive a recargar');
  await p.getByRole('button', { name: 'Cargar' }).first().click();
  ok(num(await p.getByTestId('anual').innerText()) === anual890, 'cargar el escenario reproduce el ingreso');

  // 4. enlace compartido
  await p.click('button:has-text("Copiar enlace")');
  const url = await p.evaluate(() => navigator.clipboard.readText());
  ok(/\/simulador\?e=[A-Za-z0-9_-]+$/.test(url), `enlace con ?e= (${url.slice(-30)})`);
  const p2 = await ctx.newPage(); await p2.goto(url.replace(/^https?:\/\/[^/]+/, base)); await p2.waitForLoadState('networkidle');
  ok(num(await p2.getByTestId('anual').innerText()) === anual890, 'el enlace reproduce el escenario en otra pestaña');
  await p2.goto(base + '/simulador?e=%3Cscript%3E'); await p2.waitForLoadState('networkidle');
  ok(num(await p2.getByTestId('anual').innerText()) === 47117 && await p2.getByText('escenario inválido').count() === 1, 'enlace inválido → Base + aviso');
  await p2.close();

  // 5. /about = mismas cuentas
  await p.goto(base + '/about'); await p.waitForLoadState('networkidle');
  const txt = await p.locator('article').innerText();
  ok(/2\.4 : 1/.test(txt) && /2\.4 a 1/.test(txt), '/about: 2.4:1 en título y tabla');
  ok(txt.includes('$58,800'), '/about: umbral $58,800');
  ok(txt.includes('PENDIENTE') && txt.includes('simuladas'), '/about: conversación real PENDIENTE y sesiones simuladas dichas');
  ok(!txt.includes('890') && txt.includes('lib/conversaciones.js'), '/about: la regla del experimento (490→890) no se le muestra al pagador; enlace a la regla fechada');
  ok(txt.includes('$47,117'), '/about: el escenario Base del memo = simulador');
  ok(await sinScroll(p), '/about: sin scroll horizontal'); await snap('03-about');

  // 6. /convocar: "a ninguna" del mismo tamaño
  await p.goto(base + '/convocar'); await p.waitForLoadState('networkidle');
  const a = await p.getByRole('button', { name: 'Probar a todas mis finalistas' }).boundingBox();
  const z = await p.getByRole('button', { name: 'A ninguna' }).boundingBox();
  ok(a && z && Math.abs(a.width - z.width) < 2 && Math.abs(a.height - z.height) < 2, `/convocar: "a ninguna" mide lo mismo (${a && Math.round(a.width)}×${a && Math.round(a.height)} vs ${z && Math.round(z.width)}×${z && Math.round(z.height)})`);
  await snap('04-convocar');
  await p.getByRole('button', { name: 'A ninguna' }).click();
  ok(await p.getByText('no se cobra nada').count() === 1 && await p.locator('#despacho').count() === 0, '"a ninguna": no se cobra, se oculta el formulario');
  await p.getByRole('button', { name: 'Probar a todas mis finalistas' }).click();
  ok(await p.locator('#despacho').count() === 1, '"a todas": aparece el formulario');

  // 7. eventos: lista cerrada, nada de escenarios
  const r400 = await p.request.post(base + '/api/eventos', { data: { evento: 'escenario_guardado', pantalla: 'simulador', precio: 890 } });
  ok(r400.status() === 400, 'POST evento con datos del escenario → 400');
  await p.waitForTimeout(300);
  ok(posts.length >= 5 && posts.every(d => !d.includes('890') && !d.includes('Prueba')), `ningún POST lleva números ni nombres del escenario (${posts.length})`);

  await b.close();
  console.log(`\n${n - fails}/${n} OK`); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1) });
