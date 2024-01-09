// import { format } from "https://unpkg.com/date-fns/format.mjs";
import { format } from "./node_modules/date-fns/format.mjs";

const placeRef = document.querySelector(".place-name");
const placeIconRef = document.querySelector(".snapshot-icon");
const placeTempRef = document.querySelector(".snapshot-temp");
const placeDescRef = document.querySelector(".snapshot-desc");
const dayContainerRef = document.querySelector(".day-panel-container");
const hourlyWeatherRef = document.querySelector(".hourly-weather");
const sunriseRef = document.getElementById("today-sunrise");
const sunsetRef = document.getElementById("today-sunset");
const chanceOfRainRef = document.getElementById("chance-of-rain");
const adviceRef = document.getElementById("advice");
let panelsRef;

export function updateSnapshot(data, forecastday) {
  const place = data.location.name;
  const placeIconLink = data.current.condition.icon;
  const placeIcon = placeIconLink.substring(placeIconLink.length - 7);
  const _night = "night";
  const _day = "day";

  if (placeIconLink.includes(_night)) {
    placeIconRef.innerHTML = `<img src="images/night/${placeIcon}" alt="current weather icon">`;
  } else if (placeIconLink.includes(_day)) {
    placeIconRef.innerHTML = `<img src="images/day/${placeIcon}" alt="current weather icon">`;
  }

  const placeDesc = data.current.condition.text;
  const placeTemp = data.current.temp_c;
  const chanceOfRain = forecastday[0].day.daily_chance_of_rain;
  const sunrise = forecastday[0].astro.sunrise;
  const sunset = forecastday[0].astro.sunset;

  placeRef.innerHTML = `${place}`;

  placeDescRef.innerHTML = `<h4>${placeDesc}</h4>`;
  placeTempRef.innerHTML = `${placeTemp} &degC`;

  sunriseRef.innerHTML = `${sunrise}`;
  sunsetRef.innerHTML = `${sunset}`;
  chanceOfRainRef.innerHTML = `${chanceOfRain}%`;
  if (chanceOfRain === 0) {
    adviceRef.innerHTML = `Enjoy a clear day!`;
  } else if (chanceOfRain === 100) {
    adviceRef.innerHTML = `Keep your umbrella handy`;
  } else if (chanceOfRain > 50) {
    adviceRef.innerHTML = `it's likely to rain, pack an umbrella`;
  } else if (chanceOfRain < 51) {
    adviceRef.innerHTML = `It's unlikely to rain today`;
  }
  console.log(data);
}

export function createDailyForecast(forecastday) {
  console.log(forecastday);
  //map over the 5 day forecast data and extract the bits I want to display
  dayContainerRef.innerHTML = "";
  forecastday.map((item, index) => {
    //get day
    const day = item.date;
    const dayText = format(day, "EEEE");
    const abbrevdayText = dayText.substring(0, 3);
    // get decription
    const dailyDescription = item.day.condition.text;
    // getIcon
    const iconURL = item.day.condition.icon;
    const dailyIcon = iconURL.substring(iconURL.length - 7);
    const _night = "night";
    const _day = "day";
    let iconHTML = "";

    if (iconURL.includes(_night)) {
      iconHTML = `<img class="daily-icon" id=${index} src="images/night/${dailyIcon}" alt="current weather icon">`;
    } else if (iconURL.includes(_day)) {
      iconHTML = `<img class="daily-icon" id=${index} src="images/day/${dailyIcon}" alt="current weather icon">`;
    }

    // get min and max temp
    const maxTemp = Math.floor(item.day.maxtemp_c);
    const minTemp = Math.floor(item.day.mintemp_c);

    //populate DOM with data
    dayContainerRef.innerHTML += `
    <div id="${index}" class="day-panel">
    <div id="${index}"class="weather-summary">
      <h3 id="${index}"class="day-text">${abbrevdayText}</h3>
      <p id="${index}"class="description">${dailyDescription}</p>
      <div>
      ${iconHTML}
      <p id="${index}"class="temp">${minTemp}&deg/${maxTemp}&deg</p>
      </div>
    </div>
  </div>
    `;
  });

  //setting initial hourly weathr pre click
  panelsRef = document.querySelectorAll(".day-panel");

  hourlyWeatherRef.innerHTML = "";
  //   });
  forecastday.forEach((day, index) => {
    setHourlyWeather(day, index);
  });

  panelsRef[0].classList.add("active");
  hourlyWeatherRef.children[0].style.display = "flex";

  document
    .getElementById("day-panel-container")
    .addEventListener("click", (e) => {
      Array.from(panelsRef).forEach((child) => {
        child.classList.remove("active");
      });
      panelsRef[e.target.id].classList.add("active");
      Array.from(hourlyWeatherRef.children).forEach((child) => {
        child.style.display = "none";
      });
      hourlyWeatherRef.children[e.target.id].style.display = "flex";
    });
}

function setHourlyWeather(weekday, index) {
  // highlight active day
  let html = "";
  //use index of each panel from foreach to link to correct data from forecast array
  weekday.hour.forEach((item) => {
    const dayHour = format(item.time, "HH:mm");
    const hourlyTemp = Math.floor(item.temp_c);
    const hourlyIconURL = item.condition.icon;
    const hourlyIcon = hourlyIconURL.substring(hourlyIconURL.length - 7);
    const _night = "night";
    const _day = "day";
    let hourlyIconHTML = "";

    if (hourlyIconURL.includes(_night)) {
      hourlyIconHTML = `<img class="hourly-icon" src="images/night/${hourlyIcon}" alt="current weather icon">`;
    } else if (hourlyIconURL.includes(_day)) {
      hourlyIconHTML = `<img class="hourly-icon" src="images/day/${hourlyIcon}" alt="current weather icon">`;
    }

    html += `
      <div class="hourly">
      ${hourlyIconHTML}
      <h3>${hourlyTemp}&degC</h3>
      <p class="today-hourly-time">${dayHour}</p>
      </div>
      `;
  });

  hourlyWeatherRef.innerHTML += `<div id="${index}" class="day">${html}</div>`;
}
