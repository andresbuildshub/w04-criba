# Decisions — w04-criba

> Cierre de sesión, cada sesión: una línea por decisión con el porqué, el primer movimiento de mañana arriba, commit, push. De aquí se mina el Método de la Semana 12.

**Tomorrow's first move:** correr las 5 sesiones (3 dueños con vacante abierta en OCC/Computrabajo, 2 egresadas de grupos de Facebook), mandar las fallas a Gonzalo para que las ordene ciego contra la regla, corregir la #1, redesplegar, capturas antes/después; pedir el reenvío del link delante de mí.

---

<!-- newest first: YYYY-MM-DD — decision — why -->
- 2026-11-05 — SEMANA 13 (venture): el log de eventos guarda {evento, pantalla, día} y NUNCA la hora — con cinco sesiones agendadas, "16:07" es un nombre; nunca el código de una constancia al verificarla — nos quita el dato que más queríamos (cuántas veces revisaron a UNA candidata) y así se queda; regla escrita en /metrica.
- 2026-11-05 — Hipótesis #2 shipeada antes de las sesiones y declarada: la constancia lleva el MENSAJE de la candidata arriba y el conteo abajo — el "3 de 4" lo saca un modelo igual (semana 9: 5 de 5 pases); lo que el dueño puede juzgar con su criterio es el mensaje. Se falsifica si el dueño pregunta "¿y el 3 de 4?" antes de leer el mensaje.
- 2026-11-05 — Firma HMAC del resultado (código de 8 letras sin 0/O/1/I) dentro de la constancia + /verificar que recalcula y descarta — comprobar en 30 s sin guardar nada (Condición 5 sigue); sin secreto en el entorno la constancia dice SIN CÓDIGO, nunca se inventa una firma.
- 2026-11-05 — Sin Clarity/Hotjar/PostHog aunque sean gratis — un grabador guardaría las respuestas de la candidata y las teclas; log de primera mano con lista cerrada de 9 eventos, campos extra → 400.
- 2026-11-05 — /volver cuenta "regreso" sin saber quién — prueba barata de segunda visita; la prueba dura de la semana es el mensaje del dueño "ya se lo mandé", y eso no vive en el log (dos columnas: credibilidad en el log, compromiso en la sesión).
- 2026-11-05 — Los 20 CFDIs siguen sin rotar (v0.2) — la clave de respuestas cabe en un WhatsApp; se declara como deuda en el packet y se entrega al Adversario como kill propio.
- 2026-11-05 — Los MX$400 de la egresada mueren esta semana como BET — se mide dolor, no precio; el reenvío gratis del dueño y la egresada que paga se contradicen.
- 2026-11-05 — Mecánica: 6 unit tests + 14 checks Playwright a 390 px (mensaje antes del conteo; verificar sí/no con dato o código editado; evento inventado/campo extra → 400; ningún POST a /api/eventos lleva el mensaje ni el código; GET sin timestamps).
- 2026-09-06 — PERSONA (Lic. Ramírez, dueño de despacho de 4): peor confusión = lo mandaban al examen de 40 min antes de dejarlo opinar, y no sabía quién estaba detrás. Fix: /decision se vuelve autosuficiente (resumen de un minuto con 3 renglones de ejemplo), tarjeta de inicio promete "dos minutos, sin examen", bloque "¿Quién hace esto?" con nombre y correo, y se quita la jerga de cara al dueño ("criterio de muerte" → "regla del piloto", sin "Vercel Blob", sin "T2 · lente MONEY"). Se deja publicada la lista de tipos de error (Condición 3) y se explica por qué. Deploy #3. Log completo: docs/PERSONA_test.md.
- 2026-09-06 — BUG (prueba mecánica, celular): la tabla de 7 columnas escondía "Clasificación del agente" fuera de pantalla; la muestra era imposible desde un teléfono. Fix: tarjetas en móvil, tabla solo en ≥640px. Redeploy.
- 2026-09-06 — La declaración del Blueprint ("entrevistar 20 dueños") se convierte en producto: la muestra visible + formulario anónimo + tablero público — porque Business Bending exige software vivo y la entrevista ES el instrumento de la Condición 1.
- 2026-09-06 — Persistencia en Vercel Blob (un JSON inmutable por respuesta) en vez de Supabase — porque no había credenciales de Supabase en esta Mac y los archivos inmutables evitan lecturas stale del CDN.
- 2026-09-06 — Cero datos personales en el formulario (sin nombre/correo/teléfono) — porque elimina la necesidad de auth y RLS y honra la Condición 5; el costo es no poder dar seguimiento a un dueño: se acepta.
- 2026-09-06 — La verdad de terreno (`error`) se quita en el server component y la calificación corre en /api/calificar — porque si viajara al navegador la muestra se resuelve leyendo el bundle.
- 2026-09-06 — La revisión del mensaje es por reglas y se etiqueta SIMULADA en pantalla y en la constancia — porque no hay API de LLM disponible y el curso permite simular etiquetando; una IA real será una versión nueva de la rúbrica.
- 2026-09-06 — Las respuestas DEMO se muestran aparte y no cuentan — porque el tablero necesita enseñar el formato sin fabricar evidencia.
- 2026-09-06 — Se publica el criterio de muerte (5 de 20) en el inicio y el tablero — porque la honestidad del Blueprint (bets + dissent) debe verse en el producto, no solo en el PDF.
