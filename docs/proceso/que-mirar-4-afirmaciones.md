## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| 1. «La factura que se le fue.» | `Se le fue: <b>{intento.omitidos.length ? intento.omitidos.map(i => TIPO[i]).join('; ') : 'ninguno'}</b>.` / `seLeFue: ['factura emitida a otro RFC'],` | app/verificar/page.js:40 · lib/demo.js:22 | PASA |
| 1. «Pídale en la llamada que explique en voz alta justo esa factura.» | `En la llamada pídale que explique en voz alta justo esa factura, y pregúntele cómo lo resolvió y qué usó.` | app/verificar/page.js:45 | PASA |
| 2. «Lo que marcó de más.» | `Marcó de más (estaba bien): <b>{intento.falsos.length}</b>` | app/verificar/page.js:41 | PASA |
| 2. «Una factura bien clasificada que ella marcó como mala» | `nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.'` / `<b>Falsos positivos</b>: folios marcados que estaban bien.` | lib/demo.js:24 · app/rubrica/page.js:26 | PASA (las fuentes dicen «marcados», no «como mala», pero en esta muestra marcar significa señalarla como mal clasificada) |
| 2. «…también es algo que preguntarle.» | No hay cita. La única indicación de qué preguntar es sobre la factura que se le fue (verificar:45). | — | DICE MÁS QUE LA FUENTE: ninguna fuente dice que se le pregunte lo marcado de más |
| 3. «Lo que le escribió al cliente del ejercicio.» | `<summary className="cursor-pointer">Lo que escribió al cliente (tal cual)</summary>` | app/verificar/page.js:44 | PASA («del ejercicio» lo exige el contexto) |
| 3. «Si explica cada error con el término correcto» | `para cada error encontrado, que el mensaje lo nombre con el término correcto` / `texto: \`Explica el error del folio ${c.folio} con el término correcto.\`` (dentro de `for (const id of aciertos)`) | app/rubrica/page.js:31 · lib/muestra.js:62-65 | DICE MÁS QUE LA FUENTE: la regla cubre solo errores encontrados, no los cuatro |
| 3. «…y le pide al cliente una acción concreta.» | `texto: 'Pide una acción concreta al cliente.'` / `que pida una acción concreta` | lib/muestra.js:67 · app/rubrica/page.js:31 | PASA |

## Alertas

**(a) Posesivos que afirman autoría o cercanía: no.** No aparece «su trabajo» ni «su cliente». La línea 3 dice «al cliente del ejercicio».

**(b) Dos oraciones que juntas prometen algo que ninguna promete sola: sí.** Se juntan la línea 1 («La factura que se le fue») y la línea 3 («Si explica cada error con el término correcto»). Leídas juntas, dan a entender que el mensaje debería explicar también la factura que se le fue. Ella no puede explicar un error que no marcó, y la regla de texto no lo pide (`for (const id of aciertos)`, muestra.js:62). El socio podría tomar como una falla del mensaje algo que la regla nunca revisó. Si la línea 3 dice «cada error que marcó», la promesa desaparece.

**(c) Cifras sin fuente: no en las líneas del borrador.** Fuera de esas líneas: el encargo justifica el bloque con «2 de 4 respuestas reales de despachos», pero el contexto fijo dice «hoy hay 0 respuestas reales» (lib/store.js y /tablero). No lo comprobé en `lib/store.js` porque está fuera de los cuatro archivos asignados. Si esa cifra aparece en la página o en un pie, hay que cortarla o citar el registro.

**(d) Algo que convierta la entrega en un juicio sobre la persona: no.** Las tres líneas hablan de facturas y de un mensaje que se pueden ver. La línea 2 va en el límite con «algo que preguntarle», que no tiene fuente (ver Tabla), pero no juzga a la persona.

**(e) Verbos prohibidos del contexto: no.** No aparecen saber, servir, evitar, garantizar, reducir, adelantar, certificar ni «contratar mejor». Los verbos son se le fue, pídale, explique, marcó, preguntarle, escribió, explica y pide.
segundos: 46
