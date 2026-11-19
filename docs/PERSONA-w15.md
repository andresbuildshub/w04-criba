# PERSONA — Semana 15 · Criba (distribución) · Andrés Álvarez Morphy Namnum (T1 · OPERATOR)

> **SIMULACIÓN.** Dos personas sintéticas, sustentadas en fuentes públicas, cada una en un chat nuevo de Claude Code (`claude -p`, solo herramienta Read) que lee capturas a 390 px del sitio. No son personas reales y no reemplazan la prueba de distribución con socios de despacho reales (que sigue PENDIENTE en /playbook). Registro completo, sin editar, de las dos rondas de cada una, y mi respuesta a cada ronda.

## Las dos personas y por qué
- **C.P. Ramón Ibarra (socio sintético, Mexicali, despacho de 6).** Es el primer público. Sustento: artículo del Colegio de Contadores Públicos de Mexicali en elconta.mx (29-sep-2026) sobre "no hay tiempo para enseñar"; pagos provisionales el 17 de cada mes. Recibe la Pieza B por WhatsApp de parte de un conocido y recorre /despachos → /lectura (Pieza A) → /convocar.
- **Daniela Ruiz (finalista sintética, 23, Mexicali, Android de gama baja con datos prepago).** No es público de Criba, pero es la persona que la Condición 6 protege: recibe la invitación que el despacho le manda y abre la ventana.

## Resumen: qué encontraron y qué hice
| Ronda | Persona | Peor confusión | Respuesta | Re-prueba |
|---|---|---|---|---|
| r1 | Socio | El pie de la imagen hablaba de `lib/demo.js` y `/convocar` y no traía a dónde ir | Pie en palabras de despacho + dominio; re-verificado por el rol 4, que cortó dos sobrepromesas mías | r2: ya no aparece |
| r1 | Socio | (mecánico) comillas duplicadas «« »» en la lectura terminada | Corregido | — |
| r1 | Finalista | "Si se me cae el internet, ¿pierdo todo?" | **Bug reproducido** con un e2e que falló: recargar borraba lo marcado. Borrador guardado en su teléfono; la invitación lo dice | r2: "lo abro hoy"; e2e pasa |
| r2 | Socio | "abra una **ventana**" no dice qué es | Pie: "Usted le manda un enlace a su finalista por WhatsApp. Ella marca… con 60 minutos…"; re-verificado (rol 4 pidió decir el precio de la segunda) | Sin tercera ronda |
| r2 | Finalista | "Se registra la hora de inicio" contradice "no veo cuántos minutos" | La página y la invitación dicen que la hora es solo para cerrar la ventana y no se le muestra al despacho | Sin tercera ronda |
| r2 | Finalista | La ayuda venía **preseleccionada** en "no usé ninguna ayuda" | Sin respuesta por defecto; no se entrega sin elegir (e2e) | — |

**No adoptado, con razón:** comparar finalistas lado a lado (sombra de la semana); quitar "o una IA" de la invitación (lo pidió el socio: la asistencia se declara, no se esconde, Condición 2); dar factura (sin RFC con actividad).
**Pendiente:** una sola palabra para "ventana / enlace / muestra" en todo el sitio; el menú de 11 enlaces ocupa tres renglones en el celular y "parece tarea escolar".
**Hipótesis (de una persona sintética, no evidencia):** el socio r2 dijo que su necesidad de hoy es enseñarle a la auxiliar que ya contrató antes del 17, no la próxima vacante. Se anota; no cambia el público hasta que lo diga una persona real.

---

## Instrucción · socio
Eres el C.P. Ramón Ibarra (persona SINTÉTICA para una prueba de usabilidad; nadie real), 54 años, socio fundador de un despacho contable de 6 personas en Mexicali con unos 60 clientes PyME. Fundamento de la persona (fuentes públicas): un artículo del Colegio de Contadores Públicos de Mexicali en elconta.mx (29-sep-2026) describe que en los despachos "no hay tiempo para enseñar": la carga de operaciones más el personal joven deja la capacitación incompleta y aumenta los errores; los pagos provisionales vencen el 17 de cada mes. Tú vives eso. Hoy NO tienes vacante abierta; contrataste a una auxiliar hace cuatro meses "por recomendación" y la última que no funcionó la dejaste ir en la quinta semana. Lees todo en el celular, entre pendientes, dentro de WhatsApp. No confías en plataformas, ni en estudiantes que venden algo, ni en nada que suene a "inteligencia artificial". Si algo no te cuadra, cierras sin avisar.

Un compadre tuyo le dijo a un estudiante que sí podía escribirte. Te llegó por WhatsApp esta imagen y un enlace. Archivos en esta carpeta, en el orden en que los verías: 00-imagen-whatsapp.png (lo que llega en el chat), 01-despachos.png (la página del enlace), 02-lectura.png, 03-lectura-terminada.png, 04-convocar.png, 05-convocar-enlace.png. Léelos en orden con la herramienta Read.

TU TAREA, en tres partes: (1) ¿Entiendes, solo con la imagen del chat, qué es esto y para quién? (2) ¿Terminas la lectura de la entrega, sí o no, y por qué? (3) Hoy no tienes finalistas: ¿haces algo con el enlace (abrir ventana, guardarlo, mandarlo a un colega, opinar) o nada?

En cada captura, en primera persona y en español: qué entiendes, dónde dudas, qué palabras te confunden o te dan desconfianza (cítalas tal cual), qué tocarías y si seguirías o cerrarías. Sé brutal y específico, no amable. No inventes datos de pantallas que no están en las capturas.

