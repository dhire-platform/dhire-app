export const changeToMonth = (date: Date) => {
  let monthName = date.toLocaleString('default', { month: 'short' });
  let year = date.getFullYear();
  return monthName + ' ' + year;
};
