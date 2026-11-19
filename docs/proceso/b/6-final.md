## Texto final

```json
{
  "franja": "Serie 2 · «La pantalla, a la vista» · pieza B",
  "linea": "Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista.",
  "evidencia": [
    "Marcó 3 de las 4 que estaban mal: gasto pagado en efectivo que no se deduce así; consumo en restaurante al 100%; activo fijo como gasto.",
    "Se le fue 1: factura emitida a otro RFC.",
    "Marcó de más 1 que estaba bien.",
    "Escribió al cliente del ejercicio: «Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. […]»"
  ],
  "marcatextos": "Renglón 2: «Se le fue 1: factura emitida a otro RFC.»",
  "pie": [
    "INVENTADO · Finalista de demostración (no existe). La entrega es un ejemplo: sale del archivo lib/demo.js; el orden es el de la pantalla /verificar.",
    "Para verlo con su finalista: abra una ventana de un solo uso desde /convocar. Cuando ella entregue y le mande la constancia, abra el código en /verificar."
  ],
  "texto_alternativo": "Imagen con la línea «Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista» y cuatro renglones de una entrega inventada de demostración: marcó 3 de las 4 facturas que estaban mal, se le fue la emitida a otro RFC (renglón marcado), marcó de más 1 que estaba bien, y el inicio de lo que escribió al cliente del ejercicio.",
  "afirmaciones": [
    {
      "texto": "Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista.",
      "cita": "Antes de hacer la oferta, usted ve qué facturas marcó su finalista en un juego de 20, cuáles se le fueron y qué le escribió al cliente del ejercicio.",
      "archivo": "lib/piezas.js:17"
    },
    {
      "texto": "Marcó 3 de las 4 que estaban mal",
      "cita": "// Lo que marcó y sí estaba mal (tipos públicos de la rúbrica) · Los cuatro TIPOS de error son los de la rúbrica pública v0.1",
      "archivo": "lib/demo.js:15 y :5"
    },
    {
      "texto": "gasto pagado en efectivo que no se deduce así",
      "cita": "'gasto pagado en efectivo que no se deduce así'",
      "archivo": "lib/demo.js:17"
    },
    {
      "texto": "consumo en restaurante al 100%",
      "cita": "'consumo en restaurante al 100% (solo 8.5%)'",
      "archivo": "lib/demo.js:18"
    },
    {
      "texto": "activo fijo como gasto",
      "cita": "'inversión (activo fijo) registrada como gasto'",
      "archivo": "lib/demo.js:19"
    },
    {
      "texto": "Se le fue 1: factura emitida a otro RFC.",
      "cita": "seLeFue: ['factura emitida a otro RFC']",
      "archivo": "lib/demo.js:22"
    },
    {
      "texto": "Marcó de más 1 que estaba bien.",
      "cita": "// Lo que marcó y estaba bien · deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo', nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.' }]",
      "archivo": "lib/demo.js:23-24"
    },
    {
      "texto": "Escribió al cliente del ejercicio: «Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. […]»",
      "cita": "mensaje: 'Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. · contacto: 'don Ernesto' · Lo que escribió al cliente (tal cual)",
      "archivo": "lib/demo.js:28 y :8 · app/verificar/page.js:44"
    },
    {
      "texto": "INVENTADO · Finalista de demostración (no existe).",
      "cita": "JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO. · quien: 'Finalista de demostración (no existe)'",
      "archivo": "lib/demo.js:1 y :11"
    },
    {
      "texto": "La entrega es un ejemplo: sale del archivo lib/demo.js",
      "cita": "export const DEMO_ENTREGA = {",
      "archivo": "lib/demo.js:10"
    },
    {
      "texto": "el orden es el de la pantalla /verificar",
      "cita": "Encontró <b> … Se le fue: … Marcó de más (estaba bien): … Lo que escribió al cliente (tal cual)",
      "archivo": "app/verificar/page.js:39-44"
    },
    {
      "texto": "abra una ventana de un solo uso desde /convocar",
      "cita": "El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos. · Crear el enlace de un solo uso",
      "archivo": "lib/convocatorias.js:2 · app/convocar/page.js:65"
    },
    {
      "texto": "Cuando ella entregue y le mande la constancia, abra el código en /verificar.",
      "cita": "la constancia que ella le mande dirá que se hizo con su enlace, en una sola sesión · Cuando ella termine, le llega una constancia con un código. Ábralo en … verificar",
      "archivo": "app/convocar/page.js:34 y :78"
    }
  ]
}
```

## Cortes

