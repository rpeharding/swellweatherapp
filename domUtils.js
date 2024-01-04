// date conversions
export function GetHoursandMins(time) {
  const formattedDate = dateFns.format(time, "HH:mm");
  return `${formattedDate}`;
}

//
export function GetDay(d) {
  const formattedDate = dateFns.format(d, "EEEE");
  return `${formattedDate}`;
}

// export function GetDayTime(t) {
//   const hours = new Date().getHours
//   return `${formattedDate}`;
// }
