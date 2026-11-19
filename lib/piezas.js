// Semana 15 — DISTRIBUCIÓN. UN solo archivo para todo lo que sale de Criba hacia afuera:
// el playbook, las series, los textos de las tres piezas, los textos de los mensajes y las afirmaciones con su fuente.
// REGLA: lo que no está aquí no se manda. Este archivo lo lee `lib/revisar.js` en `node --test` antes de cada deploy.
// Los textos de las piezas salen del proceso de seis roles (docs/proceso/<pieza>/6-final.md); aquí se transcriben.
// `aprobada` lo llena un humano (Andrés) DESPUÉS de que pasa la prueba. Mientras sea null, la pieza no se ha enviado a nadie.

export const BASE = 'https://w04-criba.vercel.app'

// ---------- Estrategia ----------
export const PUBLICO = {
  quien: 'El socio o dueño de un despacho contable de 1 a 20 personas, sin área de RH, que lee él mismo lo que sale de su despacho.',
  usuarioPagador: 'Es usuario y pagador. La finalista entrega la muestra y nunca paga.',
  momento: 'La tarde después de las primeras entrevistas, con una o dos finalistas y antes de hacer la oferta.',
  hoy: '"La contrato y veo": decide por la entrevista y el periodo de prueba le dice el resto. En la única conversación real que tengo, el dueño se enteró en la semana 2–3.',
  limite: 'Yo no puedo ver ese día. Publicar una vacante se ve; tener finalistas no. Por eso la pieza tiene que servirle a alguien que hoy no tiene finalistas, y dejarle el enlace a la mano.',
}
export const PROMESA = 'Antes de hacer la oferta, usted ve qué facturas marcó su finalista en un juego de 20, cuáles se le fueron y qué le escribió al cliente del ejercicio.'
export const PRIMERA_LINEA = 'Antes de hacer la oferta: lo que su finalista entregó en una ventana de 60 minutos, a la vista.'
export const POSICION = 'No le digo a quién contratar. Le enseño lo que entregó.'
// Lo que NO prometo. Estas líneas no pasan por el revisor de verbos porque nombran, negándolas, las palabras prohibidas.
export const NO_PROMETO = {
  principal: 'Que va a contratar mejor.',
  tambien: ['Que la finalista es apta o está certificada.', 'Que lo escribió sola: eso la ventana no lo registra.', 'Cómo va a trabajar en su despacho.'],
}
export const NO_PUBLICO = [
  { quien: 'Candidatas', porque: 'Condición 1 del Charter. Con el tablero en 0 de 20, llenar el contador con ellas sería fabricar constancias que ningún despacho pidió.', siLlega: 'Puede practicar con el juego de demostración. Se le dice la verdad: sin un despacho que abra la ventana, no hay registro.' },
  { quien: 'RH corporativo', porque: 'Segmento supuesto, cero vistos. Quien contrata por decenas necesita ordenar candidatas, y la Condición 6 prohíbe el ranking.', siLlega: 'Abre ventanas como cualquiera. No se construye lista ni exportación.' },
  { quien: 'Negocio sin contador adentro', porque: 'No puede leer la entrega con su oficio. Pediría "apta o no apta", y eso Criba no lo dice.', siLlega: 'La página dice para quién es.' },
  { quien: 'Universidades y bolsas de trabajo', porque: 'Quien abre la ventana debe ser quien duda. Una universidad gana colocando egresadas.', siLlega: 'Se le explica por qué no abre ventanas.' },
]
export const EVIDENCIA = [
  { que: 'Conversación real de precio (despacho: dicho de Andrés; "usaría lo gratis": dicho, no hecho)', valor: '1', tipo: 'dicho', fuente: 'conversacion' },
  { que: 'Comportamiento registrado de un socio de despacho (ventana creada, lectura terminada)', valor: '0', tipo: 'medido', fuente: 'decisiones' },
  { que: 'Mensajes en frío de LinkedIn del 10 de noviembre: enviados / contestaron', valor: '5 / 1', tipo: 'dicho de Andrés, sin texto en el repo', fuente: 'decisiones' },
  { que: 'Dueños de despacho que han contestado el tablero (regla: 5 de 20)', valor: '0', tipo: 'medido', fuente: 'tablero' },
  { que: 'Finalistas reales que han usado una ventana', valor: '0', tipo: 'medido', fuente: 'decisiones' },
  { que: 'Valor contra precio en el memo (caso base)', valor: '2.4 a 1', tipo: 'calculado con supuestos', fuente: 'memo' },
]

