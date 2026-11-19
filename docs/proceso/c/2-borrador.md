## Borrador

titular: Tres números de Criba, con sus ceros

cuerpo:
La regla del piloto pide que 5 de 20 dueños de despacho digan que sí. Es una regla, no un dato. [hecho 1]
Respuestas reales: 0 de 20 (medido). [hecho 2]
Conversaciones reales de precio: 1 (medido), con el dueño de un despacho contable que entrevistó a 2 finalistas. [hecho 3] Lo que dijo: "Los 490, me inclino a que sí, pero depende." [hecho 4]
Ratio del memo de precio en el caso base: 2.4 a 1 (supuesto). Salvo el sueldo y el precio, ninguna de sus entradas está medida. [hecho 5]
Lo que todavía no está registrado es qué hace un socio de despacho. Comportamiento registrado: cero. [hecho 4]

siguiente_paso: Si usted tiene un despacho, puede opinar en /decision, que dice "Dos minutos, anónimo". [no está en la ficha: `app/decision/page.js`, línea 43]

## Siguiente paso
Opinar en /decision. La página dice "Dos minutos, anónimo: no pedimos nombre, correo ni teléfono."

---
Notas para el siguiente rol:
- **Respuestas: 0 de 20.** Ese número viene de una nota sin fecha en `lib/precios.js`. Por eso el cuerpo no dice "hoy". Antes de publicar, alguien tiene que abrir `/tablero` en producción y copiar el número que muestra.
- **"Dos minutos".** Lo comprobé yo leyendo `app/decision/page.js`; no viene de la ficha. Hay que agregarlo a la ficha como hecho 6 o cortar la cita.
- **Riesgo de voz en `/decision`.** La página usa las palabras "preseleccionar" y "constancia ... cuáles de los 4 errores encontró". Una pieza que manda al socio a esa página podría chocar con la promesa de la semana 15. Lo marco aquí y no lo cambio.
- **Tamaño.** Unas 95 palabras sin contar las citas entre corchetes. Pasa el chequeo: una sola idea, titular de 6 palabras, de usted, ningún verbo prohibido y hay siguiente paso.
