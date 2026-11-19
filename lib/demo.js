// Semana 15 — JUEGO DE DEMOSTRACIÓN. TODO ES INVENTADO.
// Regla: ninguna pieza de distribución usa el juego de 20 de lib/muestra.js (la clave cabría en un WhatsApp)
// ni la entrega de una candidata real (Condición 6: la evidencia nunca se convierte en la persona).
// Esta entrega es de UNA finalista que no existe. Nunca hay dos en la misma pantalla.
// Los cuatro TIPOS de error son los de la rúbrica pública v0.1 (/rubrica); los folios y el cliente son otros.
// Límite declarado: estas reglas fiscales no las revisó un contador titulado.

export const DEMO_CLIENTE = { nombre: 'Papelería La Esquina, S.A. de C.V.', periodo: 'octubre 2026', contacto: 'don Ernesto' }

export const DEMO_ENTREGA = {
  quien: 'Finalista de demostración (no existe)',
  despacho: 'Despacho de demostración',
  registrado: 'un martes de noviembre',
  dentroDeVentana: true,
  // Lo que marcó y sí estaba mal (tipos públicos de la rúbrica)
  encontro: [
    'gasto pagado en efectivo que no se deduce así',
    'consumo en restaurante al 100% (solo 8.5%)',
    'inversión (activo fijo) registrada como gasto',
  ],
  // Lo que estaba mal y no marcó
  seLeFue: ['factura emitida a otro RFC'],
  // Lo que marcó y estaba bien
  deMas: [{ folio: 'DM-0412', concepto: 'Garrafones de agua, $640 en efectivo', nota: 'Estaba bien clasificada: menor a $2,000, el efectivo se permite.' }],
  pasaRegla: true, // 3 o más, y a lo sumo una de más
  verificacionesMensaje: { cumplidas: 5, total: 6 },
  asistencia: 'consultó leyes o apuntes',
  mensaje: 'Buenas tardes, don Ernesto. Revisé las facturas de octubre y hay tres que tenemos que corregir. La gasolina del día 3 se pagó en efectivo y así no se puede deducir; de aquí en adelante hay que pagarla con tarjeta. La comida con el proveedor no es deducible al cien por ciento, solo el 8.5. Y la computadora nueva no va como gasto del mes: es activo fijo y se deprecia. ¿Me confirma para hacer los ajustes antes del cierre? Gracias.',
}

// Folios del juego de demostración (para comprobar en pruebas que no se cruzan con el juego de 20).
export const DEMO_FOLIOS = ['DM-0403', 'DM-0407', 'DM-0412', 'DM-0419', 'DM-0421']