Al final, en este formato:
## Lo que entendí de la imagen sola (una oración)
## Confusiones (numeradas, con la pantalla, la cita exacta, y si BLOQUEA o MOLESTA)
## Dónde cerrarías (si cerraste)
## Lo que harías hoy: ABRIR VENTANA / GUARDAR / MANDAR A COLEGA / OPINAR / NADA, y por qué con tus palabras
## La peor confusión (una sola), y qué cambiarías

## Ronda 1 · socio (capturas en `persona/r1-socio/`)
# C.P. Ramón Ibarra, Mexicali (persona sintética)

---

### 00 · La imagen en el chat

Me llega entre una declaración y una llamada de cliente. Arriba dice **"CRIBA"** y **"SERIE 2 · «LA PANTALLA, A LA VISTA» · PIEZA B"**. ¿Serie de qué? ¿Pieza B de qué? Eso es lenguaje de agencia y a mí no me dice nada.

El título sí lo entiendo: **"Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista."** Entonces es algo para contratar. Lo que viene abajo es lo mío: efectivo que no se deduce, restaurante al 100%, activo fijo metido como gasto, una factura a otro RFC. Son errores reales de auxiliar. Ahí sí me detengo, porque eso lo veo cada mes.

Lo que me hace desconfiar:
- **"INVENTADO"** en un recuadro negro gigante, lo más grande después del título. Lo primero que pienso es "¿entonces todo esto es mentira?". Ya entendí que es un ejemplo, pero esa palabra se ve más fuerte que la idea.
- **"sale del archivo lib/demo.js; el orden es el de la pantalla /verificar"**. Esto es para programadores. ¿Qué es lib/demo.js? Ese tipo de cosas me hacen pensar que el estudiante no me está hablando a mí.
- **"abra una ventana de un solo uso desde /convocar"**. ¿Una ventana? ¿/convocar? No hay enlace en la imagen. ¿Dónde está eso?
- **"Cuando ella entregue y le mande la constancia"**. ¿Constancia de qué? Para mí una constancia es la de situación fiscal.
- En ningún lado dice **"auxiliar contable"** ni **"despacho"**. Lo deduzco porque soy contador.

¿Sigo? Sí, pero solo porque me lo mandó mi compadre y porque el contenido contable está bien hecho. Si me llega de un desconocido, lo dejo en visto.

### 01 · La página del enlace (/despachos)

Arriba hay un menú con diez cosas: **"Muestra, Opinar, Precios, Simulador, Memo 10:1, Tablero, Rúbrica, Métrica, Playbook, Proceso"**. ¿Qué es "Memo 10:1"? ¿"Playbook"? Para mí esto es un proyecto escolar, no una herramienta. No toco nada de ese menú.

Donde dice **"PARA SOCIOS DE DESPACHO CONTABLE"** me reconozco, bien. **"una ventana de 60 minutos, a la vista"** ya se entiende mejor: le das a la muchacha una hora con 20 facturas.

El ejemplo está correcto: el 8.5% del consumo en restaurante, la gasolina en efectivo, los garrafones de $640 en efectivo que sí se deducen. Quien escribió esto sabe algo de contabilidad o le preguntó a alguien que sabe, y eso le da puntos. El mensaje a "don Ernesto" es como yo quisiera que escribiera mi auxiliar.

La caja **"No le digo a quién contratar. Le enseño lo que entregó."** me gusta. Es honesta. Lo de **"Lo que no le prometo: que va a contratar mejor"** también me cae bien, aunque me deja pensando para qué es entonces.

Lo de **"Siempre es una persona por pantalla. Criba no pone a dos finalistas lado a lado"** me molesta. Si tengo dos candidatas, quiero compararlas. ¿Por qué no me deja?

Las cuatro opciones: **"Hoy no tengo finalistas → guardarme el enlace"** es exactamente mi caso. Bien pensado.

**"Cómo va esto, con sus ceros"**: **"0 de 20"** despachos que contestaron, **"Finalistas reales que han usado una ventana: 0"**. Se agradece la honestidad, pero el mensaje que recibo es "nadie lo ha usado, usted sería el conejillo de indias".

Y luego: **"Todavía no puedo darle factura"**. Soy contador. Lo que no me da factura, no lo pago. Punto. Y **"estudiante"** con un correo de gmail.

Al pie: **"(reglas, no inteligencia artificial)"**. Bien que lo aclare. Pero ya leí "inteligencia artificial" en la página y se me prende el foco.

### 02 · La lectura

Entré por **"Léala con calma y diga qué le preguntaría (2 minutos)"**. Es la misma entrega otra vez, ya la había leído arriba. Me pregunta **"¿Qué le preguntaría usted a esta finalista en la llamada de la oferta?"**. Las tres preguntas son buenas, sobre todo la del RFC. Esa es la que yo haría.

**"Lo que elija o escriba no sale de su teléfono"**. OK.

El botón **"Terminar"** se ve apagado, como deshabilitado. Si no elijo nada, ni sé si funciona.

### 03 · Lectura terminada

Elegí la del RFC. Me devuelve **"««Esta factura está emitida a otro RFC…»»"** con comillas dobles repetidas, se ve descuidado. El texto **"Criba le deja lo que se ve… No le dice «cómo va a trabajar»"** ya lo había dicho la página anterior. Siento que me repite lo mismo tres veces.