// ---------- Marca ----------
export const VOZ = [
  { regla: 'Decir lo que se ve, no lo que significa', como: 'Solo verbos que la ventana registra: marcó, se le fue, escribió, entregó.' },
  { regla: 'Cada número con su etiqueta, cada afirmación con su cita', como: 'Medido, supuesto o inventado. La fuente va al lado, con sus palabras literales.' },
  { regla: 'De usted y en español de despacho', como: 'Factura, deducible, cierre. Sin jerga de reclutamiento, sin signos de admiración, sin emojis.' },
]
export const LINEA_DEBIL = {
  antes: 'Contrata sabiendo si sirve.',
  porque: '"Sabiendo" promete certeza y "sirve" predice desempeño. La Condición 2 del Charter y la cláusula sombra del Blueprint T1 prohíben las dos cosas. Además tutea.',
  despues: PROMESA,
}
export const PALETA = [
  { nombre: 'Tinta', hex: '#0A0A0A', uso: 'Fondo del sitio y texto de las piezas' },
  { nombre: 'Papel', hex: '#F5F0E6', uso: 'Fondo de toda evidencia: lo que está sobre papel es dato del ejercicio' },
  { nombre: 'Marcatextos', hex: '#FCD34D', uso: 'Una sola cosa por pieza: lo que hay que mirar' },
  { nombre: 'Verde ventana', hex: '#34D399', uso: 'Lo que hace el despacho: abrir, verificar' },
  { nombre: 'Gris nota', hex: '#A3A3A3', uso: 'Etiquetas y fuentes' },
]
export const TIPOGRAFIA = [
  { nivel: 'Criba hablando', como: 'Sans en negrita, una línea, 14 palabras o menos' },
  { nivel: 'Dato del ejercicio', como: 'Mono: folio, RFC, monto, renglones de la entrega' },
  { nivel: 'Etiqueta', como: 'Gris chico en mayúsculas: INVENTADO, SUPUESTO, de dónde sale' },
]
export const PLANTILLA = ['Franja de serie y número', 'Una línea', 'Bloque de evidencia sobre papel, en mono, con marcatextos en una sola cosa', 'Pie: etiqueta, fuente y siguiente paso']
export const POR_QUE_ENCAJA = 'El socio lo abre en el teléfono, dentro de WhatsApp, entre un cierre y otro. Se ve como un papel de trabajo marcado con marcatextos, que es lo que él hace con una balanza, y no como un anuncio. De usted, porque así le hablan ya las pantallas del despacho y porque el primer contacto llega por alguien mayor que yo.'

