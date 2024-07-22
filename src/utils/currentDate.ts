export function currentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // los meses se cuentan desde 0
  const day = currentDate.getDate();

  return `${year}-${month}-${day}`
}