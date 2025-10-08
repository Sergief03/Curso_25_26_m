/**
 *
 * @param {Object} prod - Objeto Data
 * @returns {Object} - Objeto con informacion extraida
 */
export function extraerDatos(prod) {
  const {
    nombre,
    fabricante: { nombre: nombreFab, contacto },
    especificaciones: { ram },
  } = prod;

  return {
    nombre,
    nombreFab,
    contacto,
    ram,
  };
}
