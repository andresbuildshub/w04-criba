## Tabla

| Afirmación del borrador | Cita literal de la fuente | Archivo | Veredicto |
|---|---|---|---|
| franja: «Para despachos contables» | `Para socios de despacho contable` | `app/despachos/page.js:21` | PASA |
| franja: «· ejemplo» | `La entrega es un ejemplo` (pie anterior de la pieza) y `JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO.` | `lib/piezas.js:108`, `lib/demo.js:1` | PASA |
| pie 1: «Ejemplo inventado: esta finalista no existe.» | `Esta entrega es de UNA finalista que no existe.` y `quien: 'Finalista de demostración (no existe)'` | `lib/demo.js:4`, `lib/demo.js:11` | PASA |
| pie 1: «Con la suya, la pantalla es la misma.» | `Con su finalista, la pantalla es la misma.` Pero `/verificar` no importa `Entrega` (solo `firma`, `convocatorias`, `muestra`, `Evento`, `Link`), y ahí el mensaje va plegado: `<summary …>Lo que escribió al cliente (tal cual)</summary>` | `app/despachos/page.js:28`, `app/verificar/page.js:1-5`, `app/verificar/page.js:44` | DICE MÁS QUE LA FUENTE: mismos datos, otro componente y otro acomodo en /verificar |
| pie 2: «Usted le manda el enlace por WhatsApp.» | `Listo. Mándele esto a su candidata por WhatsApp:` y `El enlace lo manda usted, desde su WhatsApp.` | `app/convocar/page.js:71`, `app/convocar/page.js:88` | PASA |
| pie 2: «La primera ventana de cada vacante es gratis.» | `Precio: la primera ventana de cada vacante es gratis; las demás, MX$490 por vacante` | `app/despachos/page.js:48` | PASA |
| pie 3: «w04-criba.vercel.app/despachos» | `export const BASE = 'https://w04-criba.vercel.app'` y la ruta existe: `export default function Despachos()` | `lib/piezas.js:7`, `app/despachos/page.js:16` | PASA |

## Alertas

- **(a) Posesivos que afirman autoría o cercanía: sí, pero leve.** En «Con la suya», «la suya» quiere decir «su finalista». La promesa fija usa el mismo posesivo («su finalista») y no habla de autoría, así que se puede quedar. No aparece «su trabajo» ni «su cliente».
- **(b) Dos oraciones que juntas prometen algo que ninguna promete sola: sí.** Juntas, «Usted le manda el enlace por WhatsApp.» y «w04-criba.vercel.app/despachos» dan a entender que el enlace que se le manda a la finalista es `/despachos`. En realidad ese enlace se crea en `/convocar` (`app/convocar/page.js:71`). Además, «el enlace» no tiene antecedente en la imagen: ninguna línea dice que antes hay que abrir una ventana. La versión anterior sí lo decía y se quitó.
- **(c) Cifras sin fuente: no.** El único número es «primera», y tiene fuente (`app/despachos/page.js:48`). La franja ya no trae «Serie 2».
- **(d) Algo que convierta la entrega en un juicio sobre la persona: no.**
- **(e) Verbos prohibidos del contexto: no.** No aparecen saber, servir, evitar, garantizar, reducir, adelantar, certificar ni «contratar mejor».

Fuera de lo que se pidió verificar: el enlace del pie 3 no lleva `?f=`. Los mensajes que acompañan la pieza sí lo llevan (`${BASE}/despachos?f=tibio_b`, `lib/piezas.js:116`), así que una visita que llegue tecleando lo que dice la imagen no queda atribuida a la Pieza B.
segundos: 64
