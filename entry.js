import { getLocation } from "./location.js";
import { GetHoursandMins } from "./domUtils.js";
import { updateDOM } from "./domManipulation.js";
import { createHourlyForecast } from "./domManipulation.js";
import { createDailyForecast } from "./domManipulation.js";
import { GetDay } from "./domUtils.js";

// Upper scope variables

// const dayRef = document.querySelectorAll(".day");

async function getData(latitude, longitude) {
  //put some kind of loader here

  try {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;

    const weatherResults = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3da0b387c5b2d581708f65391659f831`
    );

    const fiveDayWeatherResults = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=3da0b387c5b2d581708f65391659f831`
    );

    const dailyWeatherResults = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=3129da10a0a24553a47152953231912&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`
    );
    const { forecastday } = dailyWeatherResults.data.forecast;
    const { current } = dailyWeatherResults.data;
    const fourNextDays = forecastday.slice(1, 5);
    console.log(fourNextDays);

    //DOM MANIPULATION
    const { name } = weatherResults.data;
    const { description } = weatherResults.data.weather[0];
    const { temp } = weatherResults.data.main;
    const { icon } = weatherResults.data.weather[0];
    const tempinDeg = temp - 273.15;
    const { sunrise, sunset } = weatherResults.data.sys;
    const { speed, deg } = weatherResults.data.wind;
    const humanFormatSunrise = new Date(sunrise * 1000);
    const humanFormatSunset = new Date(sunset * 1000);
    const { list } = fiveDayWeatherResults.data;
    const next24H = list.slice(0, 7);

    updateDOM(
      name,
      icon,
      description,
      tempinDeg,
      humanFormatSunrise,
      humanFormatSunset,
      speed,
      deg
    );

    createHourlyForecast(next24H);

    createDailyForecast(fourNextDays);
  } catch (err) {
    console.log("error with weather API");
  }
}

getData();
