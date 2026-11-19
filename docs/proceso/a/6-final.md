## Texto final

```json
{
  "titular": "Lea la entrega de una finalista inventada y elija qué le preguntaría",
  "entrada": "Usted va a leer la entrega de una finalista que no existe (INVENTADO). Ahí se ve qué facturas marcó, cuál se le fue y qué le escribió al cliente del ejercicio.",
  "pregunta": "¿Qué le preguntaría usted a esta finalista en la llamada de la oferta?",
  "opciones": [
    {
      "se_ve": "Se le fue: factura emitida a otro RFC (INVENTADO).",
      "pregunta": "«Esta factura está emitida a otro RFC. ¿Me explica en voz alta qué haría con ella?»"
    },
    {
      "se_ve": "Marcó de más (estaba bien): DM-0412, Garrafones de agua, $640 en efectivo (INVENTADO).",
      "pregunta": "«¿Por qué marcó la de los garrafones?»"
    },
    {
      "se_ve": "Le escribió al cliente del ejercicio que hay tres que corregir (INVENTADO) y: «¿Me confirma para hacer los ajustes antes del cierre?»",
      "pregunta": "«Si el cliente no le confirma antes del cierre, ¿qué hace con esas facturas?»"
    }
  ],
  "cierre": "Criba le deja lo que se ve: las facturas que marcó, la que se le fue y el mensaje que entregó. No le dice «cómo va a trabajar». Para la llamada, la pantalla le dice: «pídale que explique en voz alta justo esa factura».",
  "autoria": "Criba no registra quién escribió el mensaje, solo la ayuda que la finalista declara (aquí, INVENTADO: «consultó leyes o apuntes»), así que en la llamada usted puede preguntarle cómo lo resolvió y qué usó.",
  "afirmaciones": [
    { "texto": "La finalista no existe (INVENTADO).", "cita": "Esta entrega es de UNA finalista que no existe.", "archivo": "lib/demo.js:4" },
    { "texto": "Todo en la entrega es inventado.", "cita": "JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO.", "archivo": "lib/demo.js:1" },
    { "texto": "Qué facturas marcó.", "cita": "// Lo que marcó y sí estaba mal", "archivo": "lib/demo.js:15" },
    { "texto": "Se le fue la factura emitida a otro RFC.", "cita": "seLeFue: ['factura emitida a otro RFC']", "archivo": "lib/demo.js:22" },
    { "texto": "Marcó de más (estaba bien): DM-0412, Garrafones de agua, $640 en efectivo.", "cita": "deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo'", "archivo": "lib/demo.js:24" },
    { "texto": "Rótulo «Marcó de más (estaba bien)», como lo pinta la pantalla.", "cita": "Marcó de más (estaba bien):", "archivo": "app/verificar/page.js:41" },
    { "texto": "Le escribió al cliente del ejercicio que hay tres que corregir.", "cita": "Revisé las facturas de octubre y hay tres que tenemos que corregir.", "archivo": "lib/demo.js:28" },
    { "texto": "Le escribió: «¿Me confirma para hacer los ajustes antes del cierre?»", "cita": "¿Me confirma para hacer los ajustes antes del cierre?", "archivo": "lib/demo.js:28" },
    { "texto": "El mensaje que entregó, tal cual.", "cita": "Lo que escribió al cliente (tal cual)", "archivo": "app/verificar/page.js:44" },
    { "texto": "Pregunta de la opción 1: que explique en voz alta.", "cita": "En la llamada pídale que explique en voz alta justo esa factura", "archivo": "app/verificar/page.js:45" },
    { "texto": "No le dice «cómo va a trabajar».", "cita": "Lo que esto NO dice: que esté certificada, que sea apta, que lo escribió sola, ni cómo va a trabajar.", "archivo": "app/verificar/page.js:45" },
    { "texto": "La pantalla le dice: «pídale que explique en voz alta justo esa factura».", "cita": "aquí está lo que se le fue. En la llamada pídale que explique en voz alta justo esa factura", "archivo": "app/verificar/page.js:45" },
    { "texto": "Criba no registra quién escribió el mensaje.", "cita": "Criba registra el INTENTO sin identidad: código, convocatoria, inicio, entrega, qué marcó. Ni nombre, ni teléfono, ni correo.", "archivo": "lib/convocatorias.js:3" },
    { "texto": "Solo la ayuda que la finalista declara.", "cita": "Ayuda declarada: {ASIST[intento.asistencia] || intento.asistencia}", "archivo": "app/verificar/page.js:42" },
    { "texto": "Aquí, INVENTADO: «consultó leyes o apuntes».", "cita": "asistencia: 'consultó leyes o apuntes'", "archivo": "lib/demo.js:27" },
    { "texto": "Usted puede preguntarle cómo lo resolvió y qué usó.", "cita": "pregúntele cómo lo resolvió y qué usó.", "archivo": "app/verificar/page.js:45" },
    { "texto": "Llamada de la oferta (en la pregunta).", "cita": "Momento: la tarde después de las primeras entrevistas, con una o dos finalistas, antes de hacer la oferta.", "archivo": "contexto fijo de los seis roles (no es archivo del repo)" }
  ]
}
```

