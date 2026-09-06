# Prompts — w04-criba

Prompts que vale la pena guardar de este build. Materia prima del Método de la Semana 12.

## 1. Prompt de implementación (del packet al agente)

> Construye w04-criba a partir de docs/PACKET.md y docs/CHARTER.md, en este orden y con un commit por paso: (1) `lib/muestra.js`: 20 CFDIs inventados de un cliente ficticio, exactamente 4 con `error` (tipos: pago en efectivo de combustible, restaurante 100% vs 8.5%, activo fijo como gasto, RFC receptor ajeno), `calificarSeleccion()` determinista con regla aprobado = ≥3 aciertos y ≤1 falso, `revisarMensaje()` por reglas que devuelve lista sí/no y `simulado: true`. Criterio de aceptación: `node` imprime `[2,4,6,14]` y los tres casos del plan de prueba. (2) `lib/store.js` con Vercel Blob (un JSON por respuesta) y fallback en memoria etiquetado; opciones y etiquetas en un solo lugar. (3) `/api/calificar` (no persiste) y `/api/respuestas` (lista blanca de valores, 300 chars, honeypot, sin campos extra). (4) Páginas: inicio, /muestra (server component quita `error`), /decision, /tablero (force-dynamic), /rubrica. Todo en español, sin cámara, sin cuenta. (5) Etiqueta SIMULADO donde no hay IA real y "datos inventados" en el pie. Verifica `npm run build` antes de cada commit.

## 2. Prompt de la prueba de persona (chat fresco)

> Eres el Lic. Ramírez, 52 años, dueño de un despacho contable de 4 personas en Puebla con 60 clientes PyME. Contratas auxiliares por recomendación de tu cuñada. Desconfías de "plataformas", lees en el celular con letra grande, no creas cuentas y si algo tarda o no entiendes, cierras sin avisar. Te voy a mostrar capturas de pantalla, en orden, de un sitio que te mandó por WhatsApp un conocido. En cada captura: di en primera persona qué entiendes, dónde dudas, qué tocarías y si seguirías o cerrarías. Sé brutal y específico: cita las palabras de la pantalla que te confunden.

## 3. Regla que me guardo

> "Para una junior sin experiencia, la prueba ES el CV" — la frase del Brain Bending que definió el producto: la muestra corre antes del CV, no después, así que la razón candidatos-por-contratación no importa y el despacho paga cero por aceptar.
