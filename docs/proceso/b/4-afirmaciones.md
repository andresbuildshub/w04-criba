## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| línea: «Antes de la oferta, usted ve […] a su finalista» (momento y posesivo) | "Antes de hacer la oferta, usted ve qué facturas marcó su finalista en un juego de 20, cuáles se le fueron y qué le escribió al cliente del ejercicio." | `lib/piezas.js:17` | PASA |
| línea: «usted ve cuál factura se le fue» | `Se le fue: <b>{intento.omitidos.length ? intento.omitidos.map(i => TIPO[i]).join('; ') : 'ninguno'}</b>` | `app/verificar/page.js:40` | DICE MÁS QUE LA FUENTE (da por hecha una omisión; la pantalla admite «ninguno») |
| evidencia 1: «Marcó 3 de las 4 que estaban mal» | "// Lo que marcó y sí estaba mal (tipos públicos de la rúbrica)" seguido de tres elementos · "Los cuatro TIPOS de error son los de la rúbrica pública v0.1" · `Encontró <b>{intento.aciertos.length} de 4</b>` | `lib/demo.js:15-20` y `:5` · `app/verificar/page.js:39` | PASA |
| evidencia 1: «pago en efectivo, consumo en restaurante» | "'gasto pagado en efectivo que no se deduce así'" · "'consumo en restaurante al 100% (solo 8.5%)'" | `lib/demo.js:17-18` | DICE MÁS QUE LA FUENTE (sin el calificador, todo efectivo o restaurante queda como error) |
| evidencia 1: «activo fijo como gasto» | "'inversión (activo fijo) registrada como gasto'" | `lib/demo.js:19` | PASA |
| evidencia 2: «Se le fue 1: factura emitida a otro RFC.» | "seLeFue: ['factura emitida a otro RFC']" | `lib/demo.js:22` | PASA |
| evidencia 3 (contenido): «Marcó de más 1 que estaba bien: garrafones de agua, $640 en efectivo.» | "deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo', nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.' }]" | `lib/demo.js:24` | PASA |
| evidencia 3 (como renglón de `/verificar`) | `Marcó de más (estaba bien): <b>{intento.falsos.length}</b>.` | `app/verificar/page.js:41` | DICE MÁS QUE LA FUENTE (la pantalla da solo el número, no cuál factura) |
| evidencia 4: «Mensaje al cliente: 5 de 6 verificaciones de texto (reglas, no IA).» | "verificacionesMensaje: { cumplidas: 5, total: 6 }" · `Mensaje al cliente: <b>{campos.cumplidos} de {campos.total}</b> verificaciones de texto (reglas, no IA).` | `lib/demo.js:26` · `app/verificar/page.js:66` | PASA |
| evidencia 5: «Escribió al cliente del ejercicio: «Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. […]»» | "mensaje: 'Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir." · "contacto: 'don Ernesto'" · "Lo que escribió al cliente (tal cual)" | `lib/demo.js:28` y `:8` · `app/verificar/page.js:44` | PASA |
| orden de los cinco renglones (marcó, se le fue, de más, verificaciones, lo que escribió) | `Encontró <b>` … `Se le fue:` … `Marcó de más (estaba bien):` … `Su mensaje al cliente cumplió` … `Lo que escribió al cliente (tal cual)` | `app/verificar/page.js:39-44` | PASA |
| marcatextos: «Es el único renglón que cambia de color en la pantalla.» | `<li className={intento.omitidos.length ? 'text-amber-200' : ''}>Se le fue:` | `app/verificar/page.js:40` | PASA |
| pie 1: «INVENTADO · Finalista de demostración (no existe).» | "JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO." · "quien: 'Finalista de demostración (no existe)'" | `lib/demo.js:1` y `:11` | PASA |
| pie 1: «La entrega sale de `lib/demo.js`; el orden, de la pantalla `/verificar`.» | "export const DEMO_ENTREGA = {" · las cinco filas de la lista | `lib/demo.js:10` · `app/verificar/page.js:38-44` | PASA |
| pie 2: «abra una ventana de un solo uso desde `/convocar`» | "El DUEÑO abre una ventana: enlace de un solo uso que caduca en 24 h y, una vez abierto, da 60 minutos." · "Crear el enlace de un solo uso" | `lib/convocatorias.js:2` · `app/convocar/page.js:63` | PASA |
| pie 2: «Para verlo con su finalista, abra una ventana…» | "Cuando ella termine, le llega una constancia con un código. Ábralo en" … "verificar" … ": ahí verá "Registrado por Criba", la hora de inicio y entrega, y qué error se le fue." | `app/convocar/page.js:76` | DICE MÁS QUE LA FUENTE (abrir no basta: falta que entregue y mande el código) |
| texto_alternativo: «cinco renglones de una entrega inventada […] el mensaje tuvo 5 de 6 verificaciones de texto» | "encontro: [" (tres elementos) · "seLeFue: ['factura emitida a otro RFC']" · "verificacionesMensaje: { cumplidas: 5, total: 6 }" | `lib/demo.js:16-26` | PASA |
| siguiente paso: «ventana de un solo uso (60 minutos) […] cuando entregue, leer la entrega en `/verificar`» | "export const VENTANA_MIN = 60" · "Abra el enlace que viene dentro de la constancia (empieza con" … "/verificar?c=" … "), o escriba el código aquí" | `lib/convocatorias.js:17` · `app/verificar/page.js:32` | PASA |
| nota: «El registro no dice que el dueño abrió una ventana» | "resultado: 'USÓ LO GRATIS'" · "['USÓ LO GRATIS', 'abre solo la primera ventana: mide que sirve, no que vale 490']" | `lib/conversaciones.js:28` y `:43` | DICE MÁS QUE LA FUENTE (el mismo archivo define ese resultado como abrir la primera ventana) |
| nota: «…ni que vio esta pantalla» | "palabras: 'La primera gratis, claro. Los 490, me inclino a que sí, pero depende.'" | `lib/conversaciones.js:29` | PASA |
| nota: «`dentroDeVentana: true`, `lib/demo.js` línea 14» | "dentroDeVentana: true," · `entregó dentro de la ventana de {VENTANA_MIN} minutos · una sola sesión, un solo intento.` | `lib/demo.js:14` · `app/verificar/page.js:38` | PASA |
| nota: «no las revisó un contador titulado» | "Límite declarado: estas reglas fiscales no las revisó un contador titulado." | `lib/demo.js:6` | PASA |