## Cortes

- **entrada:** quité «Leerla le toma unos dos minutos (SUPUESTO…)». No tiene fuente y choca con el «Para dueños de despacho · 30 segundos» de `app/verificar/page.js:28`. → **verificador** (SE CORTA). Para que el campo siga teniendo dos oraciones, partí la primera en dos. No entró ninguna afirmación nueva. Por eso el campo ya no dice cuánto toma leerlo (ver Pendiente).
- **opción 2, lo que se ve:** quité «que estaba bien clasificada por ser menor a $2,000». La pantalla real no muestra esa nota y la regla fiscal no está revisada (`lib/demo.js:6`). Lo cambié por el rótulo literal de la pantalla, «Marcó de más (estaba bien):», con folio y concepto. → **verificador** (DICE MÁS QUE LA FUENTE).
- **opción 3, lo que se ve:** «el mensaje nombra tres correcciones» → «le escribió al cliente del ejercicio que hay tres que corregir». → **estilo**, falta 1 («nombra» no es un verbo que la ventana registra).
- **opción 3, lo que se ve:** «le pide al cliente del ejercicio confirmar antes del cierre» → la cita literal del mensaje, «¿Me confirma para hacer los ajustes antes del cierre?». → **estilo**, falta 2 («pide»). Usé la cita literal en lugar de un segundo «escribió», porque así ya no hace falta ningún verbo de intención.
- **opción 3, pregunta:** «esas tres facturas» → «esas facturas». → **estilo**, falta 3 (número sin etiqueta).
- **cierre:** «No le dice cómo va a trabajar» ahora cita entre « » las palabras de la pantalla, y la cita completa va en `afirmaciones`. → **estilo**, falta 4.
- **cierre:** «la pantalla le sugiere pedirle que explique en voz alta la factura que se le fue» → «la pantalla le dice: «pídale que explique en voz alta justo esa factura»». → **estilo**, falta 5 (cita literal al lado).
- **autoria:** el texto no cambió. La cita de «no registra quién» ahora es `lib/convocatorias.js:3` y no los «hechos 4 y 5». → **estilo**, falta 6, y el **verificador** (cita correcta).
- **Marcas `[hecho N]`:** las quité de todos los campos. Las fuentes se movieron a `afirmaciones`. → **estilo** (lectura en voz alta: con las marcas suena a ficha de revisión).
- **Siguiente paso:** no va en el JSON porque no es uno de los campos del encargo. Ya lo pinta `app/Pasos.js`. Si se conserva, la cita es «El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos.» (`lib/convocatorias.js:2`). → **estilo**, falta 7, y el formato del encargo.
- **`opciones`:** cada opción pasa de ser una cadena a un objeto con `se_ve` y `pregunta`, como pide la especificación visual (dos líneas, y el eco solo repite la pregunta). No cambia ninguna afirmación.

## Pendiente

- **Tiempo de lectura (campo `entrada`):** el encargo pide decir cuánto toma leerlo, y hoy ningún archivo lo dice. Para escribirlo hace falta medir a alguien leyendo `/lectura`, o tomar una decisión escrita sobre qué número usar y cómo se etiqueta. También hay que resolver el choque con el «30 segundos» de `app/verificar/page.js:28`. Mientras tanto, también hay que quitar «(2 minutos)» del título de la pestaña y el «Dos minutos.» de `app/Pasos.js`.
- **Por qué los garrafones estaban bien:** decir «menor a $2,000, el efectivo se permite» necesita dos cosas: que un contador titulado revise la regla (`lib/demo.js:6`) y que la pantalla real muestre la `nota`. Hasta entonces hay que quitar del renglón 5 de la especificación visual la línea «Estaba bien clasificada: menor a $2,000, el efectivo se permite.», porque repite lo que aquí se cortó.
