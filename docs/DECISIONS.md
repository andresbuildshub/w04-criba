# Decisions — w04-criba

> Cierre de sesión, cada sesión: una línea por decisión con el porqué, el primer movimiento de mañana arriba, commit, push. De aquí se mina el Método de la Semana 12.

**Tomorrow's first move:** llevar la URL a 5 dueños de despacho reales (WhatsApp) y registrar sus decisiones en /tablero; con 20, aplicar el criterio 5-de-20.

---

<!-- newest first: YYYY-MM-DD — decision — why -->
- 2026-09-06 — PERSONA (Lic. Ramírez, dueño de despacho de 4): peor confusión = lo mandaban al examen de 40 min antes de dejarlo opinar, y no sabía quién estaba detrás. Fix: /decision se vuelve autosuficiente (resumen de un minuto con 3 renglones de ejemplo), tarjeta de inicio promete "dos minutos, sin examen", bloque "¿Quién hace esto?" con nombre y correo, y se quita la jerga de cara al dueño ("criterio de muerte" → "regla del piloto", sin "Vercel Blob", sin "T2 · lente MONEY"). Se deja publicada la lista de tipos de error (Condición 3) y se explica por qué. Deploy #3. Log completo: docs/PERSONA_test.md.
- 2026-09-06 — BUG (prueba mecánica, celular): la tabla de 7 columnas escondía "Clasificación del agente" fuera de pantalla; la muestra era imposible desde un teléfono. Fix: tarjetas en móvil, tabla solo en ≥640px. Redeploy.
- 2026-09-06 — La declaración del Blueprint ("entrevistar 20 dueños") se convierte en producto: la muestra visible + formulario anónimo + tablero público — porque Business Bending exige software vivo y la entrevista ES el instrumento de la Condición 1.
- 2026-09-06 — Persistencia en Vercel Blob (un JSON inmutable por respuesta) en vez de Supabase — porque no había credenciales de Supabase en esta Mac y los archivos inmutables evitan lecturas stale del CDN.
- 2026-09-06 — Cero datos personales en el formulario (sin nombre/correo/teléfono) — porque elimina la necesidad de auth y RLS y honra la Condición 5; el costo es no poder dar seguimiento a un dueño: se acepta.
- 2026-09-06 — La verdad de terreno (`error`) se quita en el server component y la calificación corre en /api/calificar — porque si viajara al navegador la muestra se resuelve leyendo el bundle.
- 2026-09-06 — La revisión del mensaje es por reglas y se etiqueta SIMULADA en pantalla y en la constancia — porque no hay API de LLM disponible y el curso permite simular etiquetando; una IA real será una versión nueva de la rúbrica.
- 2026-09-06 — Las respuestas DEMO se muestran aparte y no cuentan — porque el tablero necesita enseñar el formato sin fabricar evidencia.
- 2026-09-06 — Se publica el criterio de muerte (5 de 20) en el inicio y el tablero — porque la honestidad del Blueprint (bets + dissent) debe verse en el producto, no solo en el PDF.