// ---------- Fuentes: cada una con sus palabras literales ----------
export const FUENTES = {
  promesa: { donde: 'app/verificar/page.js', cita: 'Encontró <b>{intento.aciertos.length} de 4</b> … Se le fue: … Lo que escribió al cliente (tal cual)' },
  ventana: { donde: 'lib/convocatorias.js', cita: 'export const VENTANA_MIN = 60 … export const CADUCA_H = 24' },
  juego: { donde: 'lib/muestra.js', cita: 'Un "agente" (simulado) clasificó 20 CFDIs del mes. Exactamente 4 clasificaciones están mal.' },
  demo: { donde: 'lib/demo.js', cita: 'Esta entrega es de UNA finalista que no existe. Nunca hay dos en la misma pantalla.' },
  conversacion: { donde: 'lib/conversaciones.js', cita: "dia: '2026-11-15' … finalistas: 2 … semanaQueSeEntero: 'semana 2–3' … resultado: 'DIJO QUE USARÍA LO GRATIS'" },
  tablero: { donde: 'lib/store.js y /tablero', cita: 'export const UMBRAL = { minimo_si: 5, muestra: 20 } · /api/respuestas hoy: "items":[]' },
  memo: { donde: 'lib/precios.js y /about', cita: 'export function ratio(m = MEMO) { return valorVacante(m) / m.precio.v } · caso base: 2.4' },
  precio: { donde: 'lib/precios.js', cita: "id: 'vacante', nombre: 'Por vacante', precio: 490 … 'La primera ventana registrada de cada vacante'" },
  charter2: { donde: 'docs/CHARTER.md', cita: 'No afirma "certificada", "apta", "trabajó sola" ni predice desempeño' },
  charter6: { donde: 'docs/CHARTER.md', cita: 'la evidencia nunca se convierte en la persona' },
  asistencia: { donde: 'app/verificar/page.js', cita: "consulte_fuentes: 'consultó leyes o apuntes'" },
  decisiones: { donde: 'docs/DECISIONS.md', cita: '2026-11-19 — CORRECCIÓN DE REGISTRO' },
  pantalla: { donde: 'app/verificar/page.js', cita: 'Lo que esto NO dice: que esté certificada, que sea apta, que lo escribió sola, ni cómo va a trabajar. … En la llamada pídale que explique en voz alta justo esa factura, y pregúntele cómo lo resolvió y qué usó.' },
  decision: { donde: 'app/decision/page.js', cita: 'Dos minutos, anónimo: no pedimos nombre, correo ni teléfono.' },
  dominio: { donde: 'lib/piezas.js (BASE) y app/despachos/page.js', cita: "export const BASE = 'https://w04-criba.vercel.app'" },
  series: { donde: 'lib/piezas.js (SERIES)', cita: "{ id: 2, nombre: 'La pantalla, a la vista'" },
}

// ---------- Series y conceptos (seis conceptos, tres series, dos por serie) ----------
export const SERIES = [
  { id: 1, nombre: 'Lea una entrega', para: 'El socio hace su tarea, que es leer, no clasificar.', formato: 'Interactivo', conceptos: [
    { id: '1a', titulo: 'Una finalista inventada encontró 3 de 4: ¿qué le preguntaría en la llamada de la oferta?', estado: 'terminada', pieza: 'a' },
    { id: '1b', titulo: 'La que marcó de más: una factura bien clasificada que ella marcó como mala, y qué se le pregunta.', estado: 'boceto', proposito: 'Enseñar que marcar de más también se ve, y que tampoco es un veredicto.' },
  ] },
  { id: 2, nombre: 'La pantalla, a la vista', para: 'Lo que el socio va a ver antes de la oferta, sin abrir nada.', formato: 'Imagen 1080×1350', conceptos: [
    { id: '2a', titulo: 'Antes de hacer la oferta: lo que su finalista entregó, a la vista.', estado: 'terminada', pieza: 'b' },
    { id: '2b', titulo: 'Lo que esta pantalla no le dice: si lo escribió sola, si es apta, quién es mejor.', estado: 'boceto', proposito: 'Poner los límites de Criba en la misma plantilla que sus promesas.' },
  ] },
  { id: 3, nombre: 'Cuentas a la vista', para: 'Los números de Criba hoy, con sus ceros.', formato: 'Texto', conceptos: [
    { id: '3a', titulo: 'Tres números de Criba y un cero: la regla 5 de 20, una conversación, 2.4 a 1, y cero comportamiento registrado.', estado: 'terminada', pieza: 'c' },
    { id: '3b', titulo: 'Lo que cortó la revisión esta semana: cinco frases mías que el Charter prohíbe.', estado: 'boceto', proposito: 'Que el socio vea el filtro trabajando contra el propio autor.' },
  ] },
]