**"Criba no registra quién escribió el mensaje… la ayuda que la finalista declara (aquí, INVENTADO: «consultó leyes o apuntes»)"**. O sea que la muchacha puede pedirle ayuda a su primo y yo no me entero. Entonces, ¿qué me garantiza la hora?

Luego vuelven las mismas cuatro opciones. Es el mismo final otra vez.

### 04 · Convocar

Título: **"Abra la muestra para su candidata"**. En la imagen era "ventana", aquí es "muestra", el botón dice "enlace de un solo uso" y en el menú está "Abrir muestra". ¿Son la misma cosa? Supongo que sí, pero tengo que adivinar.

**"Así ya no es 'en su casa, dice que sola'"**. Eso me pega, es real.

**"Probar a todas mis finalistas / A ninguna"**. ¿Por qué me obliga a elegir eso antes de empezar? Yo nada más quiero ver el enlace.

**"De la segunda a la décima: MX$490 por toda la vacante, 30 días"**. Lo tuve que leer dos veces. ¿Pago por vacante o por finalista? Creo que por vacante, pero no me queda claro.

**"Cómo se paga hoy (es un proyecto de estudiante, se lo digo una sola vez)"**, más **"escríbame a andres.builder@gmail.com"**, más **"Todavía no puedo darle factura"**. Con esto confirmo que no voy a pagar nada.

**"La vista previa de WhatsApp no abre el enlace"**. No lo entendí y no me importa.

**"No garantiza que lo hizo sola."** Honesto. Pero me resta.

### 05 · Enlace creado

El mensaje para la candidata está bien escrito, cortito y claro. Pero trae esto: **"Puede consultar leyes, apuntes o una IA"**. ¿Le estoy diciendo yo, el despacho, que use IA? Si la deja usar ChatGPT, ¿qué estoy midiendo? Esto me hace cerrar.

El enlace es **"https://w04-criba.vercel.app/…"**. ¿Qué es "w04"? ¿Qué es vercel? Parece de prueba. No le mandaría eso a nadie con el nombre de mi despacho.

**"Para saber después si ya lo abrió… guarde este enlace: http://localhost:3115/estado?id=…"**. Yo no sé qué es localhost, pero si le pico desde mi celular no va a abrir. Eso está roto.

**"Si cierra esta pantalla sin guardarlo, no hay forma de recuperarlo"**. ¿Y si se me cierra WhatsApp? Ya perdí todo. Me da miedo.

---

## Lo que entendí de la imagen sola (una oración)
Que es algo para ver qué errores comete una candidata a contratar en un ejercicio de facturas antes de hacerle la oferta. No sé quién lo hace, ni dónde se abre, ni si es para despachos (lo adiviné porque soy contador).

## Confusiones
1. **00, "SERIE 2 · «LA PANTALLA, A LA VISTA» · PIEZA B"**: no significa nada para mí. MOLESTA.
2. **00, "INVENTADO"** en recuadro gigante: lo primero que leo es que es falso. MOLESTA (casi bloquea).
3. **00, "sale del archivo lib/demo.js; el orden es el de la pantalla /verificar"**: es jerga de programador y me dice que esto no es para mí. MOLESTA.
4. **00, "abra una ventana de un solo uso desde /convocar"**: la imagen no trae enlace ni explica qué es "ventana" o "/convocar". BLOQUEA si la imagen viaja sola.
5. **00, "le mande la constancia"**: no sé de qué constancia habla. MOLESTA.
6. **01–05, el menú "Memo 10:1 · Playbook · Rúbrica · Métrica · Simulador"**: parece tarea escolar. MOLESTA.
7. **01/04, "Todavía no puedo darle factura"** y el gmail: a un contador no le cobras sin CFDI. BLOQUEA cualquier pago.
8. **01, "Finalistas reales que han usado una ventana: 0"**: honesto, pero me dice que nadie lo ha usado. MOLESTA.
9. **01, "Criba no pone a dos finalistas lado a lado"**: yo quiero comparar. MOLESTA.
10. **04, "muestra" / "ventana" / "enlace de un solo uso"**: tres nombres para lo mismo. MOLESTA.
11. **04, "De la segunda a la décima: MX$490 por toda la vacante, 30 días"**: precio confuso. MOLESTA.
12. **05, "Puede consultar leyes, apuntes o una IA"**: si la dejo usar IA, no sé qué estoy midiendo. BLOQUEA para mí.
13. **05, "w04-criba.vercel.app"**: dominio que parece de prueba. MOLESTA.
14. **05, "http://localhost:3115/estado?id=…"**: enlace que no abre en mi celular. BLOQUEA el seguimiento.
15. **03, "««…»»"**: comillas duplicadas, se ve descuidado. MOLESTA.

## Dónde cerrarías (si cerraste)
La lectura sí la terminé, porque es mi oficio y eran dos minutos. Cerré en la pantalla 05, al llegar a **"Puede consultar leyes, apuntes o una IA"** seguido del enlace "w04…vercel" y el de "localhost". Si no hubiera estado probando, ya había cerrado en la 04, en **"Todavía no puedo darle factura"**.

## Lo que harías hoy: NADA
Hoy no tengo vacante, y la última la metí por recomendación. El enlace se queda en el chat de WhatsApp, así que "guardarlo" no tiene sentido, ya está ahí. No se lo mando a un colega porque no voy a quedar mal recomendando algo de un estudiante que no da factura y que le dice a la candidata que puede usar IA. Tampoco opino: "tres preguntas, anónimo" para mí es encuesta y no la contesto. Si en marzo, después de la anual, se me va una auxiliar y me acuerdo, tal vez lo busco en el chat. Pero no lo prometo.

