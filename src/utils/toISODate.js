export default function toISODate(date) {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5);
  const year = date.slice(6, 10);
  const newDate = new Date(year, month - 1, day);

  return newDate;
}