// ---------- Las tres piezas terminadas ----------
// textos: pasan por el revisor (verbos, patrones, cifras). noDice: límites dichos en negativo, no pasan por el revisor de verbos.
// cifras: todo número escrito en `textos` → la fuente que lo sostiene.
export const PIEZAS = {
  // Transcrito de docs/proceso/a/6-final.md (sin editar el texto). Se quitó como fuente una cita al contexto de los roles: no es archivo del repo.
  a: {"id": "a", "serie": 1, "formato": "Interactivo · /lectura", "enlace": "/lectura", "textos": {"titular": "Lea la entrega de una finalista inventada y elija qué le preguntaría", "entrada": "Usted va a leer la entrega de una finalista que no existe (INVENTADO). Ahí se ve qué facturas marcó, cuál se le fue y qué le escribió al cliente del ejercicio.", "pregunta": "¿Qué le preguntaría usted a esta finalista en la llamada de la oferta?", "opciones": [{"se_ve": "Se le fue: factura emitida a otro RFC (INVENTADO).", "pregunta": "«Esta factura está emitida a otro RFC. ¿Me explica en voz alta qué haría con ella?»"}, {"se_ve": "Marcó de más (estaba bien): DM-0412, Garrafones de agua, $640 en efectivo (INVENTADO).", "pregunta": "«¿Por qué marcó la de los garrafones?»"}, {"se_ve": "Le escribió al cliente del ejercicio que hay tres que corregir (INVENTADO) y: «¿Me confirma para hacer los ajustes antes del cierre?»", "pregunta": "«Si el cliente no le confirma antes del cierre, ¿qué hace con esas facturas?»"}], "cierre": "Criba le deja lo que se ve: las facturas que marcó, la que se le fue y el mensaje que entregó. No le dice «cómo va a trabajar». Para la llamada, la pantalla le dice: «pídale que explique en voz alta justo esa factura».", "autoria": "Criba no registra quién escribió el mensaje, solo la ayuda que la finalista declara (aquí, INVENTADO: «consultó leyes o apuntes»), así que en la llamada usted puede preguntarle cómo lo resolvió y qué usó."}, "noDice": [], "cifras": {"0412": "demo", "640": "demo"}, "afirmaciones": [{"texto": "La finalista no existe y todo en la entrega es inventado.", "fuente": "demo"}, {"texto": "Se le fue la factura emitida a otro RFC; marcó de más DM-0412, garrafones de agua.", "fuente": "demo"}, {"texto": "No le dice cómo va a trabajar; la pantalla le dice que pida que explique en voz alta esa factura.", "fuente": "pantalla"}, {"texto": "Criba no registra quién escribió el mensaje, solo la ayuda que la finalista declara.", "fuente": "asistencia"}], aprobada: null},
  // Transcrito de docs/proceso/b/6-final.md. Franja y pie reescritos tras la persona r1 (socio sintético) y re-verificados por el rol 4: docs/proceso/b-r2/.
  b: {"id": "b", "serie": 2, "formato": "Imagen 1080×1350 · /piezas/b.png", "enlace": "/despachos", "textos": {"franja": "Para despachos contables · ejemplo", "linea": "Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista.", "evidencia": ["Marcó 3 de las 4 que estaban mal: gasto pagado en efectivo que no se deduce así; consumo en restaurante al 100%; activo fijo como gasto.", "Se le fue 1: factura emitida a otro RFC.", "Marcó de más 1 que estaba bien.", "Escribió al cliente del ejercicio: «Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. […]»"], "pie": ["Ejemplo inventado: esta finalista no existe. Con la suya, verá estos mismos datos.", "Usted le manda un enlace a su finalista por WhatsApp. Ella marca las facturas mal clasificadas de un juego de 20, con 60 minutos. Usted ve cuáles marcó y cuáles se le fueron. Un enlace por finalista: el primero de la vacante es gratis; del segundo al décimo, MX$490 por toda la vacante.", "w04-criba.vercel.app/despachos"], "texto_alternativo": "Imagen con la línea «Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista» y cuatro renglones de una entrega inventada de demostración: marcó 3 de las 4 facturas que estaban mal, se le fue la emitida a otro RFC (renglón marcado), marcó de más 1 que estaba bien, y el inicio de lo que escribió al cliente del ejercicio.", "marcatextos": "Se le fue 1: factura emitida a otro RFC."}, "noDice": ["Lo que esta imagen no dice: si lo escribió sola, si es apta, ni cómo va a trabajar."], "cifras": {"3": "demo", "4": "juego", "1": "demo", "100": "demo", "04": "dominio", "20": "juego", "60": "ventana", "490": "precio"}, "afirmaciones": [{"texto": "Antes de la oferta, usted ve cuáles facturas se le fueron a su finalista.", "fuente": "promesa"}, {"texto": "Marcó 3 de las 4 que estaban mal; se le fue 1: factura emitida a otro RFC; marcó de más 1 que estaba bien.", "fuente": "demo"}, {"texto": "Escribió al cliente del ejercicio: «Buenas tardes, don Ernesto…»", "fuente": "demo"}, {"texto": "Un enlace por finalista: el primero de la vacante es gratis; del segundo al décimo, MX$490 por toda la vacante.", "fuente": "precio"}, {"texto": "Usted le manda un enlace por WhatsApp; ella tiene 60 minutos.", "fuente": "ventana"}, {"texto": "w04-criba.vercel.app/despachos", "fuente": "dominio"}], aprobada: null},
  // Transcrito de docs/proceso/c/6-final.md (sin editar el texto). El verificador cortó mi "0 de 20": ninguna fuente escrita lo mide (sale de la API en vivo).
  c: {"id": "c", "serie": 3, "formato": "Texto · WhatsApp o LinkedIn", "enlace": "/decision", "textos": {"titular": "Tres números de Criba y un cero", "cuerpo": "La regla del piloto pide que 5 de 20 dueños de despacho digan que sí. Es una regla, no un dato.\n\nConversaciones reales de precio: 1 (medido), con el dueño de un despacho contable. Dijo: \"Los 490, me inclino a que sí, pero depende.\"\n\nEl memo de precio calcula 2.4 a 1 (supuesto). Solo el sueldo está medido.\n\nLo que todavía no está registrado: que ese dueño haga lo que dijo. El registro de esa conversación anota: \"Comportamiento registrado de un socio de despacho: cero\" (medido).", "siguiente_paso": "Si usted tiene un despacho, puede opinar en /decision. La página dice: \"Dos minutos, anónimo\"."}, "noDice": [], "cifras": {"5": "tablero", "20": "tablero", "1": "conversacion", "490": "conversacion", "2.4": "memo"}, "afirmaciones": [{"texto": "La regla del piloto pide que 5 de 20 dueños de despacho digan que sí.", "fuente": "tablero"}, {"texto": "Conversaciones reales de precio: 1, con el dueño de un despacho contable: \"Los 490, me inclino a que sí, pero depende.\"", "fuente": "conversacion"}, {"texto": "El memo de precio calcula 2.4 a 1 (supuesto). Solo el sueldo está medido.", "fuente": "memo"}, {"texto": "Comportamiento registrado de un socio de despacho: cero.", "fuente": "conversacion"}, {"texto": "Puede opinar en /decision: \"Dos minutos, anónimo\".", "fuente": "decision"}], aprobada: null},
}