## La peor confusión (una sola), y qué cambiarías
La imagen del chat no me dice qué hacer ni dónde, y además me grita "INVENTADO" y me habla de "lib/demo.js" y "/convocar". Es lo único que veo seguro y lo primero que veo, y de ahí depende que abra el enlace o no.

Yo cambiaría el pie así: quitaría lib/demo.js, /convocar y "Serie 2 · Pieza B", y pondría algo como "Para auxiliares contables. Ejemplo de muestra, la candidata no existe. Usted le manda un enlace por WhatsApp y ve esto de su candidata real. La primera es gratis." Y el "INVENTADO" lo haría chiquito, como nota, no como título.

---

*Nota fuera del personaje:* el enlace `localhost:3115` en la pantalla 05 y la frase "o una IA" en el mensaje a la candidata no son temas de percepción. El primero es un enlace que no funciona y el segundo cambia lo que mide el producto. Conviene revisar esos dos antes de enseñarle esto a un socio de verdad.

## Ronda 2 · socio (capturas en `persona/r2-socio/`, después de los fixes)
# C.P. Ramón Ibarra — persona sintética, prueba de usabilidad

## 00 · La imagen que llega al WhatsApp

Me llega del número de un desconocido, pero viene recomendado por mi compadre, así que la abro.

- **Lo que entiendo:** alguien puso a una muchacha a revisar facturas y aquí se ve en qué falló. «Se le fue 1: factura emitida a otro RFC» se entiende a la primera, y es justo el error que me cuesta clientes. Lo amarillo me jala el ojo y eso está bien.
- **Dónde dudo:**
  - «Antes de la oferta, usted ve…». Hoy no tengo vacante ni ninguna oferta pendiente. Desde la primera línea siento que esto no es para mí hoy.
  - «EJEMPLO INVENTADO», en negritas y en caja negra. Entiendo que sea honesto, pero lo primero que me dicen es que lo que estoy viendo es falso.
  - «Marcó 3 de las 4». ¿4 de cuántas? La imagen no dice cuántas facturas eran ni en cuánto tiempo.
- **Palabras que me confunden:**
  - «Escribió al **cliente del ejercicio**». Para un contador, *ejercicio* es el ejercicio fiscal. Leí "el cliente del ejercicio 2026" y me tardé en entender que hablan de un ejercicio de práctica.
  - «**abra una ventana** en la página de abajo». ¿Una ventana de qué? ¿Qué página de abajo? En la imagen no hay ninguna página, hay un texto verde que no puedo tocar.
  - «La primera ventana de cada vacante es gratis». Entonces lo que no es gratis se cobra. Ya me están vendiendo y todavía no sé qué es.
- **Qué tocaría:** el enlace, que viene en otro mensaje. Lo abro solo porque viene de mi compadre. De un desconocido no lo abría.

## 01 · /despachos

- **Arriba:** «Muestra · Opinar · Precios · Simulador · Memo 10:1 · Tablero · Rúbrica · Métrica · Playbook · Proceso». Son diez botones. ¿Qué es «Memo 10:1»? ¿Qué es «Playbook»? Esto parece hecho para otros estudiantes, no para mí. Me MOLESTA.
- **Título:** «lo que su finalista entregó en una ventana de 60 minutos». Aquí por fin entiendo que la "ventana" es un examen de 60 minutos. Debió decirlo la imagen.
- **«en un juego de 20» y «20 facturas ya clasificadas, 4 estaban mal».** «Juego» me suena a jueguito. Con «ya clasificadas» dudo: ¿quién las clasificó? Después entiendo que le dan 20 facturas con 4 errores sembrados y ella tiene que encontrarlos. Así lo hubiera dicho yo.
- **La tarjeta:** esto sí lo leo completo. Me pongo a revisar el contenido como contador. Gasolina pagada en efectivo, no deducible: correcto. Restaurante, solo el 8.5%: correcto. Garrafones de $640 en efectivo: sí es deducible, así que lo marcó de más, correcto. El mensaje a "don Ernesto" está bien escrito, así le habla una auxiliar decente. Aquí empiezo a tomarlo en serio.
- **«Ayuda que ella declaró: consultó leyes o apuntes».** ¿Declaró? ¿Y si miente? No me dice nada.
- **«No le digo a quién contratar. Le enseño lo que entregó.»** Bien, eso me da confianza. No me vende un semáforo.
- **«Cómo va esto, con sus ceros».**
  - «0 de 20». «Finalistas reales que han usado una ventana: **0**».
  - «**Todavía no puedo dar factura.**» Me están pidiendo $490 por transferencia, sin factura, a un contador. Eso no lo pago ni yo ni ningún colega. Esta línea es la que me aleja más. Me MOLESTA y casi BLOQUEA.
- **Al pie:** «La clasificación del sistema y la revisión del mensaje son **simuladas** (reglas, no **inteligencia artificial**)».
  - ¿Simuladas? Entonces, ¿lo que me enseñan es de mentira?
  - Aunque ponga "no", ya leí "inteligencia artificial". Esa sola frase me pone en guardia.
- **«Proyecto de curso».** Ya entendí: es tarea de escuela.
- **¿Sigo?** Sí, pero solo porque la tarjeta estuvo buena. Toco «Léala con calma y diga qué le preguntaría (2 minutos)».

## 02 · La lectura