- **Línea: «cuál factura se le fue» → «cuáles facturas se le fueron».** El singular daba por hecha una omisión (verificador: DICE MÁS QUE LA FUENTE; estilo, falta 1). Queda el plural de la promesa, en 14 palabras.
- **Renglón 1: «pago en efectivo, consumo en restaurante» → «gasto pagado en efectivo que no se deduce así; consumo en restaurante al 100%».** Sin el calificador, todo efectivo o restaurante quedaba como error (verificador: DICE MÁS QUE LA FUENTE). Repuse las palabras literales de `lib/demo.js:17-18`, sin «(solo 8.5%)», que el borrador ya había quitado. Si usted lo considera texto nuevo, el renglón se reduce a «Marcó 3 de las 4 que estaban mal.»
- **Renglón 3: salió «garrafones de agua, $640 en efectivo».** El verificador lo marcó DICE MÁS QUE LA FUENTE. Además, junto al renglón 1 enunciaba una regla sobre el efectivo que nadie revisó (alerta b.2).
- **Renglón «Mensaje al cliente: 5 de 6 verificaciones de texto (reglas, no IA)»: fuera.** Es un puntaje sin verbo de la ventana y no se puede decir cuál verificación faltó (estilo, falta 2, con duda declarada). El verificador lo había pasado, pero observó que la pantalla lo muestra junto con «Ayuda declarada» y el borrador mostraba solo la mitad. Quedan 4 renglones, en el mismo orden.
- **Marcatextos: salió «Es el único renglón que cambia de color en la pantalla».** «Único» no es palabra del archivo y el color solo aparece cuando hay omitidos (observación del verificador). El campo dice solo cuál renglón va marcado.
- **Pie 1: «La entrega sale de `lib/demo.js`; el orden, de la pantalla `/verificar`» → «La entrega es un ejemplo: sale del archivo lib/demo.js; el orden es el de la pantalla /verificar».** Una ruta sin explicación no es español de despacho (estilo, falta 3). No usé «escrito por Criba», que propuso estilo, porque ningún archivo dice quién lo escribió.
- **Pie 2: se agregó la condición «Cuando ella entregue y le mande la constancia, abra el código en /verificar».** Abrir la ventana no basta para ver la pantalla (verificador: DICE MÁS QUE LA FUENTE; alerta b.1). El contenido ya estaba en el «Siguiente paso» del borrador; le sumé el código de la constancia, que el verificador echó en falta.
- **Texto alternativo: «cinco renglones» → «cuatro».** Salieron «el mensaje tuvo 5 de 6 verificaciones de texto» y el concepto de los garrafones, y la línea citada es la nueva (consecuencia de los cortes anteriores).
- **Etiquetas «[hecho N]» y `nota_al_verificador`: fuera.** Eran anotaciones del borrador, no texto de la pieza.

## Pendiente

- **El molde no pinta este texto.** `app/piezas/b/page.js:15` renderiza `<Entrega e={DEMO_ENTREGA} …>` directo de `lib/demo.js`, no del campo `evidencia`. Hoy el PNG mostraría lo que aquí se cortó:
  - «(solo 8.5%)»;
  - «DM-0412, Garrafones de agua, $640 en efectivo»;
  - el mensaje completo, que incluye «solo el 8.5»;
  - «Entregó dentro de la ventana de 60 minutos»;
  - «Ayuda que ella declaró».
  
  Hay que decidir cuál manda, el molde o este texto, antes de renderizar.
- **Garrafones.** Para que vuelva el concepto, un contador titulado tiene que revisar la regla del efectivo: «estas reglas fiscales no las revisó un contador titulado» (`lib/demo.js:6`). La cita del verificador para este renglón quedó vieja: `app/verificar/page.js:41` hoy sí pinta folio y concepto cuando hay facturas marcadas de más. El corte se sostiene solo por la alerta b.2.
- **«Estaban mal» y «estaba bien».** Siguen apoyados en esas reglas sin revisar. Poner el límite declarado en el pie sería una afirmación nueva; necesita pasar por el verificador.
- **Ayuda declarada.** `lib/demo.js:27` trae «asistencia: 'consultó leyes o apuntes'» y la pantalla lo muestra en `app/verificar/page.js:42`. La pieza dice «Escribió» sin ese dato al lado. Agregarlo es una afirmación nueva; si entra, el renglón «5 de 6» puede volver completo, como en la pantalla.
- **Cuál verificación faltó.** `lib/demo.js:26` solo trae `{ cumplidas: 5, total: 6 }`. Sin ese dato, «5 de 6» no se puede explicar.
- **Renglón de la ventana.** «dentroDeVentana: true» (`lib/demo.js:14`) sostendría «Entregó dentro de la ventana de 60 minutos» como primer renglón. No estaba en el borrador, así que no entró.
- **«Cuáles se le fueron» cuando no se le fue ninguna.** La pantalla admite «ninguno» (`app/verificar/page.js:40`) y la pieza no lo dice.
- **Dominio del sitio.** Sin él, `/convocar` y `/verificar` no se pueden seguir desde una imagen reenviada.
- **Medidas del render.** Cambiaron los largos, así que la especificación visual debe volver a medirse:
  - el renglón 1 es más largo: «gasto pagado en efectivo que no se deduce así;» da 46 caracteres contra unos 45 supuestos;
  - el pie es más largo;
  - la línea cambia de corte: `Antes de la oferta,` / `usted ve cuáles facturas` / `se le fueron a su finalista.`
  
  Sigue sin probarse en un teléfono.
- **Conversación del 2026-11-15.** Queda fuera de la imagen. El registro no distingue si «USÓ LO GRATIS» fue un acto o una respuesta: no trae fecha ni código de una ventana abierta.
