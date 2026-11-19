## Especificación

- **franja:** `CUENTAS A LA VISTA · 3`. Va en mayúsculas sin formato, porque ni WhatsApp ni LinkedIn tienen gris chico. Es el primer renglón del mensaje.
- **línea:** `*Tres números de Criba, con sus ceros*`. Va en negrita con asteriscos, que WhatsApp sí muestra. En LinkedIn se queda en texto plano. Son 6 palabras.
- **bloque de evidencia** (renglón por renglón, en el orden en que se lee). En WhatsApp va entre triple acento grave para que salga en mono. Cada renglón tiene 30 caracteres o menos para no partirse a 390 px:
  1. `REGLA      5 de 20 dicen sí` y debajo `           (regla, no dato)`
  2. `RESPUESTAS 0 de 20   MEDIDO`
  3. `PRECIO     1 conversación` y debajo `           MEDIDO · 2026-11-15`
  4. `RATIO      2.4 a 1   SUPUESTO` y debajo `           medido: solo sueldo`
  - Fuera del mono, como texto normal, va la cita: `Dijo: "Los 490, me inclino a que sí, pero depende."`
  - La oración de lo que no se sabe va con la cita literal de `lib/conversaciones.js` (corrección del 2026-11-19): `Lo que no se sabe todavía: "Comportamiento registrado de un socio de despacho: cero."`
  - Cambio al borrador: ya no dice "que entrevistó a 2 finalistas". Ese dato es algo que él dijo, no algo registrado. La misma corrección del 19 quitó "USÓ LO GRATIS" porque no se creó ninguna ventana. O se corta, o se escribe "dijo que entrevistó a 2".
  - Cambio al borrador: "salvo el sueldo y el precio" pasa a "solo el sueldo está medido". En `lib/precios.js:33` el precio tiene `tipo: 'decisión'` y no `'medido'`.
- **qué lleva marcatextos (una sola cosa) y por qué:** `0 de 20`. Es el número que rinde cuentas y el único que es un dato medido sobre los dueños. En formato texto no hay marcatextos. Lo que lo sustituye es el lugar: es el primer valor medido del bloque, y en el mono queda solo en su renglón. No se pone en negrita, porque la negrita es la voz de Criba.
- **pie:**
  - La etiqueta y la fuente van en mayúsculas: `FUENTES: lib/store.js · lib/conversaciones.js · lib/precios.js`.
  - Siguiente paso: `Si usted tiene un despacho, puede opinar en /decision. La página dice: "Dos minutos, anónimo".` Hay que poner la URL completa del dominio, porque "/decision" sola no se puede tocar en WhatsApp.
  - No lleva etiqueta INVENTADO porque la pieza no muestra a ninguna finalista ni datos de `lib/demo.js`. Si se le agrega cualquier dato de demo, la etiqueta es obligatoria.
- **formato y tamaño:**
  - Texto solo, sin imagen. Son unas 85 palabras con la cita, por debajo del máximo de 110.
  - **WhatsApp:** negrita en la línea y mono en el bloque.
  - **LinkedIn:** no tiene mono ni negrita. El bloque sale en renglones planos con la etiqueta MEDIDO o SUPUESTO al final de cada uno, sin alinear columnas.
  - Antes de publicar hay que abrir `/tablero` en producción y copiar el número. El "0 de 20" viene de una nota sin fecha (`lib/precios.js:61`).

## Riesgos de lectura

- **Vista previa:** WhatsApp muestra unas dos líneas y LinkedIn unos 210 caracteres antes de "ver más". Si la vista previa se corta en `REGLA 5 de 20 dicen sí`, se lee como un logro. Por eso `RESPUESTAS 0 de 20` tiene que caber dentro de esa vista. Si no cabe, se pone primero y la regla después.
- **"2.4 a 1" se lee como promesa:** el ratio depende de `deteccion: 0.5` ("de las malas que Criba detecta antes", `lib/precios.js:31`), y eso es justo la predicción que la semana 15 prohíbe ("contratar mejor"). Sugiero cortar el renglón del ratio o dejarlo solo como "memo de precio: SUPUESTO, nadie lo ha medido". Esta decisión no me toca y la dejo marcada.
- **/decision choca con la voz y con el chequeo:** la página pregunta "¿Preseleccionaría con esta muestra?" y dice que la candidata "recibe una constancia que dice cuáles de los 4 errores encontró" (`app/decision/page.js:42,58`). Eso es preselección y certificación, lo que la promesa de esta semana no hace. Además, "Dos minutos" no pasa al pie de la letra el chequeo de "nada de minutos". Ese chequeo habla de lo que tarda la finalista, pero un lector puede no hacer la distinción. Hay que decidir si se cita, si se quita "Dos minutos" o si primero se corrige la página.
