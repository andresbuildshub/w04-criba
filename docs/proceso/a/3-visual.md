## Especificación

- **franja:** una línea arriba del titular, sobre el fondo Tinta `#0A0A0A` de la página: `SERIE 1 · «LEA UNA ENTREGA» · PIEZA A`.
  - Sans, mayúsculas, Gris nota `#A3A3A3`, 12 px, espaciado 0.08 em.
  - Hoy `app/lectura/Lectura.js:18` la pinta en `text-amber-300`, que es el Marcatextos `#FCD34D`. Pasa a Gris nota para que el amarillo quede en una sola cosa.
  - No agrego `CRIBA`: la barra del sitio ya lo trae arriba.

- **línea:** «Lea la entrega de una finalista inventada y elija qué le preguntaría» (12 palabras, texto del borrador sin cambios).
  - Sans negrita, Papel `#F5F0E6` sobre Tinta, 30 px, interlineado 36 px, corte libre y balanceado.
  - Espacio de no separación entre «finalista» e «inventada».
  - **Entrada**, debajo: sans regular, 16 px, interlineado 24 px, Papel al 80 %.
  - Las etiquetas `INVENTADO` y `SUPUESTO` de la entrada van en Gris nota, mayúsculas, 11 px. `SUPUESTO` va pegada a «unos dos minutos» con espacio de no separación.
  - La razón del supuesto nombra «la ficha», que el socio no puede abrir. No la toco: queda para los roles 4 a 6.

- **bloque de evidencia (renglón por renglón, en el orden en que se lee):** un solo bloque de Papel con esquinas de 16 px y relleno de 16 px.
  - **Texto:** mono, Tinta, 14 px, interlineado 22 px, 12 px entre renglones. A 390 px quedan 326 px útiles, unos 38 caracteres por línea.
  - **Cabeza:** tira de Tinta de lado a lado del papel, con `position: sticky; top: 0` dentro del bloque.
    - `INVENTADO` en sans negrita, Papel, 16 px.
    - Debajo, `FINALISTA DE DEMOSTRACIÓN (NO EXISTE)` en Gris nota, 11 px (literal de `quien`, `lib/demo.js:11`).
    - La tira acompaña toda la lectura del bloque, que mide unos 950 px (estimado, no medido).
  - **Renglones:**
    1. `Cliente del ejercicio: Papelería La Esquina, S.A. de C.V. · octubre 2026`
    2. `Entregó dentro de la ventana, en una sola sesión.` Sin la cifra de 60: junto a «Entregó», en mono, se lee como tiempo de ella.
    3. `Marcó y sí estaba mal: 3 de 4`, y debajo tres líneas con raya y sangría colgante:
       - `– gasto pagado en efectivo que no se deduce así`
       - `– consumo en restaurante al 100% (solo 8.5%)`
       - `– inversión (activo fijo) registrada como gasto`
    4. `Se le fue: factura emitida a otro RFC` (37 caracteres). El único corte permitido es después de `Se le fue:`.
    5. `Marcó de más (estaba bien): DM-0412, Garrafones de agua, $640 en efectivo`. Línea siguiente, misma mono: `Estaba bien clasificada: menor a $2,000, el efectivo se permite.`
    6. `Lo que le escribió al cliente del ejercicio (tal cual):` y debajo el mensaje completo de `lib/demo.js:28`, entre « », con filete izquierdo de 4 px en Tinta al 40 %. Va abierto, en mono y sin recortes.
    7. `Ayuda declarada: consultó leyes o apuntes` (etiqueta literal de `app/verificar/page.js:42`), al mismo tamaño que los demás.
  - **No se separan:** `DM-0412`, `$640`, `$2,000`, `8.5%`, `3 de 4`, `otro RFC`.
  - **No entran:** «Pasó la regla», «5 de 6 verificaciones» y «Encontró». Las dos primeras se leen como calificación; la tercera no está entre los verbos permitidos.
  - **Cambios contra `app/Entrega.js`:**
    - Línea 9 dice «Registrado por Criba» sobre una entrega que nadie registró. La quito; la decisión final es del rol 4.
    - La `nota` de los garrafones hoy no se pinta, y la opción 2 se apoya en ella.
    - El mensaje pasa de sans a mono, porque es dato del ejercicio.
  - **`autoria`:** va pegada debajo del papel, antes de la pregunta, en sans regular de 14 px, Papel al 80 % sobre Tinta. Hoy `Lectura.js` no pinta ese campo.
  - **Opciones (tres tarjetas sobre Tinta, borde de 1 px en Gris nota al 40 %, alto mínimo de 48 px, radio de 20 px):**
    - Línea 1: `INVENTADO ·` en Gris nota de 11 px y, en mono de 13 px color Papel, el renglón del bloque en que se apoya, copiado literal. Opción 1: renglón 4, sin amarillo. Opción 2: renglón 5 con su nota. Opción 3: «¿Me confirma para hacer los ajustes antes del cierre?».
    - Línea 2: la pregunta entre « », sans regular de 16 px.
    - Al terminar, el eco muestra solo la línea 2. Hoy `opciones[i]` es una sola cadena y repetiría todo.
    - Seleccionada: borde de 2 px en Papel. El botón «Terminar» va en fondo Papel con texto Tinta. Hoy ambos usan el amarillo.

