## Texto final
```json
{
  "titular": "Tres números de Criba y un cero",
  "cuerpo": "La regla del piloto pide que 5 de 20 dueños de despacho digan que sí. Es una regla, no un dato.\n\nConversaciones reales de precio: 1 (medido), con el dueño de un despacho contable. Dijo: \"Los 490, me inclino a que sí, pero depende.\"\n\nEl memo de precio calcula 2.4 a 1 (supuesto). Solo el sueldo está medido.\n\nLo que todavía no está registrado: que ese dueño haga lo que dijo. El registro de esa conversación anota: \"Comportamiento registrado de un socio de despacho: cero\" (medido).",
  "siguiente_paso": "Si usted tiene un despacho, puede opinar en /decision. La página dice: \"Dos minutos, anónimo\".",
  "afirmaciones": [
    {
      "texto": "La regla del piloto pide que 5 de 20 dueños de despacho digan que sí.",
      "cita": "export const UMBRAL = { minimo_si: 5, muestra: 20 }   // criterio de muerte del Blueprint: 5 de 20 dueños",
      "archivo": "lib/store.js:40"
    },
    {
      "texto": "Conversaciones reales de precio: 1 (medido).",
      "cita": "// Semana 14 — la conversación REAL de precio con un pagador potencial. (CONVERSACIONES tiene una sola entrada, dia: '2026-11-15')",
      "archivo": "lib/conversaciones.js:1, 19–34"
    },
    {
      "texto": "con el dueño de un despacho contable",
      "cita": "quien: 'Dueño de un despacho contable que contrató hace poco',",
      "archivo": "lib/conversaciones.js:22"
    },
    {
      "texto": "Dijo: \"Los 490, me inclino a que sí, pero depende.\"",
      "cita": "palabras: 'La primera gratis, claro. Los 490, me inclino a que sí, pero depende.',",
      "archivo": "lib/conversaciones.js:30"
    },
    {
      "texto": "El memo de precio calcula 2.4 a 1 (supuesto).",
      "cita": "export function ratio(m = MEMO) { return valorVacante(m) / m.precio.v }  (con MEMO: 10861 × 1.30 × 0.25 × 0.5 × ⅔ ÷ 490 = 2.40; cargas, pMala, deteccion y fraccion llevan tipo: 'supuesto')",
      "archivo": "lib/precios.js:45, 28–33"
    },
    {
      "texto": "Solo el sueldo está medido.",
      "cita": "sueldo: { v: 10861, u: 'MX$/mes', tipo: 'medido', … }  /  precio: { v: 490, u: 'MX$/vacante', tipo: 'decisión', … }",
      "archivo": "lib/precios.js:28, 33"
    },
    {
      "texto": "Lo que todavía no está registrado: que ese dueño haga lo que dijo. El registro de esa conversación anota: \"Comportamiento registrado de un socio de despacho: cero\" (medido).",
      "cita": "Dos finalistas, semana 2–3 y \"me inclino a que sí, pero depende\" son cosas que dijo. Comportamiento registrado de un socio de despacho: cero.",
      "archivo": "lib/conversaciones.js:29"
    },
    {
      "texto": "La página dice: \"Dos minutos, anónimo\".",
      "cita": "Dos minutos, anónimo: no pedimos nombre, correo ni teléfono.",
      "archivo": "app/decision/page.js:43"
    }
  ]
}
```

## Cortes
- **Quité «Respuestas reales: 0 de 20 (medido)».** Lo pidió el verificador (DICE MÁS QUE LA FUENTE). La única cita escrita, `lib/precios.js:61`, habla del alcance, es supuesto y no tiene fecha. La otra, `app/despachos/page.js:45`, es texto fijo. Ninguna fuente escrita mide ese número.
- **El titular pasó de «con sus ceros» a «y un cero».** Al cortar el 0 de 20 queda un solo cero en la pieza, el comportamiento registrado. El titular no puede prometer más de uno.
- **Quité «en el caso base» del renglón del ratio.** Lo pidió el verificador (DICE MÁS QUE LA FUENTE): la línea que dice «caso base» dice «10:1» (`lib/precios.js:26`). El 2.4 se queda citado solo como cálculo de `ratio()`, que es lo único que pasó.
- **«Salvo el sueldo y el precio, ninguna está medida» pasó a «Solo el sueldo está medido».** Lo pidió la especificación, con la fuente que el verificador citó: el precio tiene `tipo: 'decisión'`, no `'medido'`.
- **Quité «que entrevistó a 2 finalistas».** Lo pidieron el estilo (número sin etiqueta) y la especificación (es algo que él dijo, no algo registrado). También se cortó para que la pieza quede debajo de 110 palabras, porque el verificador contó unas 117.
- **Cambié la generalización «Lo que todavía no está registrado es qué hace un socio de despacho. Comportamiento registrado: cero».** Lo pidió el verificador (DICE MÁS QUE LA FUENTE): la frase ahora habla solo de esa conversación y lleva la cita completa. El estilo pidió etiqueta para el cero y la tiene: «(medido)». No apliqué la versión que propuso el estilo («Hasta hoy no hay nada registrado de lo que hace un socio») porque vuelve a generalizar, y en eso manda el verificador.
- **Escribí «Lo que todavía no está registrado» y no «lo que no se sabe».** Lo pide la lista de verbos prohibidos: «saber» está en ella.
- **Quité todas las marcas [hecho N] y [no está en la ficha].** Las citas ahora van en `afirmaciones`.

## Pendiente
- **0 de 20:** antes de publicar, abrir `/tablero` en producción y copiar el número con su fecha. Solo así puede volver a la pieza como medido, con la línea literal del tablero. Ojo: `resumir()` cuenta todos los roles, no solo dueños (`lib/store.js:42`).
- **«Caso base»:** corregir el comentario de `lib/precios.js:26` («memo 10:1») o escribir el 2.4 literal en el archivo. Sin eso no se puede decir «caso base», que es justo lo que pide el encargo.
- **Riesgo del ratio:** hay que decidir si el 2.4 a 1 se queda. Depende de `deteccion` («de las malas que Criba detecta antes», `lib/precios.js:31`), y eso puede leerse como la predicción que la semana 15 prohíbe. La otra opción es dejar solo «memo de precio: supuesto».
- **2 finalistas:** puede volver como «dijo que entrevistó a 2 finalistas», si cabe en el límite de palabras.
- **/decision:**
  - Agregar «Dos minutos, anónimo» a la ficha como hecho 6.
  - Poner la URL completa del dominio; no la tengo, así que no la escribí.
  - Antes de mandar a un socio a esa página, decidir si se corrige primero. Hoy pregunta «¿Preseleccionaría con esta muestra?» y habla de una «constancia que dice cuáles de los 4 errores encontró» (`app/decision/page.js:42, 58`), y eso choca con la promesa de la semana 15.