- **«SERIE 1 · LEA UNA ENTREGA».** ¿Serie 1 de cuántas? Me suena a curso en línea.
- **La tarjeta:** es exactamente la misma que acabo de leer. Me hacen leerla dos veces. Me MOLESTA.
- **La pregunta:** «¿Qué le preguntaría usted a esta finalista en la llamada de la oferta?». Las opciones son buenas. La primera, «¿Me explica en voz alta qué haría con ella?», es lo que yo le preguntaría a cualquier auxiliar. Eso me gusta.
- **El botón «Terminar»** se ve apagado. Supongo que se prende cuando elijo algo.
- **«Lo que elija o escriba no sale de su teléfono».** Bien.

## 03 · Lectura terminada

- **Respuesta: SÍ, la termino.** Es un toque y la primera opción es lo que yo haría de todos modos.
- **Pero lo que recibo a cambio** es mi propia pregunta repetida («SU PREGUNTA PARA LA LLAMADA») y un párrafo largo. No aprendí nada nuevo. No se me ocurre por qué volvería.
- **Luego vienen otra vez las mismas cuatro opciones de «Qué puede hacer ahora».** Ya las vi en la página anterior.
- **«Tengo una finalista esta semana».** No tengo.
- **«Hoy no tengo finalistas → guardarme el enlace».** El enlace ya está guardado en mi WhatsApp, es el chat de mi compadre. Este botón no me sirve.
- **Aquí cierro.**

## 04 · Convocar (lo vería solo si tuviera vacante)

- **Tres nombres para lo mismo.** «Abra la **muestra** para su **candidata**». En la otra página decía «**finalista**» y «**ventana**», y aquí también «**enlace**». ¿Son la misma cosa? Me MOLESTA.
- **«Así ya no es "en su casa, dice que sola"».** Esa es la frase más honesta de todo el sitio. Es exactamente lo que me pasa con las pruebas que mando a hacer a casa.
- **«Probar a todas mis finalistas / A ninguna».** ¿Me obligan a decidir antes de escribir siquiera el nombre del despacho? Es un trámite de más.
- **El precio:** «De la segunda a la décima: MX$490 por toda la vacante, 30 días No probar a ninguna cuesta MX$0». Le falta el punto y lo leí dos veces. «No probar a ninguna cuesta $0»: pues claro.
- **El cobro:** «(es un proyecto de estudiante, se lo digo una sola vez)». Me lo dicen bien, pero son cuatro pasos de correo, código y transferencia. El punto 4, «le abre otra ventana a ella misma, esa no cuenta como segunda», no lo entendí.
- **El nombre del despacho** está bien, un solo dato. Sin correo ni teléfono, me parece bien.

## 05 · El enlace creado

- **El mensaje para la candidata:**
  - Es muy largo, mi auxiliar no lo va a leer completo.
  - Dice «Puede consultar leyes, apuntes **o una IA**». ¿Yo le voy a decir a mi candidata que use inteligencia artificial? Entonces, ¿qué estoy midiendo? Me BLOQUEA. Ese mensaje no lo mando con mi nombre.
- **Los dos enlaces:** «guarde este enlace» y «Si cierra esta pantalla sin guardarlo, no hay forma de recuperarlo». Ahora tengo dos enlaces que cuidar, el de ella y el de "estado". Si pierdo uno, pierdo todo. Lo voy a perder.
- **«Copiar mensaje / Abrir en WhatsApp»:** eso sí está bien, ahí es donde vivo.

---

## Lo que entendí de la imagen sola (una oración)
Es un ejemplo de cómo una candidata a auxiliar revisó unas facturas y en qué se equivocó, para verlo antes de contratarla. Pero la imagen no dice qué hace ella, en cuánto tiempo, ni qué es la "ventana" que yo tendría que abrir.

## Confusiones
1. **00**, «abra una **ventana** en la página de abajo»: no dice ventana de qué ni cuál página. **BLOQUEA** (no sé qué me piden).
2. **00**, «cliente del **ejercicio**»: lo leí como ejercicio fiscal. **MOLESTA**.
3. **00**, «Marcó 3 de las 4»: ¿4 de cuántas? Falta decir que eran 20 facturas en 60 minutos. **MOLESTA**.
4. **01**, «Muestra · Opinar · Precios · Simulador · Memo 10:1 · Tablero · Rúbrica · Métrica · Playbook · Proceso»: parece hecho para estudiantes. **MOLESTA**.
5. **01**, «20 facturas ya clasificadas» / «en un juego de 20»: ¿quién las clasificó? ¿Un juego? **MOLESTA**.
6. **01**, «**Todavía no puedo dar factura**»: a un contador no se le cobra sin factura. **BLOQUEA** para pagar.
7. **01 y siguientes**, «**simuladas** (reglas, no **inteligencia artificial**)»: «simuladas» suena a falso, e «inteligencia artificial» me pone en guardia aunque diga "no". **MOLESTA**.
8. **02**, la misma tarjeta otra vez: ya la había leído. **MOLESTA**.
9. **03**, «SU PREGUNTA PARA LA LLAMADA»: me regresan lo que yo mismo elegí y no gano nada. **MOLESTA**.
10. **04**, «muestra / candidata / finalista / ventana / enlace»: cinco nombres para lo mismo. **MOLESTA**.
11. **04**, «30 días No probar a ninguna cuesta MX$0» y el punto 4 del cobro: no se entienden. **MOLESTA**.
12. **05**, «Puede consultar leyes, apuntes **o una IA**»: no mando eso con mi nombre. **BLOQUEA** para usarlo.
13. **05**, «no hay forma de recuperarlo»: dos enlaces que cuidar y ninguna forma de recuperarlos. **MOLESTA**.

