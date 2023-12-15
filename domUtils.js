import {
  compareAsc,
  format,
  add,
  parse,
  isBefore,
  startOfDay,
  endOfMonth,
  startOfMonth,
  sub,
  differenceInDays,
  differenceInYears,
  isSameMonth,
  isThisMonth,
  endOfDecade,
  isValid,
  formatDistance,
  lastDayOfDecade,
} from "https://cdn.skypack.dev/date-fns";
import formatDistanceToNowStrict from "https://cdn.skypack.dev/date-fns/formatDistanceToNowStrict";

import { zhCN } from "https://cdn.skypack.dev/date-fns/locale";

// export function GetHoursandMins(time) {
//   const hours = time.getHours();
//   const minutes = time.getMinutes();
//   return `${hours}:${minutes}`;
// }

export function GetHoursandMins(time) {
  const formattedDate = format(time, "HH:mm");
  return `${formattedDate}`;
}
