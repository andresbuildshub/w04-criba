## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| titular: «Lea la entrega de una finalista inventada» (12 palabras) | «Esta entrega es de UNA finalista que no existe.» | `lib/demo.js:4` | PASA |
| entrada: «la entrega de una finalista que no existe (INVENTADO)» | «JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO.» · «Esta entrega es de UNA finalista que no existe.» | `lib/demo.js:1`, `lib/demo.js:4` | PASA |
| entrada: «qué facturas marcó, cuál se le fue y qué le escribió al cliente del ejercicio» | «// Lo que marcó y sí estaba mal» · «seLeFue: ['factura emitida a otro RFC']» · «mensaje: 'Buenas tardes, don Ernesto. Revisé las facturas de octubre…'» | `lib/demo.js:15-22`, `lib/demo.js:28` | PASA |
| entrada: «Leerla le toma unos dos minutos (SUPUESTO…)» | Ningún archivo lo dice. Lo único cercano es «Para dueños de despacho · 30 segundos», un encabezado de pantalla que contradice los dos minutos. | `app/verificar/page.js:28` | SE CORTA (sin cita). La etiqueta SUPUESTO es honesta, pero el número no tiene fuente y choca con el «30 segundos» de la pantalla. |
| pregunta: «¿Qué le preguntaría usted a esta finalista en la llamada de la oferta?» | «En la llamada pídale que explique en voz alta justo esa factura, y pregúntele cómo lo resolvió y qué usó.» | `app/verificar/page.js:45` | PASA. «de la oferta» sale del contexto fijo, no del archivo. |
| opción 1, lo que se ve: «se le fue la factura emitida a otro RFC» | «seLeFue: ['factura emitida a otro RFC']» | `lib/demo.js:22` | PASA |
| opción 1, pregunta: «¿Me explica en voz alta qué haría con ella?» | «pídale que explique en voz alta justo esa factura» | `app/verificar/page.js:45` | PASA |
| opción 2, lo que se ve: «marcó la de los garrafones de agua, $640 en efectivo» | «deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo'» | `lib/demo.js:24` | PASA |
| opción 2, lo que se ve: «que estaba bien clasificada por ser menor a $2,000» | «nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.'» · en pantalla solo aparece «Marcó de más (estaba bien): … `${f.folio}, ${f.concepto}`» · «estas reglas fiscales no las revisó un contador titulado» | `lib/demo.js:24`, `app/verificar/page.js:41`, `lib/demo.js:6` | DICE MÁS QUE LA FUENTE: /verificar no muestra la nota y la regla no está revisada. |
| opción 2, pregunta: «¿Por qué marcó la de los garrafones?» | «// Lo que marcó y estaba bien» · «Garrafones de agua, $640 en efectivo» | `lib/demo.js:23-24` | PASA |
| opción 3, lo que se ve: «el mensaje nombra tres correcciones» | «hay tres que tenemos que corregir. La gasolina del día 3… La comida con el proveedor… Y la computadora nueva…» | `lib/demo.js:28` | PASA |
| opción 3, lo que se ve: «le pide al cliente del ejercicio confirmar antes del cierre» | «¿Me confirma para hacer los ajustes antes del cierre?» | `lib/demo.js:28` | PASA |
| opción 3, pregunta: «¿qué hace con esas tres facturas?» | «hay tres que tenemos que corregir» | `lib/demo.js:28` | PASA |
| cierre: «Criba le deja lo que se ve: las facturas que marcó, la que se le fue y el mensaje que entregó» | «// Lo que marcó y sí estaba mal» · «// Lo que estaba mal y no marcó» · «// Lo que marcó y estaba bien» · «Lo que escribió al cliente (tal cual)» | `lib/demo.js:15,21,23`, `app/verificar/page.js:44` | PASA |
| cierre: «No le dice cómo va a trabajar» | «Lo que esto NO dice: que esté certificada, que sea apta, que lo escribió sola, ni cómo va a trabajar.» | `app/verificar/page.js:45` | PASA |
| cierre: «la pantalla le sugiere pedirle que explique en voz alta la factura que se le fue» | «aquí está lo que se le fue. En la llamada pídale que explique en voz alta justo esa factura» | `app/verificar/page.js:45` | PASA |
| autoria: «Criba no registra quién escribió el mensaje» | «Criba registra el INTENTO sin identidad: código, convocatoria, inicio, entrega, qué marcó. Ni nombre, ni teléfono, ni correo.» · «que lo escribió sola» (en lo que NO dice) | `lib/convocatorias.js:3`, `app/verificar/page.js:45` | PASA. La cita es `lib/convocatorias.js:3`; la ficha no la tenía como hecho, el borrador cita los hechos 4 y 5. |
| autoria: «solo la ayuda que la finalista declara» | «Ayuda declarada: {ASIST[intento.asistencia] \|\| intento.asistencia}» | `app/verificar/page.js:42` | PASA |
| autoria: «(aquí, INVENTADO: «consultó leyes o apuntes»)» | «asistencia: 'consultó leyes o apuntes'» | `lib/demo.js:27` | PASA |
| autoria: «usted puede preguntarle cómo lo resolvió y qué usó» | «pregúntele cómo lo resolvió y qué usó.» | `app/verificar/page.js:45` | PASA |
| siguiente paso: «Abrir desde /convocar una ventana de un solo uso» | «El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos.» | `lib/convocatorias.js:2` | PASA |
| siguiente paso: «leer la entrega en /verificar» | «/verificar?c=XXXX-XXXX → busca el INTENTO registrado (muestra abierta por un despacho)» | `app/verificar/page.js:13` | PASA |

