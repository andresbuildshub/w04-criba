// Semana 14 — la conversación REAL de precio con un pagador potencial.
// REGLA: aquí solo entra lo que pasó con una persona real, escrito el mismo día. Rol, nunca nombre.
// Nunca se llena con un ejemplo inventado. Mientras esté vacío, /about dice PENDIENTE.
//
// Formato de cada entrada (para Andrés, después de la llamada):
// {
//   dia: '2026-11-12',
//   quien: 'Socio de despacho de N personas, vacante de auxiliar en LinkedIn',  // rol, no nombre
//   canal: 'LinkedIn a quien publicó la vacante',
//   finalistas: 3,                       // respuesta a "¿a cuántas finalistas entrevistaste la última vez?"
//   semanaQueSeEntero: 'semana 3, por un cliente',   // de su última mala contratación
//   costoHistoria: 'lo que dijo que costó, en sus palabras',
//   precioPreguntado: 490,
//   resultado: 'SÍ AL PRECIO' | 'USÓ LO GRATIS' | 'NO',
//   palabras: 'sus palabras exactas',
//   razon: 'si fue no: por qué, en sus palabras',
//   queCambia: 'qué hace esto al precio (según la regla escrita antes)',
// }
export const CONVERSACIONES = [
  {
    dia: '2026-11-15',
    quien: 'Dueño de un negocio pequeño que contrató hace poco',
    canal: 'WhatsApp, con el guion de 3 preguntas',
    finalistas: 2,
    semanaQueSeEntero: 'semana 2–3',
    precioPreguntado: 490,
    resultado: 'USÓ LO GRATIS',
    palabras: 'La primera gratis, claro. Los 490, me inclino a que sí, pero depende.',
    razon: '',
    queCambia: 'Se enteró en la semana 2–3: queda entre la banda de 190 y la de 490. No reportó daño de un cliente, y no dijo que sí sin preguntar. El precio se queda en MX$490 para la siguiente conversación; si la siguiente también se entera en la semana 1–2 sin daño de cliente, baja a MX$190. Su "depende" es la pregunta para la siguiente: ¿de qué depende?',
  },
]

export const REGLA = {
  guion: [
    'Su última mala contratación: "¿cuándo fue la última vez que dejaste ir a alguien en los primeros meses? ¿en qué semana te diste cuenta, y cómo?"',
    '"La última vez, ¿a cuántas finalistas entrevistaste?" (antes del precio)',
    'El número, siempre, aunque prediga un no: "La primera candidata te sale gratis. Si en esta vacante quieres probar a una segunda, son 490. ¿Los pagarías?"',
  ],
  resultados: [
    ['SÍ AL PRECIO', 'abre una segunda ventana para esta vacante y deja un correo para el recibo'],
    ['USÓ LO GRATIS', 'abre solo la primera ventana: mide que sirve, no que vale 490'],
    ['NO', 'no abre nada; se anotan sus palabras y su razón'],
  ],
  cambios: [
    'Se enteró en la semana 1–2 y ningún cliente lo supo → la siguiente conversación a MX$190',
    'Semana 3–4 con trabajo rehecho → se queda en MX$490',
    'Se enteró por el cliente o el SAT con más de MX$5,000 de daño, o dice sí sin preguntar qué incluye ni pedir descuento → la siguiente a MX$890',
    'Dos "no, es caro", a 490 y a 890 → el precio está alto y la cortesía no era el problema',
    'Nadie contestó → se anota "0 de 5 respondieron" y el memo se queda en 2.4:1, todo supuesto',
  ],
}
