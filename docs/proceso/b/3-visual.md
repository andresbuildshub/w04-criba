## Especificación

- **franja:** banda de Tinta `#0A0A0A` de borde a borde, 72 px de alto, pegada arriba.
  - Izquierda: `CRIBA` en sans negrita, Papel `#F5F0E6`, 26 px.
  - Derecha, misma línea base: `SERIE 2 · «LA PANTALLA, A LA VISTA» · PIEZA B` en mayúsculas, Gris nota `#A3A3A3`, 26 px, espaciado 0.04 em.
  - `CRIBA` lo agregué yo: el borrador no trae el nombre en ningún campo y la imagen reenviada viaja sin su mensaje.

- **línea:** «Antes de la oferta, usted ve cuál factura se le fue a su finalista.» (13 palabras, texto del borrador sin cambios).
  - Sans negrita, Tinta sobre Papel, 64 px, interlineado 72 px, alineada a la izquierda con margen de 72 px.
  - Tres renglones con corte fijo: `Antes de la oferta,` / `usted ve cuál factura` / `se le fue a su finalista.`
  - Es el único texto en sans negrita sobre Papel.

- **bloque de evidencia (renglón por renglón, en el orden en que se lee):**
  - **Cabeza del bloque:** tira de Tinta de 936 × 64 px. A la izquierda `INVENTADO` en sans negrita, Papel, 40 px; a la derecha `FINALISTA DE DEMOSTRACIÓN (NO EXISTE)` en Gris nota, 26 px (literal de `quien` en `lib/demo.js`). Si no caben en una línea, la segunda parte baja dentro de la tira; `INVENTADO` no se achica.
  - **Renglones:** mono, Tinta sobre Papel, 34 px, interlineado 44 px, ancho útil 936 px (unos 45 caracteres por línea). Entre renglones van 20 px con una raya de Tinta al 20 % en medio. Los cortes son fijos:
    1. `Marcó 3 de las 4 que estaban mal:` / `pago en efectivo, consumo en restaurante,` / `activo fijo como gasto.`
    2. `Se le fue 1: factura emitida a otro RFC.` (una sola línea; nunca se parte)
    3. `Marcó de más 1 que estaba bien:` / `garrafones de agua, $640 en efectivo.`
    4. `Mensaje al cliente: 5 de 6 verificaciones` / `de texto (reglas, no IA).`
    5. `Escribió al cliente del ejercicio:` / `«Buenas tardes, don Ernesto. Revisé las` / `facturas de octubre y hay tres que tenemos` / `que corregir. […]»`
  - Son 12 líneas de mono. El renglón de la ventana no entra, como dejó el borrador, así que el Verde ventana `#34D399` no se usa en esta pieza.
  - **Si no cabe:** primero bajan los espacios entre renglones de 20 a 14 px; después la cita del renglón 5 se corta en «Buenas tardes, don Ernesto. […]». La mono no baja de 32 px.

- **qué lleva marcatextos (una sola cosa) y por qué:** el renglón 2 completo, «Se le fue 1: factura emitida a otro RFC.»
  - Franja de Marcatextos `#FCD34D` detrás de la línea, 56 px de alto, que sobresale 16 px a cada lado del texto. El texto va en mono negrita, Tinta.
  - Por qué: es la respuesta a la línea grande («cuál factura se le fue») y es el único renglón que cambia de color en `/verificar` (`text-amber-200`, línea 40).
  - La negrita acompaña al color porque Marcatextos sobre Papel casi no contrasta en luminancia (cerca de 1.3 a 1): si la compresión lava el amarillo, el renglón se sigue distinguiendo.
  - Nada más en la imagen lleva amarillo ni negrita en mono.

- **pie:** banda de Tinta de borde a borde, pegada abajo, unos 240 px de alto, texto de 30 px con interlineado de 40 px y margen de 72 px.
  - Renglón 1, Gris nota: `INVENTADO · Finalista de demostración (no existe). La entrega` / `sale de lib/demo.js; el orden, de la pantalla /verificar.` (`lib/demo.js` y `/verificar` en mono).
  - Renglón 2, Papel, sans regular, 18 px debajo: `Para verlo con su finalista, abra una ventana` / `de un solo uso desde /convocar.` (`/convocar` en mono).
  - El dominio sigue pendiente, como anotó el borrador: va antes de `/convocar` en cuanto exista.

- **formato y tamaño:** PNG de 1080 × 1350 px (4:5), sRGB, fondo Papel sin transparencia, márgenes laterales de 72 px.
  - **Orden vertical aproximado:** franja 0–72, línea 112–328, tira `INVENTADO` 364–428, renglones 448–1056, pie 1092–1350.
  - **Tamaños a 390 px de ancho:** línea 23 px, `INVENTADO` 14 px, mono 12 px, pie 11 px, franja 9 px.
  - **Etiquetas grises solo sobre Tinta:** Gris nota sobre Papel da cerca de 2.2 a 1 y no se lee en chico; sobre Tinta da cerca de 7.8 a 1. Por eso franja, tira y pie son bandas de Tinta.
  - **Tipografía por fijar:** el sitio no declara ninguna (usa las de Tailwind por omisión). El render necesita una sans y una mono fijas. Mis cortes suponen una mono con avance de 0.6 em; es supuesto, no medido, y el código debe medir y aplicar la regla de «si no cabe».
  - **Texto alternativo:** WhatsApp no lo transporta. Sirve donde la imagen se publique en web; dentro del chat la imagen se explica sola.

## Riesgos de lectura

- **En la burbuja de WhatsApp solo sobreviven tres cosas.** La burbuja mide unos 260 px, no 390: la mono queda cerca de 8 px y no se lee. Se leen la línea, la mancha amarilla y `INVENTADO`, que por eso va a 40 px y pegado a la evidencia, no solo en el pie. Si la vista previa recorta arriba y abajo, se pierden la fuente y el siguiente paso. No lo probé en un teléfono, y sin dominio `/convocar` no se puede seguir desde una imagen reenviada.
- **«Su finalista» arriba de una entrega inventada.** Quien lea solo la línea y vea el renglón marcado puede creer que es el resultado de una persona real, o de la suya. La tira `INVENTADO` entre la línea y los renglones es lo único que lo impide. En el renglón 5, «don Ernesto» puede leerse como un cliente real del despacho; lo ancla el «cliente del ejercicio» de la línea anterior, que no debe recortarse.
- **3 + 1 puede sumarse como 4.** «Marcó 3 de las 4» y, dos renglones abajo, «Marcó de más 1» empiezan igual. En chico se puede leer que marcó las cuatro que estaban mal. El renglón marcado queda en medio y lo contradice, pero solo si el amarillo y la negrita sobreviven la compresión; si el renglón 2 se parte en dos líneas, la marca deja de leerse como un solo trazo.
