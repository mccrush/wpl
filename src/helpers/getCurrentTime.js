export const getCurrentTime = () => {
  const now = new Date();

  // Получаем часы и минуты
  const hours = String(now.getHours()).padStart(2, '0'); // Добавляем ведущий ноль, если нужно
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Добавляем ведущий ноль, если нужно

  // Возвращаем время в формате HH:MM
  return `${hours}:${minutes}`;
}