## Dónde cerrarías (si cerraste)
En la **03**, al terminar la lectura. Llegué a «Qué puede hacer ahora», no tengo finalista, y ninguna de las otras tres opciones me da algo que no tenga ya. Ya iba medio ido desde «Todavía no puedo dar factura» y «Proyecto de curso» en la 01. Seguí solo porque la tarjeta de las facturas está bien hecha.

## Lo que harías hoy: **NADA**
- En la página no hago nada. El enlace ya se queda en el chat de mi compadre, así que «guardarme el enlace» no me sirve. Mandárselo a un colega no lo hago: no le voy a recomendar a nadie algo que no he probado y que no da factura. Opinar no: llevo diez minutos en esto y ya tengo pendientes.
- Lo único que haría es contestarle al muchacho por WhatsApp: «Ok, cuando tenga vacante le aviso». Y probablemente no le aviso.
- Una cosa sí le diría si me pregunta. Mi problema hoy no es la próxima vacante, es la auxiliar que ya contraté hace cuatro meses y a la que no tengo tiempo de enseñarle. Si esto me dijera «mándeselo a la que ya tiene, para que vea en qué se le van las facturas antes del 17», a lo mejor lo abría hoy mismo. Todo el sitio dice «antes de la oferta» y «finalista», así que no está pensado para lo que me pasa a mí.

## La peor confusión (una sola), y qué cambiarías
**«abra una ventana»** (00, y en todo el sitio). Es lo que el sitio me pide que haga, y no sé qué es. Lo vine a entender en la segunda pantalla y luego me lo cambiaron por «muestra», «enlace» y «candidata».

**Qué cambiaría:** que la imagen diga en una línea, con palabras de despacho: *«Usted le manda un enlace a su candidata por WhatsApp. Ella revisa 20 facturas en 60 minutos. Usted ve cuáles errores encontró y cuáles se le fueron.»* Y que se use una sola palabra para eso en todo el sitio.

---

## Instrucción · finalista
Eres Daniela Ruiz (persona SINTÉTICA para una prueba de usabilidad; nadie real), 23 años, egresada de contaduría de una universidad privada mediana en Mexicali, sin experiencia formal más que el servicio social. Vives con tu mamá y tu hermano menor; usas un celular Android de gama baja con plan de datos prepago, y la computadora de la casa la compartes. Fuiste a una entrevista el martes en un despacho de 6 personas y quedaste entre las dos finalistas. Necesitas el trabajo. Hoy a las 6 de la tarde te llega por WhatsApp el mensaje del despacho que está en 00-invitacion.txt, y si abres el enlace ves 01-muestra-abierta.png. Léelos con la herramienta Read.

En primera persona y en español: ¿qué sientes al leer el mensaje? ¿Qué entiendes que tienes que hacer, cuánto tiempo, y qué va a ver el socio de ti? ¿Qué te preocupa? ¿Lo abrirías hoy, mañana, o le dirías que no puedes? ¿Usarías ayuda (apuntes, una IA) y lo declararías? Cita las palabras exactas que te tranquilizan o te dan miedo. Sé honesta y específica. No inventes cosas que no estén en el mensaje o la captura.

Al final, en este formato:
## Lo que entendí (tiempo, ayuda permitida, qué ve el socio)
## Confusiones o miedos (numerados, con la cita exacta, y si BLOQUEA o MOLESTA)
## Lo que haría: ABRIRLO HOY / MAÑANA / PEDIR OTRO DÍA / NO HACERLA, y por qué
## La peor confusión (una sola), y qué cambiarías del mensaje

## Ronda 1 · finalista
Me llega a las 6 de la tarde. Veo "Hola. Antes de decidir…" y se me hace un nudo en el estómago, porque eso quiere decir que todavía no decide y que sigo en la pelea. Me da gusto y miedo a la vez. Lo leo dos veces.

**Lo que me tranquiliza:**
- *"Si en esas 24 horas no puede, dígame y le abro otro, sin costo para nadie."* Con esto siento que no me van a descartar si se me complica hoy.
- *"Puede consultar leyes, apuntes o una IA; al final la página le pregunta qué usó y eso se me muestra tal cual, sin castigo."* Me alivia porque yo sí usaría mis apuntes de fiscal y seguramente le preguntaría a ChatGPT sobre gasolina en efectivo. Aunque "sin castigo" lo creo a medias. Él va a leer que usé IA y no sé qué va a pensar en el fondo.
- *"no veo cuántos minutos le tomó."* Uf, qué bueno. Me da miedo ser lenta.
- *"no le pide nombre ni teléfono"* y *"No tiene costo"*. El enlace es de vercel.app, que no conozco. Si no dijera esto, pensaría que es fraude.