- **qué lleva marcatextos (una sola cosa) y por qué:** el renglón 4 completo, «Se le fue: factura emitida a otro RFC».
  - Fondo Marcatextos `#FCD34D` con 4 px a cada lado, texto en mono negrita Tinta.
  - Si se parte, el fondo cubre las dos líneas como un solo trazo (`box-decoration-break: clone`).
  - Por qué: es lo que la pantalla real manda explicar en la llamada («pídale que explique en voz alta justo esa factura», `app/verificar/page.js:45`) y es el único renglón que cambia de color en `/verificar` (línea 40).
  - Es la única negrita en mono. Nada más en la página lleva amarillo.

- **pie:** al final de la columna, sobre Tinta.
  - **Etiqueta y fuente (siempre visibles, Gris nota, 12 px):**
    - `INVENTADO · Finalista de demostración (no existe). La entrega sale de lib/demo.js; el orden, de la pantalla /verificar.`
    - Segunda línea: `Estas reglas fiscales no las revisó un contador titulado.` Es literal de `lib/demo.js:6`, pero entra en este rol y debe pasar por el rol 4.
  - **Siguiente paso:** aparece al terminar, como hoy. Es el primer botón de `app/Pasos.js`, hacia `/convocar`, y es lo único en Verde ventana `#34D399`.
  - La caja de «Su pregunta para la llamada» cambia su borde verde por Gris nota.

- **formato y tamaño:** página web `/lectura`, una columna, fondo Tinta, sin imágenes.
  - Diseñada a 390 px: 358 px de columna, 326 px dentro del papel. En escritorio conserva `max-w-2xl`.
  - Tamaños reales a 390 px: titular 30, entrada y preguntas 16, mono 14, etiquetas 11 a 12. `INVENTADO` de la cabeza va a 16 en negrita.
  - Gris nota solo sobre Tinta: sobre Papel no se lee en chico. Dentro del papel las etiquetas van en la tira de Tinta.
  - Tipografía por fijar: el sitio no declara ninguna. Los 38 caracteres suponen una mono con avance de 0.6 em; es supuesto, no medido.
  - Una sola entrega en pantalla y ningún número de minutos dentro del papel.

## Riesgos de lectura

- **La vista previa de WhatsApp no es de esta pieza.**
  - `app/lectura/page.js:10` manda la imagen de la Pieza B, de otra serie, cuya línea dice «su finalista». No sé cómo la recorta WhatsApp ni si la tira `INVENTADO` sobrevive el recorte; no lo probé en un teléfono.
  - El título de la pestaña dice «(2 minutos)» sin etiqueta de supuesto.
  - Lo único seguro en la vista previa es el titular («finalista inventada») y la descripción («Datos inventados.»).
- **La primera pantalla a 390 px se va en navegación.**
  - La barra del sitio trae 13 enlaces que se doblan en unas cuatro filas (estimado), más un emoji en la marca.
  - El papel empieza abajo y el renglón amarillo puede quedar fuera de la primera pantalla.
  - Si la tira fija no se implementa, el mensaje a «don Ernesto» y las opciones se leen sin `INVENTADO` a la vista, como caso real.
- **Los números se pueden leer como tiempo de ella o como calificación.**
  - «Unos dos minutos» es tiempo de lectura del socio. Si `SUPUESTO` cae a otra línea, la cifra queda suelta.
  - Al terminar, `app/Pasos.js` dice «Dos minutos.» dos veces, sin etiqueta.
  - «3 de 4» se lee como nota de examen. Lo contrapesa el renglón amarillo inmediatamente debajo, y solo si no se parte en dos trazos.