## Alertas

**(a) Posesivos que afirman autoría o cercanía: No.**
- El borrador dice «su finalista» («una ventana de un solo uso para su finalista»). Es la misma forma que usa la promesa fija («qué facturas marcó su finalista») y no afirma autoría.
- No aparece «su trabajo» ni «su cliente». El borrador dice «el cliente del ejercicio» y «el cliente».
- Ojo: si /lectura copia la pantalla real, trae «Su mensaje al cliente cumplió…» (`app/verificar/page.js:42`). Ese posesivo no debe pasar a la pieza.

**(b) Dos oraciones que juntas prometen algo que ninguna promete sola: Sí.**
- La opción 2 pone bajo el rótulo «Lo que se ve:» la frase «que estaba bien clasificada por ser menor a $2,000».
- Junto con el encargo («tal como se ve en `/verificar`»), eso promete que la pantalla real le explica al socio por qué una factura estaba bien.
- La pantalla real solo muestra folio y concepto (`app/verificar/page.js:41`), y la regla fiscal está declarada como no revisada (`lib/demo.js:6`).

**(c) Cifras sin fuente: Sí.**
- «Leerla le toma unos dos minutos» no tiene fuente. La pantalla dice «30 segundos» (`app/verificar/page.js:28`), así que las dos cifras se contradicen.
- Las demás cifras tienen cita: «$640», «$2,000», «tres», «8.5».

**(d) Algo que convierta la entrega en un juicio sobre la persona: No en el borrador.**
- Riesgo para quien construya la página: `lib/demo.js:25` trae «pasaRegla: true».
- La pantalla real convierte ese dato en «{intento.aprobado ? 'Pasó' : 'No pasó'} la regla» y en «Encontró» (`app/verificar/page.js:39,41`).
- Si /lectura muestra eso «tal como se ve», se vuelve un veredicto y contradice «Criba no dice si es buena o mala».

**(e) Verbos prohibidos del contexto: No.**
- No aparecen saber, servir, evitar, garantizar, reducir, adelantar, certificar ni «contratar mejor».
- Los verbos sobre la finalista son marcó, se le fue, escribió y entregó, más «declara». Los verbos sobre Criba son deja, dice, sugiere y registra.
- No hay signos de admiración ni emojis.
