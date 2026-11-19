## Ficha

| # | Hecho (una oración, sin adjetivos) | Cita literal | Archivo | Tipo |
|---|---|---|---|---|
| 1 | En la entrega de demostración, la finalista marcó tres facturas que estaban mal y se le fue una. | «encontro: [ 'gasto pagado en efectivo que no se deduce así', 'consumo en restaurante al 100% (solo 8.5%)', 'inversión (activo fijo) registrada como gasto', ]» y «seLeFue: ['factura emitida a otro RFC']» | `lib/demo.js:16-22` | inventado («JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO.», `lib/demo.js:1`; «Esta entrega es de UNA finalista que no existe.», `lib/demo.js:4`) |
| 2 | La finalista marcó además una factura que estaba bien clasificada. | «deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo', nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.' }]» | `lib/demo.js:24` | inventado |
| 3 | El mensaje que escribió al cliente del ejercicio nombra tres correcciones (gasolina, comida, computadora) y pide confirmación antes del cierre. | «Revisé las facturas de octubre y hay tres que tenemos que corregir. La gasolina del día 3 se pagó en efectivo y así no se puede deducir; de aquí en adelante hay que pagarla con tarjeta. La comida con el proveedor no es deducible al cien por ciento, solo el 8.5. Y la computadora nueva no va como gasto del mes: es activo fijo y se deprecia. ¿Me confirma para hacer los ajustes antes del cierre?» | `lib/demo.js:28` | inventado |
| 4 | La ayuda aparece en la entrega como un dato que la finalista declara, y en la demostración dice que consultó leyes o apuntes. | «asistencia: 'consultó leyes o apuntes'» (demo); «Ayuda declarada: {ASIST[intento.asistencia] \|\| intento.asistencia}» (pantalla) | `lib/demo.js:27`; `app/verificar/page.js:42` | inventado (el dato); medido (la etiqueta «Ayuda declarada» está en el código de la pantalla) |
| 5 | La pantalla real escribe qué no dice la entrega y qué pedirle a la finalista en la llamada. | «Lo que esto NO dice: que esté certificada, que sea apta, que lo escribió sola, ni cómo va a trabajar. Lo que sí: fue una sola sesión de 60 minutos con su enlace, y aquí está lo que se le fue. En la llamada pídale que explique en voz alta justo esa factura, y pregúntele cómo lo resolvió y qué usó.» | `app/verificar/page.js:45` | medido (texto que está en el código de la pantalla; no es medición de uso) |

## Lo que NO se puede afirmar con estas fuentes

- **Quién escribió el mensaje ni qué ayuda hubo en realidad.** La pantalla solo enseña la ayuda «declarada» y dice que no afirma «que lo escribió sola». El registro del intento es «sin identidad: código, convocatoria, inicio, entrega, qué marcó. Ni nombre, ni teléfono, ni correo» (`lib/convocatorias.js:3`).
- **Cuánto le toma al socio leer la entrega.** Ningún archivo lo mide, así que el tiempo que pida el campo `entrada` va como supuesto.
  - El «30 segundos» de `app/verificar/page.js:28` es un encabezado de la pantalla, sin medición detrás.
  - El mensaje tiene 81 palabras; es conteo mío, a mano, no una cita.
- **Varios detalles que la demostración no trae.**
  - Que fuera sobre 20 facturas: `lib/demo.js` lista 5 folios y la pantalla dice «de 4».
  - Cuál de las 6 verificaciones de texto no cumplió el mensaje: solo está «{ cumplidas: 5, total: 6 }».
  - A qué folio corresponden la gasolina, la comida y la computadora: el único folio atado a un concepto es DM-0412.
  - Por qué el mensaje no nombra los garrafones ni la factura a otro RFC: se ve que no los nombra, no la razón.
- **Que la entrega sea buena o mala, o que las reglas fiscales del ejemplo estén bien.** El archivo declara: «estas reglas fiscales no las revisó un contador titulado» (`lib/demo.js:6`).
  - La demostración trae «pasaRegla: true» y la pantalla real dice «Pasó»/«No pasó la regla» y «Encontró». Eso choca con el encargo («Criba no dice si es buena o mala») y con los verbos permitidos; lo decide quien escriba la pieza.
  - Tampoco se pueden afirmar minutos: «Criba no pone a dos finalistas lado a lado ni muestra cuántos minutos tardó cada una» (`app/verificar/page.js:46`).
