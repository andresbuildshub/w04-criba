## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| "Usted le manda un enlace a su finalista por WhatsApp." | "Listo. Mándele esto a su candidata por WhatsApp:" / "El enlace lo manda usted, desde su WhatsApp." | `app/convocar/page.js:71`, `:88` | PASA |
| "Ella revisa 20 facturas" | "Revisa lo que clasificó el agente" / "Un agente SIMULADO clasificó sus 20 CFDIs." | `app/muestra/Muestra.js:47`, `:49` | PASA. Ojo: "revisa" no es un verbo que la ventana registre (regla de voz 1). |
| "con 60 minutos." | "una vez abierto, da <b>60 minutos</b>" / `export const VENTANA_MIN = 60` | `app/convocar/page.js:34`; `lib/convocatorias.js:17` | PASA. Omite "una vez abierto" y las 24 h para abrirlo. |
| "Usted ve cuáles errores encontró" | "Encontró <b>{intento.aciertos.length} de 4</b>: {intento.aciertos.map(i => TIPO[i]).join('; ') \|\| 'ninguno'}." | `app/verificar/page.js:39` | PASA contra el archivo. Ojo: el contexto solo admite "marcó"; "encontró" no está en esa lista. |
| "y cuáles se le fueron." | "Se le fue: <b>{intento.omitidos.length ? intento.omitidos.map(i => TIPO[i]).join('; ') : 'ninguno'}</b>." | `app/verificar/page.js:40` | PASA |
| "La primera de cada vacante es gratis." | "la primera ventana de esta vacante es <b>gratis</b>." / "El primero es gratis" | `app/convocar/page.js:40`, `:55` | DICE MÁS QUE LA FUENTE: la fuente dice "esta vacante", no "cada". Tampoco dice "ventana", así que "la primera" parece referirse a la finalista. |

## Alertas

- **(a) Posesivos que afirman autoría o cercanía: no.** "su finalista" solo dice a quién se manda el enlace. No hay "su trabajo" ni "su cliente".
- **(b) Dos oraciones que juntas prometen algo: sí.** "Usted le manda un enlace a su finalista por WhatsApp." más "La primera de cada vacante es gratis." se lee como "mande uno solo y no paga". La fuente advierte lo contrario: "Si solo la hace una, esa es la única con errores a la vista y las demás no muestran ninguno: le perjudica tenerla." (`app/convocar/page.js:39`). La línea tampoco menciona "De la segunda a la décima: <b>MX$490 por toda la vacante</b>" (`:40`).
- **(c) Cifras sin fuente: no.** El 20 y el 60 tienen cita y "la primera" sale de `:40`.
- **(d) Algo que juzgue a la persona: no.** "se le fueron" es el verbo permitido. "encontró" no juzga, pero queda fuera de la lista de verbos (ver tabla).
- **(e) Verbos prohibidos: no.** No aparece saber, servir, evitar, garantizar, reducir, adelantar, certificar ni "contratar mejor".

Fuera de la cita, dos cosas para quien reescribe:
- La línea ya no dice dónde se consigue el enlace, y la ronda 2 falló justo en eso. En la fuente, el enlace sale de "Crear el enlace de un solo uso" (`app/convocar/page.js:66`).
- La promesa tiene tres partes y la línea deja fuera la tercera, "qué le escribió al cliente del ejercicio". La fuente sí la tiene: "lo que le escribió al cliente del ejercicio" (`app/convocar/page.js:79`).
segundos: 54
