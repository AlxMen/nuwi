/**
 * funcion para adjuntar al registro de un documento o creacion de una instancia la fecha actual de ese dia
 * @returns 
 */
export function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // los meses se cuentan desde 0
  const day = currentDate.getDate();

  return `${year}-${month}-${day}`
}