// ---------- Textos de los mensajes: yo copio y pego. Lo único libre es el saludo y quién me dio el contacto. ----------
export const MENSAJES = {
  tibio_a: `[Saludo y quién me dio su contacto.] Soy Andrés, estudiante. Armé una página para socios de despacho: es la entrega de una finalista inventada a una muestra de trabajo de 20 facturas, tal como usted la vería antes de hacer una oferta. Leerla toma unos dos minutos y al final le pregunta qué le preguntaría a ella. No vendo nada ni pido datos. Si la abre, me ayuda mucho que me diga dónde dejó de leer: ${BASE}/lectura?f=tibio_a`,
  tibio_b: `[Saludo y quién me dio su contacto.] Soy Andrés, estudiante. Le mando una imagen: es lo que un socio de despacho ve de su finalista antes de hacerle la oferta, con datos inventados. La página completa está aquí, sin registro: ${BASE}/despachos?f=tibio_b — No vendo nada ni pido datos. Si algo no se entiende, me ayuda mucho que me lo diga.`,
  frio_a: `Buenas tardes. Vi que su despacho publicó una vacante de auxiliar contable. Soy Andrés, estudiante, y este es el único mensaje que le voy a mandar. Armé una página para socios de despacho: la entrega de una finalista inventada a una muestra de trabajo de 20 facturas, tal como usted la vería antes de hacer una oferta. Son unos dos minutos: ${BASE}/lectura?f=frio_a`,
  frio_b: `Buenas tardes. Vi que su despacho publicó una vacante de auxiliar contable. Soy Andrés, estudiante, y este es el único mensaje que le voy a mandar. Le dejo lo que un socio ve de su finalista antes de hacerle la oferta, con datos inventados: ${BASE}/despachos?f=frio_b`,
  // Texto prellenado de los botones de compartir. Quien lo manda lo puede cambiar: eso no lo controlo.
  colega: `Me llegó esto de un estudiante: lo que un socio de despacho ve de una finalista (inventada) antes de hacerle la oferta. Son dos minutos: ${BASE}/despachos?f=colega`,
  guardar: `Criba, para cuando tenga finalistas: abrir una ventana toma dos minutos y la primera es gratis. ${BASE}/convocar?f=guardado`,
}
// Lo que el despacho le manda a la finalista (prellenado en /convocar; el despacho lo puede cambiar).
export const invitacion = enlace => `Hola. Antes de decidir le pido una muestra de trabajo: 20 facturas ya clasificadas, 4 están mal; usted marca cuáles y me escribe qué le diría al cliente. El enlace es de un solo uso y le da 60 minutos desde que lo abre, así que ábralo cuando pueda hacerla de corrido; tiene 24 horas: ${enlace} — Si se le cierra la página o se le cae el internet, vuelva a abrir el mismo enlace dentro de los 60 minutos: lo que llevaba marcado y escrito se queda guardado en ese mismo aparato, así que hágala en uno solo. Si en esas 24 horas no puede, dígame y le abro otro, sin costo para nadie. Puede consultar leyes, apuntes o una IA; al final la página le pregunta qué usó y eso se me muestra tal cual, sin castigo. No tiene costo y no le pide nombre ni teléfono. Yo voy a ver cuántas de las 4 encontró, qué marcó, qué escribió y qué ayuda declaró, y que entregó dentro de la hora. La página guarda la hora solo para cerrar los 60 minutos; a mí no me la muestra. Al terminar, mándeme el mensaje corto que le da la página. Gracias.`