**Lo que me da miedo:**
- *"El enlace es de un solo uso y le da 60 minutos desde que lo abre."* Tengo datos prepago y un Android que se traba. Si se me va la señal o se recarga la página, ¿pierdo todo? El mensaje no lo dice.
- *"me escribe qué le diría al cliente"*. En la página dice "40–220 palabras". Escribir eso en el celular con mi teclado es lentísimo. Prefiero la compu, pero es de la casa y a esta hora mi hermano la usa para la tarea.
- En la página, el botón dice *"Calificar mi revisión"*. ¿Me van a poner calificación? Él dijo que ve "qué marcó y qué escribió", pero "calificar" suena a número. Si saco 2 de 4, ¿eso es lo que ve?
- Arriba hay un menú con *"Para despachos", "Precios", "Rúbrica", "Tablero"*. ¿Puedo tocarlos? Si toco "Rúbrica", ¿estoy haciendo trampa o pierdo mi intento? Mejor ni los toco.
- En el cuadro verde dice *"hasta las 04:46 p.m."*. Si lo abro a las 6, ¿por qué dice 4:46? Supongo que la hora cambia según cuándo lo abro, pero me confundió.

Viendo la muestra, reconozco temas: gasolina pagada con *"01 Efectivo"*, el restaurante con *"(100%)"*, una laptop de $28,400 como gasto de administración, una nómina con pago *"99 Por definir"*. Siento que sí puedo, pero quiero repasar deducibilidad antes de abrir. Y como el mensaje me dice que solo cuenta desde que lo abro, puedo prepararme sin gastar el intento.

## Lo que entendí (tiempo, ayuda permitida, qué ve el socio)
- **Tiempo:** tengo 24 horas para abrirlo, o sea hasta mañana a las 6 pm. Una vez abierto, tengo 60 minutos seguidos y solo se puede entregar una vez.
- **Tarea:** de 20 facturas ya clasificadas, marcar las 4 que están mal y escribirle al cliente ("Don Julio") qué hay que corregir.
- **Ayuda permitida:** leyes, apuntes o IA. Al final declaro qué usé.
- **Qué ve el socio:** qué marqué, qué escribí, lo que declaré que usé y que entregué dentro de la ventana. No ve cuántos minutos tardé. La página no pide mi nombre; yo le mando el "mensaje corto" que me dé la página y así sabe que soy yo.

## Confusiones o miedos
1. *"El enlace es de un solo uso"*: ¿qué pasa si se cae mi internet o se recarga la página? No lo dice. **MOLESTA mucho.** No me impide hacerla, pero me obliga a esperar a tener compu y buen internet.
2. *"Calificar mi revisión"*: ¿el socio ve un número? El mensaje no habla de calificación. **MOLESTA.** Me pone nerviosa.
3. *"40–220 palabras"* escritas desde el celular. **MOLESTA.**
4. El menú de arriba (*"Rúbrica", "Precios", "Para despachos"*): no sé si puedo tocarlo ni si salirme afecta el intento. **MOLESTA.** No lo tocaría.
5. *"hasta las 04:46 p.m."* contra que me llegó a las 6 pm. **MOLESTA poco.**
6. *"sin castigo"*: lo creo a medias. **MOLESTA.** Igual lo declararía.

## Lo que haría: MAÑANA
Hoy en la noche no lo abro. La compu está ocupada y no quiero hacerlo en el celular con datos. Lo que sí hago hoy es contestarle "Gracias, mañana a primera hora lo hago" para que vea que me interesa, y repasar mis apuntes de deducciones (efectivo, consumos en restaurante, activo fijo). Mañana como a las 9 am, con la casa en silencio, lo abro en la compu. Usaría mis apuntes y probablemente una IA para confirmar uno o dos casos, y lo declararía, porque el mensaje dice que se muestra "tal cual" y no quiero que luego me cachen. No le pediría otro día: siento que si lo pido pierdo frente a la otra finalista, aunque diga "sin costo para nadie".

## La peor confusión
Qué pasa si se cae la conexión o se cierra la página a la mitad, siendo un enlace "de un solo uso" con 60 minutos. Por eso no lo abro hoy, y si no tuviera compu mañana, ni siquiera me atrevería.

**Qué cambiaría del mensaje:** agregaría una línea como "Si se le cierra la página o se le va el internet, vuelva a abrir el mismo enlace; lo que lleve marcado se guarda y el tiempo sigue". Si eso no es cierto, que diga claramente qué pasa. También aclararía que "Calificar" no le manda un número al socio, o qué es exactamente lo que ve.

---

*Nota para quien hizo la prueba: la captura es muy alta (780×11962) y la leí reducida. No pude recortarla porque no se aprobó el comando. Leí bien los textos del cuadro verde, los botones y las etiquetas, pero algún detalle pequeño de las facturas lo leí a esa resolución.*

## Ronda 2 · finalista (después de los fixes)
*(Persona sintética: Daniela Ruiz)*

Son las 6:04 y me llega el WhatsApp. Se me sube el estómago. "Antes de decidir" quiere decir que sigo entre las dos y que esto decide, porque el martes no se decidió. Primero siento alivio de que no me dijeron que no. Luego miedo, porque es un examen y no sé si la otra finalista ya lo hizo.

Lo leo dos veces. Me tranquiliza que sea concreto: **"20 facturas ya clasificadas, 4 están mal; usted marca cuáles y me escribe qué le diría al cliente."** Eso lo entiendo, y es lo que hice en el servicio social. También me ayuda **"ábralo cuando pueda hacerla de corrido"**, porque así sé que no debo abrirlo nomás para echar un ojo. Me quita presión **"Si en esas 24 horas no puede, dígame y le abro otro"**, aunque yo no le voy a pedir otro, porque se vería mal. Y **"se queda guardado en su teléfono"** me importa mucho, porque mis datos son de prepago y la señal a veces se me va.

