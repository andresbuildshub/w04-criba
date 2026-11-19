## Faltas

**Regla 1 (decir lo que se ve; solo marcó, se le fue, escribió, entregó)**

1. «Antes de la oferta, usted ve cuál factura se le fue a su finalista.» → Da por hecho que a la finalista del lector se le fue una, y la ventana de esa finalista todavía no registra nada; la promesa dice «cuáles se le fueron». Falta leve. → «Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista.» (14 palabras).

2. «Mensaje al cliente: 5 de 6 verificaciones de texto (reglas, no IA).» → Es un puntaje, no algo que se ve: no lleva ninguno de los cuatro verbos y no dice cuáles son las seis ni cuál faltó. También roza la regla 3, porque «verificaciones de texto (reglas, no IA)» es lenguaje del producto y no de despacho. → Quitar el renglón: quedan 4, dentro del rango, y el orden de `/verificar` se conserva.
   - No estoy seguro de que cuente como falta: el renglón copia casi literal la pantalla (`app/verificar/page.js`, línea 66).
   - `lib/demo.js` solo trae `{ cumplidas: 5, total: 6 }`, así que no hay forma de decir cuál verificación faltó sin inventarla.
   - La misma frase se repite en `texto_alternativo` («el mensaje tuvo 5 de 6 verificaciones de texto»); si sale el renglón, sale también de ahí y «cinco renglones» pasa a «cuatro».

**Regla 2 (cada número con su etiqueta; cada afirmación con su fuente)**

Sin faltas. Una advertencia: las etiquetas «[hecho N · inventado]» son anotaciones del borrador y no llegan a la imagen. Ahí la única etiqueta para los siete números de los renglones 1 a 4 es el «INVENTADO» del pie, debajo de una línea grande que dice «su finalista». El encargo la pone en el pie, así que el borrador cumple; repetir «INVENTADO» sobre el primer renglón cuesta una palabra.

**Regla 3 (de usted, español de despacho, sin admiraciones ni emojis)**

3. «La entrega sale de `lib/demo.js`; el orden, de la pantalla `/verificar`.» → Una ruta de archivo sin explicación no es español de despacho, y la imagen debe entenderse sin abrir nada. La fuente tiene que quedarse (regla 2); solo le falta decir qué es. → «La entrega es un ejemplo escrito por Criba (archivo `lib/demo.js`); el orden es el de la pantalla `/verificar`.»

Lo demás cumple: de usted en toda la pieza, sin admiraciones ni emojis, sin «talento», «match» ni «onboarding». «Mensaje al cliente» en vez de «Su mensaje» y «cliente del ejercicio» en el renglón 5 están bien resueltos.

## Carnada

No. No hay preguntas, «¿sabía que…?» ni urgencia. Lo más cercano es que la línea grande y el marcatextos insisten en lo que se le fue («Se le fue 1: factura emitida a otro RFC.»), pero eso es lo que la pantalla resalta y le sirve al socio para la llamada.

## Lectura en voz alta

Los renglones 1, 2, 3 y 5 suenan a un colega de despacho por WhatsApp; el renglón 4 y el pie no suenan a anuncio, sino a documentación de un programa.
