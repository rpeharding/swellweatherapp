import { GetHoursandMins } from "./domUtils.js";
import { GetDay } from "./domUtils.js";

const placeRef = document.getElementById("place");
const todayHourlyForecastRef = document.querySelector("#today-hourly-forecast");
const todayOverviewRef = document.querySelector(".today-overview");
const todayInfoRef = document.querySelector(".today-info");
const dayRef = document.querySelector(".day");

export function updateDOM(
  name,
  icon,
  description,
  tempinDeg,
  humanFormatSunrise,
  humanFormatSunset,
  speed,
  deg
) {
  placeRef.innerHTML = `<h1>${name}</h1><p>live</p>`;

  todayOverviewRef.innerHTML = `
                              <img class = "today-icon" src="images/icons/${icon}.png">
                              <p class="description">${description}</p>
                              <h3> ${Math.floor(tempinDeg)} &degC</h3> `;

  const firstInfoCard = todayInfoRef.firstElementChild;
  firstInfoCard.innerHTML = `                               
                                <p class= "sunrise">Sunrise: ${GetHoursandMins(
                                  humanFormatSunrise
                                )}</p>
                                <p> Sunset: ${GetHoursandMins(
                                  humanFormatSunset
                                )}</p>
                             `;

  const secondInfoCard = firstInfoCard.nextElementSibling;
  secondInfoCard.innerHTML = `                       
                                <p> Wind speed: ${Math.floor(
                                  speed * 2.237
                                )}mph</p> 
                                 <p> Wind direction: ${deg}&deg</p> 
                              
                          `;

  todayInfoRef.lastElementChild.innerHTML = `
                                <p>placeholder</p>
                                <p>placeholder</p>
                              `;
}

export function createHourlyForecast(next24H) {
  next24H.forEach((item) => {
    //time
    const times = item.dt;
    const humanFormatTimes = new Date(times * 1000);
    const everyThreeHours = GetHoursandMins(humanFormatTimes);
    const icons = item.weather[0].icon;
    const hourlyTemp = Math.floor(item.main.temp - 273.15);
    console.log(hourlyTemp);

    todayHourlyForecastRef.innerHTML += `
                                  <div>
                                  <img class="hourly-icons" src="images/icons/${icons}.png">
                                  <h4>${hourlyTemp}&degC</h4>
                                  <p class="today-hourly-time">${everyThreeHours}</p>
                                  </div>
                                  `;
  });
}

export function createDailyForecast(fourNextDays) {
  fourNextDays.forEach((item) => {
    let _date = item.date;
    let dateEpoch = item.date_epoch;
    console.log(dateEpoch);

    const maxTemp = Math.floor(item.day.maxtemp_c);
    const minTemp = Math.floor(item.day.mintemp_c);
    const rainChance = item.day.daily_chance_of_rain;
    const iconURL = item.day.condition.icon;
    const dailyIcon = iconURL.substring(39, 46);
    const dailyDescription = item.day.condition.text;
    _date = GetDay(_date);
    _date = _date.substring(0, 3);

    dayRef.innerHTML += `
    <details class= "dayAbbrev">
    <summary class="summaryDay">
    <div class="flex">
    ${_date} 
    <img class = "daily-weather-icon" alt="weather-icon" src="images/icons/64x64/day/${dailyIcon}">
    <p class ="min-max-temp">${minTemp}&deg / ${maxTemp}&deg</p>
    <p class ="daily-desc">${dailyDescription}</p>
    </div>
    </summary>
    details here
    </details>
    `;
    console.log(
      _date,
      maxTemp,
      minTemp,
      rainChance,
      dailyDescription,
      dailyIcon,
      iconURL
    );
  });
}