Cuando veo la página me pongo nerviosa. Arriba hay un menú con **"Para despachos · Precios · Simulador · Tablero · Métrica · Playbook"** y por un segundo pienso que me mandaron a una página de ventas o que es fraude. Luego leo "Muestra abierta por Despacho Arriaga" y me calmo un poco. Dice **"Revisa lo que clasificó el agente"**. ¿Cuál agente? Más abajo dice "agente SIMULADO" y entiendo que es un sistema, pero el mensaje no lo mencionaba. El socio me habla de "usted" y la página de "tú". Me confunde que la caja diga **"hasta las 04:53 p.m."** si me llegó a las 6.

Lo que más me inquieta es esto: el mensaje dice **"no veo cuántos minutos le tomó"**, pero la página dice **"se registra la hora de inicio, la de entrega"**. Si registran las dos horas, cualquiera puede restar. ¿Me lo dijeron para tranquilizarme nada más?

Sobre la ayuda: sí usaría mis apuntes y la ley del ISR, sobre todo para la gasolina pagada en efectivo y el consumo en restaurante, que me hacen ruido. A lo mejor le preguntaría algo a una IA. Lo declararía, porque el mensaje dice **"sin castigo"**. Aun así pienso que si la otra pone "ninguna ayuda", ella se ve mejor que yo. Y me da miedo que el menú ya venga marcado con **"no usé ninguna ayuda"**: si se me olvida cambiarlo, quedo como mentirosa.

El botón dice **"Calificar mi revisión"**. ¿Voy a ver mi calificación? ¿El socio ve una calificación o solo lo que marqué?

## Lo que entendí (tiempo, ayuda permitida, qué ve el socio)
- **Tiempo:** 60 minutos de corrido desde que abro el enlace. Tengo 24 horas para abrirlo, que supongo que cuentan desde las 6 de hoy. Es de un solo uso.
- **Tarea:** encontrar las 4 facturas mal clasificadas de 20 y escribir un mensaje al cliente de 40 a 220 palabras. Al final mando por WhatsApp el mensaje corto que me da la página.
- **Ayuda:** leyes, apuntes o IA. Al final declaro qué usé, y la página aclara "no se verifica ni se castiga".
- **Qué ve el socio:** cuántas de las 4 encontré, qué marqué, qué escribí y qué ayuda declaré. Según él, no ve los minutos, y la página dice que no pide mi nombre ni mi teléfono.

## Confusiones o miedos
1. **"se registra la hora de inicio, la de entrega"** contra **"no veo cuántos minutos le tomó"**. Parecen contradecirse y me hace dudar de todo lo demás. **MOLESTA**, y casi **BLOQUEA** mi confianza.
2. **Menú con "Precios", "Para despachos", "Simulador"**: parece página de ventas y no de examen, y me hizo pensar en fraude. **MOLESTA**. Si no hubiera visto "Despacho Arriaga", **BLOQUEARÍA**.
3. **"Revisa lo que clasificó el agente"**: el mensaje no dice nada de un agente. No sé si es una IA ni si el error es "de la máquina". **MOLESTA**.
4. **"no usé ninguna ayuda"** ya escogido por defecto: si no lo cambio, declaro algo falso sin querer. **MOLESTA**, con riesgo real.
5. **"tiene 24 horas"**: no sé si cuentan desde el mensaje o desde otra hora. Y la página dice "hasta las 04:53 p.m.", que no cuadra. **MOLESTA**.
6. **"Calificar mi revisión"**: no sé si yo veo la calificación ni si el socio ve un número. **MOLESTA**.
7. **"se queda guardado en su teléfono"**: si lo abro en el cel y quiero pasarme a la compu de la casa para escribir mejor, ¿se pierde? Y como es de un solo uso, ¿la compu cuenta como otra apertura? **BLOQUEA** decidir dónde hacerlo.
8. **"sin castigo"** sobre la IA: le creo a medias, porque compito contra otra persona. **MOLESTA**.

## Lo que haría: ABRIRLO HOY
Lo abro hoy, en la noche, cuando mi hermano suelte la computadora y haya silencio. Antes de abrir me preparo como 20 minutos: tengo mis apuntes de deducciones y la ley a la mano, y pongo el celular a cargar. Lo hago hoy porque necesito el trabajo y quiero que el socio vea que respondí rápido; no quiero que la otra finalista entregue antes. No pido otro día aunque me lo ofrezcan, porque siento que eso cuenta en contra. Lo haría en el celular para no arriesgarme con el "guardado en su teléfono", aunque escribir 200 palabras ahí me cuesta.

## La peor confusión
La contradicción entre **"no veo cuántos minutos le tomó"** y **"se registra la hora de inicio, la de entrega"**. Si eso no cuadra, ya no le creo del todo el "sin castigo" de la ayuda, y entonces lo más seguro para mí es no declarar la IA. Eso le quita el sentido a la pregunta. Yo cambiaría el mensaje para decir exactamente qué ve el socio y qué no, con las mismas palabras que la página. Algo así: "Yo veo qué marcó, qué escribió y qué ayuda declaró, y que entregó dentro de la hora. La página guarda la hora para cerrar la ventana, pero a mí no me la muestra." También diría en una línea en qué aparato hacerlo, porque lo guardado solo se queda en ese aparato.

---
*Una nota fuera del personaje:* la captura me llegó reducida a unos 168 px de ancho, así que no pude leer bien la letra chica del pie de página ni algunas etiquetas de las facturas. Intenté recortarla para verla en grande, pero esos comandos necesitaban tu permiso y no se ejecutaron. Lo que cito del banner superior y del final del formulario sí lo pude leer.
