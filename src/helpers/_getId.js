import { getShortYear } from './getShortYear'
import { getWeek } from './getWeek'

export default () => {
  const now = new Date();


  /*
  // Получаем номер недели в году (WW)
  const startOfYear = new Date(now.getFullYear(), 0, 1); // Начало года
  const pastDaysOfYear = (now - startOfYear) / 86400000; // Прошедшие дни с начала года
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7); // Номер недели
  const formattedWeek = String(weekNumber).padStart(2, '0'); // Добавляем ведущий ноль, если нужно
  */

  const formattedWeek = String(getWeek()).padStart(2, '0');

  // Получаем номер дня недели (DD)
  const dayOfWeek = now.getDay() || 7; // Воскресенье = 7, понедельник = 1
  const formattedDay = String(dayOfWeek).padStart(2, '0'); // Добавляем ведущий ноль, если нужно

  // Собираем результат в формате YYYYWWDD
  return `${getShortYear()}${formattedWeek}${formattedDay}`;
}