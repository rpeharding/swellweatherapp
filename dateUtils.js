export function getDayName(date) {
  const day = new Date(date).getDay();
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return week[day];
}

export function timetoHoursMins(date) {
  const dateObject = new Date(date);
  let hours = dateObject.getHours().toString();
  let minutes = dateObject.getMinutes().toString();
  hours = hours.padStart(2, 0);
  minutes = minutes.padStart(2, 0);
  return hours + `:` + minutes;
}