// ---------- La regla de envío (auditable) ----------
export const REGLA_ENVIO = {
  quien: [
    'Quien ya le dijo que sí a un conocido suyo que le preguntó si le puedo escribir. Es lo único que llamo opt-in.',
    'Quien publicó una vacante con su nombre: un mensaje, y se reporta aparte como "frío, no pedido". Empieza a ser opt-in si contesta.',
    'Quien me escriba primero.',
  ],
  veces: 'Una. Segunda solo si contestó. Recordatorio solo si lo pidió.',
  terceros: 'El reenvío a un colega lo manda él, desde su teléfono. Nunca pido ni recibo el nombre ni el número del colega.',
  guardo: 'En mi teléfono: nombre, quién me lo presentó, fecha, qué pieza, si contestó. Nunca en el repositorio, en el sitio ni en un chat de IA. Se borra el 15 de diciembre de 2026.',
  nunca: ['Grupos de WhatsApp o de Facebook', 'Herramientas de envío masivo', 'Números sacados de internet', 'Escribirle a candidatas', 'Pedir el teléfono de un colega', 'Segundo mensaje sin respuesta', 'Decir "ya lo usan N despachos"'],
  ley: 'No he leído el texto de la LFPDPPP. No digo que cumplo: digo que mi regla es más estrecha que lo que entiendo que pide.',
}

