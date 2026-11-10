# Prompts — w04-criba

Prompts que vale la pena guardar de este build. Materia prima del Método de la Semana 12.

## 1. Prompt de implementación (del packet al agente)

> Construye w04-criba a partir de docs/PACKET.md y docs/CHARTER.md, en este orden y con un commit por paso: (1) `lib/muestra.js`: 20 CFDIs inventados de un cliente ficticio, exactamente 4 con `error` (tipos: pago en efectivo de combustible, restaurante 100% vs 8.5%, activo fijo como gasto, RFC receptor ajeno), `calificarSeleccion()` determinista con regla aprobado = ≥3 aciertos y ≤1 falso, `revisarMensaje()` por reglas que devuelve lista sí/no y `simulado: true`. Criterio de aceptación: `node` imprime `[2,4,6,14]` y los tres casos del plan de prueba. (2) `lib/store.js` con Vercel Blob (un JSON por respuesta) y fallback en memoria etiquetado; opciones y etiquetas en un solo lugar. (3) `/api/calificar` (no persiste) y `/api/respuestas` (lista blanca de valores, 300 chars, honeypot, sin campos extra). (4) Páginas: inicio, /muestra (server component quita `error`), /decision, /tablero (force-dynamic), /rubrica. Todo en español, sin cámara, sin cuenta. (5) Etiqueta SIMULADO donde no hay IA real y "datos inventados" en el pie. Verifica `npm run build` antes de cada commit.

## 2. Prompt de la prueba de persona (chat fresco)

> Eres el Lic. Ramírez, 52 años, dueño de un despacho contable de 4 personas en Puebla con 60 clientes PyME. Contratas auxiliares por recomendación de tu cuñada. Desconfías de "plataformas", lees en el celular con letra grande, no creas cuentas y si algo tarda o no entiendes, cierras sin avisar. Te voy a mostrar capturas de pantalla, en orden, de un sitio que te mandó por WhatsApp un conocido. En cada captura: di en primera persona qué entiendes, dónde dudas, qué tocarías y si seguirías o cerrarías. Sé brutal y específico: cita las palabras de la pantalla que te confunden.

## 3. Regla que me guardo

> "Para una junior sin experiencia, la prueba ES el CV" — la frase del Brain Bending que definió el producto: la muestra corre antes del CV, no después, así que la razón candidatos-por-contratación no importa y el despacho paga cero por aceptar.


## Semana 13 — prompt de implementación (del packet al agente), 2026-11-05

> Construye la semana 13 de Criba sobre el repo existente, en este orden, un commit por paso, packet primero: (1) `docs/PACKET.md` (el de la semana 4 se renombra `PACKET-w04.md`). (2) `lib/firma.js`: HMAC-SHA256 con `CONSTANCIA_SECRET` sobre `fecha|version|aciertos|falsos|cumplidos|total|asistencia` → 8 chars del alfabeto sin 0/O/1/I, formato XXXX-XXXX; `verificar(campos, codigo)` con timingSafeEqual; sin secreto → null. `lib/eventos.js`: lista cerrada de 9 eventos, `validar` rechaza nombres fuera de lista y campos extra, guarda `{evento, pantalla, dia}` SIN hora en Vercel Blob `w04-criba/eventos/DIA-evento.json`; `resumirEventos` cuenta por evento, embudos, por día. AC: 6 tests `node --test`. (3) `POST/GET /api/eventos`; `/api/calificar` firma y arma la constancia con el mensaje de la candidata ARRIBA, el conteo abajo, el enlace `/verificar?c=&f=&v=&a=&x=&m=&t=&s=`. (4) `/verificar` recalcula y muestra Sí/No + qué NO dice + qué preguntar en la entrevista; `/metrica` conteos + "lo que este log nunca hace"; `/volver` evento regreso; `registrar()` client-side con sendBeacon; eventos en inicio, muestra (vista, calificada, copiada), decision (abierta, enviada), tablero. (5) Playwright e2e a 390 px: 14 checks. Deploy tras (4) y tras el fix #1 de las sesiones.

## Semana 13 — prompt de sesión de usuario (capa 2, chat fresco, solo lectura)

> Ver `w13-fight/sesiones/_comun.txt` + un archivo por persona (`01-dueno-gdl.txt` … `05-egresado-unitec.txt`): rol no nombre, dispositivo, cómo llegó el link; "mi vida, no el producto" (3 min: última contratación / última postulación, segunda mejor candidata, semana seis); tarea pantalla por pantalla con tiempo; bitácora de confusiones con columna OBSERVADO/DECLARADO y severidad; compromiso que cuesta (reenviar el link delante de mí / a qué despacho y cuándo) marcado COMPROMISO REAL o DECLARADO; lo peor en una frase.


## Semana 14 — prompt de implementación (del packet al agente), 2026-11-10

> Construye la semana 14 de Criba sobre el repo existente, un commit por paso, packet primero (`docs/PACKET.md`; el de la semana 13 pasa a `PACKET-w13.md`). (1) `lib/precios.js`: TIERS (gratis / 490 por vacante / 4,900 anual), MEMO con cada supuesto {v, u, tipo: medido|supuesto|decisión, fuente}, `costoMala()`, `valorVacante()`, `ratio()` (AC: 2.4), `umbralCosto(10)` (AC: 58,800), `sensibilidad()` 2×2; CAMPOS del simulador con base/min/max/tipo/fuente, `simular()` (AC base: 47,117/año, fijos 5,100), PRESETS, `limpiarValores()` (llave extra/texto/Infinity → null, fuera de rango → tope), `codificar/decodificar` base64url (AC: ida y vuelta idéntica). +6 eventos de precio en la lista cerrada. Tests `node --test`. (2) `/pricing` (server), `/simulador` (client; localStorage + `?e=`; nada al servidor salvo el evento `escenario_guardado` sin números), `/about` memo calculado con las MISMAS funciones, conversación real desde `lib/conversaciones.js` (vacío → PENDIENTE, nunca un ejemplo). (3) `/convocar`: aviso con el precio al lado y "A ninguna" del mismo tamaño; nav; portada "la candidata nunca paga"; /metrica cuenta a todas vs a ninguna. (4) e2e Playwright 390 px. Deploy tras (3) y tras cada fix.

## Semana 14 — prueba de persona (chat fresco, headless)

> Eres la C.P. Leticia Arriaga (persona SINTÉTICA), 49, socia de un despacho de 5 con ~70 PyMEs; vacante de auxiliar en Computrabajo, tres finalistas el viernes; la última auxiliar se fue en la semana 3 por clasificar mal gastos, lo descubriste revisando a un cliente; cobras iguala, no por hora; lees en el celular, desconfías de plataformas y de precios que no entiendes a la primera; si algo no te cuadra, cierras sin avisar. [capturas 390 px en orden: inicio, pricing, convocar, simulador, about] TAREA: decidir si pagarías MX$490 por probar a tus tres finalistas y qué harías en el sitio. Cita las palabras que te confunden; al final: confusiones (BLOQUEA/MOLESTA), dónde cerrarías, decisión SÍ AL PRECIO / USÓ LO GRATIS / NO, la peor confusión.
