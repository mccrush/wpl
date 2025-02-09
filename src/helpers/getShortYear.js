export const getShortYear = () => {
  const now = new Date();

  // Получаем год (YYYY)
  const year = now.getFullYear();

  const formattedYear = String(year).slice(2)

  return formattedYear
}