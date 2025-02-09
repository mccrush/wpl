export const getWeek = () => {
  let d = new Date();
  // Копируем дату, чтобы не изменять исходную
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Устанавливаем начало недели на понедельник
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Получаем год начала года
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Вычисляем номер недели
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}