## Ficha

| # | Hecho (una oración, sin adjetivos) | Cita literal | Archivo | Tipo |
|---|---|---|---|---|
| 1 | El piloto tiene una regla: necesita que 5 de 20 dueños de despacho digan que sí. | `"export const UMBRAL = { minimo_si: 5, muestra: 20 }   // criterio de muerte del Blueprint: 5 de 20 dueños"` | `lib/store.js` (línea 40) | Es una regla, no un dato. No es ni medido ni supuesto. |
| 2 | El registro dice que hay 0 respuestas reales de 20. | `"Hoy: 0 de 20 en 60 días. Sin canal de distribución medido"` | `lib/precios.js` (línea 61, campo `alcance.fuente`) | medido (con una salvedad: ver la primera viñeta de abajo) |
| 3 | Hay una sola conversación real de precio, del 2026-11-15, con el dueño de un despacho contable que entrevistó a 2 finalistas. | `"dia: '2026-11-15'"`, `"quien: 'Dueño de un despacho contable que contrató hace poco'"`, `"finalistas: 2"` | `lib/conversaciones.js` (líneas 21, 22, 25) | medido (lo dijo él) |
| 4 | A la pregunta por MX$490 el dueño contestó con palabras, y no hay ningún comportamiento suyo registrado. | `"La primera gratis, claro. Los 490, me inclino a que sí, pero depende."` y `"Comportamiento registrado de un socio de despacho: cero."` | `lib/conversaciones.js` (líneas 30 y 29) | medido (sus palabras y el log de ese día) |
| 5 | El ratio del memo en el caso base es 2.4 a 1, y todas sus entradas son supuestos salvo el sueldo y el precio. | `"el memo se queda en 2.4:1, todo supuesto"` y, para la detección, `"Nadie lo ha medido, ni con un solo dueño real"` | `lib/conversaciones.js` (línea 52) y `lib/precios.js` (línea 31) | supuesto |

Cómo verifiqué el hecho 5: `lib/precios.js` no tiene escrito "2.4". Lo calculé con `ratio()` y los valores de `MEMO`: 10,861 × 1.30 × 0.25 × 0.5 × ⅔ ÷ 490 = 2.40. En ese cálculo el sueldo es `'medido'`, el precio es `'decisión'`, y las cargas, `pMala`, `deteccion` y `fraccion` son `'supuesto'`.

## Lo que NO se puede afirmar con estas fuentes

- **Que "hoy" sean 0 respuestas reales.** El número que muestra `/tablero` se lee en vivo de Vercel Blob (`lib/store.js`, función `leer()`), no de un archivo. La única cifra escrita es la nota de `precios.js`, que no tiene fecha. Antes de publicar, alguien tiene que abrir `/tablero` en producción y copiar el número.
- **Que el despacho pagaría MX$490, o que "usó lo gratis".** La corrección del 2026-11-19 dice que no se abrió ninguna ventana y que "ni esas aperturas se le pueden atribuir". Lo único que se puede citar son sus palabras: "me inclino a que sí, pero depende". Tampoco se sabe de qué depende ni cuántas personas tiene el despacho.
- **Ninguna cifra "10:1".** El comentario de `lib/precios.js` línea 26 dice "memo 10:1", pero la cuenta da 2.4:1. La pieza debe usar 2.4:1 y llamarlo supuesto. Ese comentario contradice al memo y conviene corregirlo aparte.
- **Lo de LinkedIn en frío ("5 enviados, 1 contestó").** Solo aparece en un mensaje de commit, y el mismo commit dice "sin texto literal en el repo". No entra.

Nota para el siguiente rol: la ruta `/decision` existe (`app/decision/page.js`). No leí su contenido, así que no confirmé que se pueda contestar en "2 minutos".
