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
export const CONVERSACIONES = []

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