Observaciones que acompañan a un PASA:

- **Evidencia 4.** La cita literal sale de la rama de muestra libre; la rama registrada dice "Su mensaje al cliente cumplió". La misma fila sigue con "Ayuda declarada:", y la entrega inventada trae "asistencia: 'consultó leyes o apuntes'" (`lib/demo.js:27`). El borrador deja fuera ese dato junto a «Escribió».
- **Marcatextos.** «Único» no es palabra del archivo: de las cinco filas de la lista (38–42), solo la 40 lleva clase de color, y solo cuando hay omitidos.
- **Pie 2.** La etiqueta del borrador lo apoya en «una sola sesión, un solo intento», que habla de otra cosa; la cita que lo sostiene es la de `lib/convocatorias.js:2`.
- **Siguiente paso.** `/verificar` pide el código de la constancia; el borrador no lo menciona.
- **Evidencia 3.** `app/Entrega.js:15` sí pinta folio y concepto, y su línea 1 dice "Mismo contenido que /verificar"; en ese renglón no coinciden.
- **Conversación del 2026-11-15.** El registro no trae fecha ni código de una ventana abierta, así que no distingue si «USÓ LO GRATIS» fue un acto o una respuesta. Dejarla fuera de la imagen se sostiene.
- **Reglas fiscales.** Quitar «solo 8.5%» y «menor a $2,000» no saca la regla de la pieza: «estaban mal» y «estaba bien» siguen apoyados en ella.

## Alertas

- **(a) Posesivos que afirman autoría o cercanía: no.** El único posesivo es «su finalista» (línea, pie y texto alternativo), el mismo de la promesa: "usted ve qué facturas marcó su finalista". No aparecen «su cliente», «su trabajo» ni «su mensaje».
- **(b) Dos oraciones que juntas prometen algo que ninguna promete sola: sí, dos casos.**
  1. «Antes de la oferta, usted ve cuál factura se le fue a su finalista.» + «Para verlo con su finalista, abra una ventana de un solo uso desde `/convocar`.» Juntas prometen que abrir la ventana le enseña una factura omitida. Eso depende de que ella entregue, de que mande el código y de que se le haya ido alguna.
  2. «Marcó 3 de las 4 que estaban mal: pago en efectivo…» + «Marcó de más 1 que estaba bien: garrafones de agua, $640 en efectivo.» Juntas enuncian una regla (el efectivo a veces sí se permite) que ninguna dice y que el archivo declara sin revisar: "estas reglas fiscales no las revisó un contador titulado".
- **(c) Cifras sin fuente: no.** 3, 4, 1, 1, $640 y «5 de 6» están en `lib/demo.js:16-26` y `app/verificar/page.js:39`. La etiqueta INVENTADO va una sola vez, en el pie, no junto a cada número.
- **(d) Algo que convierta la entrega en un juicio sobre la persona: no.** «Que estaban mal» y «que estaba bien» califican facturas. El marcatextos sobre «Se le fue 1: factura emitida a otro RFC.» repite lo que hace la pantalla y no lleva adjetivo.
- **(e) Verbos prohibidos del contexto: no.** Los verbos de la pieza son ve, marcó, se le fue, escribió, abra y sale. «Revisé» y «corregir» están dentro de la cita del mensaje inventado. No hay comparación con el periodo de prueba, ni minutos, ni dos finalistas.