// ---------- La prueba de dos piezas, escrita ANTES de enviar ----------
export const PRUEBA = {
  escrita: '2026-11-19',
  canal: 'WhatsApp, uno a uno, enviado por mí. El frío de LinkedIn se reporta aparte.',
  reparto: 'La lista se ordena antes. Nones reciben la Pieza A, pares la Pieza B. Cada enlace lleva su etiqueta.',
  esperado: [
    'De los tibios, llega la mitad.',
    'De los tibios que reciben A, termina la lectura uno de cada cuatro.',
    'Del frío, contesta uno de cada cinco (antecedente: 1 de 5 el 10 de noviembre).',
    'Reenvíos a un colega: cero.',
    'Ventanas abiertas: cero. Casi nadie va a estar en la semana de sus finalistas.',
  ],
  umbrales: [
    'La Pieza A falla si llegan 2 o más y nadie termina. Falló la pieza. "Quería una lista" solo cuenta si alguien me lo escribe.',
    'La Pieza B falla si, de quienes la reciban, no llega ninguno.',
    'Las llegadas del canal tibio se reportan como "puede ser cortesía". Una llegada con etiqueta colega, no.',
  ],
  reglaPublico: 'Al 15 de diciembre de 2026: si mandé 10 o más mensajes a socios de despacho y el log registra menos de 2 actos más allá de llegar (lectura terminada, llegada por enlace de colega, ventana creada, tablero enviado), el socio de despacho deja de ser el primer público y pruebo al contador general de una empresa mediana con área contable propia. Lo que me escriban (una fecha, "la uso la semana que entra") lo anoto aparte, como dicho, y no cuenta. Sin identidad en el log, dos actos pueden ser de la misma persona o de alguien que no es socio; mis propias pruebas usan la fuente `prueba` y no cuentan. Si no llego a 10 enviados, el veredicto no es sobre el público: es sobre mí.',
  // Lo llena Andrés después de enviar. Solo números y roles, nunca nombres. Mientras sea null: PENDIENTE.
  envio: null, // { dia, tibios: n, frios: n, respuestas: [{ rol, canal, pieza, palabras }] , queCambia: '' }
}

// ---------- Los seis roles ----------
export const ROLES = [
  { n: 1, rol: 'Investigación', entrada: 'Un registro del repositorio (conversación real, conteo del log, decisión fechada) y el Charter', salida: 'Ficha: 3 a 5 hechos, cada uno con su cita literal y su archivo', chequeo: 'Ningún hecho sin cita. Nada de sesiones simuladas.' },
  { n: 2, rol: 'Redacción', entrada: 'La ficha, las reglas de voz y la promesa', salida: 'Borrador con cada afirmación atada a un hecho de la ficha', chequeo: 'Una idea por pieza. Titular de 14 palabras o menos. Hay siguiente paso.' },
  { n: 3, rol: 'Producción visual', entrada: 'El borrador y el sistema visual', salida: 'Especificación de la plantilla. El render lo hace código.', chequeo: 'Se lee a 390 px. Etiqueta INVENTADO visible. Una persona por pantalla.' },
  { n: 4, rol: 'Verificación de afirmaciones', entrada: 'El borrador, la ficha y el Charter', salida: 'Tabla: afirmación, cita literal, y pasa / se corta / dice más que la fuente', chequeo: 'Cita o se corta. Revisa posesivos, autoría y dos oraciones juntas.' },
  { n: 5, rol: 'Revisión de estilo', entrada: 'El borrador y las tres reglas de voz', salida: 'Lista de faltas con la frase exacta', chequeo: 'De usted. Sin palabras vetadas. Sin carnada.' },
  { n: 6, rol: 'Revisión final', entrada: 'El borrador y las dos revisiones', salida: 'Texto final y lista de cortes con su razón', chequeo: 'No entra nada nuevo sin volver al rol 4.' },
]
export const DESPUES_DE_LOS_ROLES = [
  { paso: 'Prueba automática', quien: 'Código (node --test, antes de cada deploy)', que: 'Lee este archivo. Rechaza verbos de una lista cerrada, la comparación con el periodo de prueba, cifras sin fuente y afirmaciones sin cita.' },
  { paso: 'Aprobación humana', quien: 'Andrés', que: 'Una sola pregunta que la prueba no ve: ¿se lo diría en la cara al socio? Queda escrita aquí con mi nombre y el día. No puede pasar por encima de la prueba.' },
]
export const LIMITES_DEL_PROCESO = [
  'La lista de verbos va siempre un sinónimo atrás.',
  'No ve dos oraciones que juntas prometen algo que ninguna promete sola.',
  'Decidir si una fuente sostiene una oración sigue siendo juicio. Por eso la cita va publicada al lado.',
  'Las reglas fiscales del juego de demostración no las revisó un contador titulado.',
  'Los textos los redactan modelos de lenguaje y los corrijo yo. No digo que los escribió un humano: digo que cada oración se puede abrir.',
]
