# Contexto fijo para los seis roles (Criba, semana 15)

Criba es una muestra de trabajo de 40 minutos para auxiliares contables: 20 facturas (CFDI) inventadas ya clasificadas, 4 están mal; la finalista marca cuáles y le escribe un mensaje al cliente del ejercicio. El socio de un despacho abre una ventana de un solo uso (60 minutos) desde `/convocar` y después lee la entrega en `/verificar`.

**Público de estas piezas:** el socio o dueño de un despacho contable de 1 a 20 personas, sin RH, que lee él mismo lo que sale de su despacho. La finalista entrega y nunca paga.

**Momento:** la tarde después de las primeras entrevistas, con una o dos finalistas, antes de hacer la oferta.

**La promesa (lo único que se puede prometer):** "Antes de hacer la oferta, usted ve qué facturas marcó su finalista en un juego de 20, cuáles se le fueron y qué le escribió al cliente del ejercicio."

**La promesa que NO se hace:** que va a contratar mejor. Tampoco "apta", "certificada", "lo hizo sola", ni nada que prediga desempeño.

**Tres reglas de voz**
1. Decir lo que se ve, no lo que significa. Solo verbos que la ventana registra: marcó, se le fue, escribió, entregó.
2. Cada número con su etiqueta (medido, supuesto o inventado) y cada afirmación con su fuente y la cita literal al lado.
3. De usted y en español de despacho: factura, deducible, cierre. Sin "talento", "match", "onboarding". Sin signos de admiración ni emojis.

**Prohibido en cualquier pieza**
- Verbos de certeza o predicción: saber, servir, evitar, garantizar, reducir, adelantar, certificar, "contratar mejor".
- Comparar con el periodo de prueba.
- Afirmar autoría ("su trabajo", "lo hizo sola") o cercanía falsa ("su cliente": el cliente es el del ejercicio).
- Comparar personas: nunca dos finalistas en la misma pantalla o pieza, nunca "cuál es mejor", nunca ranking, nunca cuántos minutos tardó.
- Cifras sin fuente, estadísticas sobre candidatas, "ya lo usan N despachos".
- Carnada: preguntas hechas para juntar comentarios, "¿sabía que…?", urgencia falsa.
- Cualquier dato de una candidata real. La finalista de las piezas es inventada (`lib/demo.js`) y se etiqueta INVENTADO.

**Hechos disponibles (archivos del repo; cítelos literalmente)**
- `lib/conversaciones.js`: la única conversación real de precio (2026-11-15).
- `lib/demo.js`: la entrega inventada de demostración.
- `app/verificar/page.js`: lo que el socio ve de una entrega.
- `lib/convocatorias.js`: la ventana (60 minutos, 24 horas para abrir, un solo uso).
- `lib/precios.js`: precio y memo (ratio 2.4 a 1 en el caso base).
- `lib/store.js` y `/tablero`: la regla 5 de 20; hoy hay 0 respuestas reales.
- `docs/CHARTER.md`: las seis condiciones.

Las sesiones de "usuarios" de las semanas 13 y 14 fueron SIMULADAS. Nada de ahí cuenta como hecho.
