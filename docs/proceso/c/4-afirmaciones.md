## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| "La regla del piloto pide que 5 de 20 dueños de despacho digan que sí." | `export const UMBRAL = { minimo_si: 5, muestra: 20 }   // criterio de muerte del Blueprint: 5 de 20 dueños` | `lib/store.js:40` | PASA. Nota: `resumir()` cuenta todos los roles, no solo dueños: `const reales = items.filter(i => !i.demo)` (`lib/store.js:42`). |
| "Es una regla, no un dato." | (no afirma un hecho, describe la línea anterior) | — | PASA |
| "Respuestas reales: 0 de 20 (medido)." | `alcance: { label: 'Cuántos conocen Criba en un año', … tipo: 'supuesto', fuente: 'Hoy: 0 de 20 en 60 días. Sin canal de distribución medido' }` | `lib/precios.js:61` | DICE MÁS QUE LA FUENTE: la cita habla de alcance, es supuesto y no tiene fecha. |
| (otra fuente posible para el mismo número) | `Despachos que han contestado las tres preguntas: <b>0 de 20</b>` | `app/despachos/page.js:45` | DICE MÁS QUE LA FUENTE: es texto fijo de una pieza, no una medición en vivo. |
| "Conversaciones reales de precio: 1 (medido)" | `// Semana 14 — la conversación REAL de precio con un pagador potencial.` (y `CONVERSACIONES` tiene una sola entrada) | `lib/conversaciones.js:1, 19–34` | PASA |
| "con el dueño de un despacho contable" | `quien: 'Dueño de un despacho contable que contrató hace poco',` | `lib/conversaciones.js:22` | PASA |
| "que entrevistó a 2 finalistas" | `finalistas: 2,` y el formato: `// respuesta a "¿a cuántas finalistas entrevistaste la última vez?"` | `lib/conversaciones.js:25, 10` | PASA (lo dijo él, es su última contratación) |
| "Lo que dijo: 'Los 490, me inclino a que sí, pero depende.'" | `palabras: 'La primera gratis, claro. Los 490, me inclino a que sí, pero depende.',` | `lib/conversaciones.js:30` | PASA. La cita está recortada pero el sentido no cambia. |
| "Ratio del memo de precio en el caso base: 2.4 a 1" | `'Nadie contestó → se anota "0 de 5 respondieron" y el memo se queda en 2.4:1, todo supuesto'` | `lib/conversaciones.js:52` | DICE MÁS QUE LA FUENTE: la cita es una rama condicional, no el valor actual. |
| (misma afirmación, "caso base") | `// --- Supuestos del memo 10:1 (una vacante, caso base: 3 finalistas) ---` | `lib/precios.js:26` | DICE MÁS QUE LA FUENTE: la línea de "caso base" dice 10:1, no 2.4. |
| (misma afirmación, el cálculo) | `export function ratio(m = MEMO) { return valorVacante(m) / m.precio.v }`. Con `MEMO`: 10861 × 1.30 × 0.25 × 0.5 × ⅔ ÷ 490 = 2.40 | `lib/precios.js:45, 28–33` | PASA solo como cálculo. No hay texto literal "2.4" en `precios.js`. |
| "(supuesto)" para el ratio | `cargas: … tipo: 'supuesto'`, `pMala: … tipo: 'supuesto'`, `deteccion: … tipo: 'supuesto', fuente: 'Nadie lo ha medido, ni con un solo dueño real'`, `fraccion: … tipo: 'supuesto'` | `lib/precios.js:29–32` | PASA |
| "Salvo el sueldo y el precio, ninguna de sus entradas está medida." | `sueldo: { … tipo: 'medido' …}` y `precio: { v: 490, … tipo: 'decisión' …}` | `lib/precios.js:28, 33` | PASA |
| "Lo que todavía no está registrado es qué hace un socio de despacho. Comportamiento registrado: cero." | `Comportamiento registrado de un socio de despacho: cero.` (dentro de `correccionResultado` de la conversación del 2026-11-15) | `lib/conversaciones.js:29` | DICE MÁS QUE LA FUENTE: la fuente habla de una conversación; el borrador lo generaliza. |
| "puede opinar en /decision, que dice 'Dos minutos, anónimo'" | `Dos minutos, anónimo: no pedimos nombre, correo ni teléfono.` | `app/decision/page.js:43` | PASA. Hay que agregarla a la ficha como hecho 6. |

## Alertas

**(a) Posesivos de autoría o cercanía: no.** "sus entradas" se refiere al memo y "Lo que dijo" al dueño. No hay "su trabajo" ni "su cliente".

**(b) Dos oraciones que juntas prometen algo: no, con una nota.** "Conversaciones reales de precio: 1" junto a "me inclino a que sí" podría leerse como que el precio ya está validado. Lo detiene "Comportamiento registrado: cero", así que esa oración no debe salir de la pieza. "La regla… 5 de 20" junto a "puede opinar en /decision" sí es cierto: la página dice `Cuenta hacia el criterio de 5 de 20.` (`app/decision/page.js:33`).

**(c) Cifras sin fuente: sí.**
- "0 de 20 (medido)": ninguna fuente escrita lo mide. El número real se lee en vivo en `/tablero` (`resumir()` sobre Blob). Si nadie lo copia de producción con fecha, la etiqueta "medido" se corta.
- "2.4 a 1": la única cita literal es una rama condicional. La línea que dice "caso base" dice "10:1". Pasa solo si se cita el cálculo de `ratio()` como fuente, o si se corrige primero el comentario de `lib/precios.js:26`.
- Tamaño: el titular tiene 7 palabras, no 6. El cuerpo tiene unas 96 palabras. Con titular y siguiente paso son unas 117, más que el límite de 110 si se cuenta la pieza entera.

**(d) Algo que convierta la entrega en un juicio sobre la persona: no.** La pieza no menciona a ninguna finalista. La cita es de un dueño real, por su rol y sin nombre.

**(e) Verbos prohibidos: no en la pieza, sí en la página a la que manda.** En el texto no aparece saber, servir, evitar, garantizar, reducir, adelantar, certificar ni "contratar mejor". Pero `/decision` dice `¿Preseleccionaría con esta muestra?` (línea 42), `la usaría para decidir a quién entrevistar` (línea 67) y `una constancia que dice cuáles de los 4 errores encontró` (línea 58). Eso es otro momento (antes de entrevistar, no antes de la oferta) y otro objeto (una constancia que trae la candidata), así que choca con la promesa de la semana 15. No es un verbo prohibido de la lista, pero el socio llega desde la pieza a una pantalla que promete otra cosa.
