import { getLocation } from "./location.js";
import { updateSnapshot } from "./domManipulation.js";
// import { createHourlyForecast } from "./domManipulation.js";
import { createDailyForecast } from "./domManipulation.js";
// import { search } from "./search.js";

const searchInputRef = document.getElementById("search-input");
const searchBtnRef = document.getElementById("search-btn");
const myLocationBtn = document.getElementById("location-btn");
const errorRef = document.getElementById("search-error");

let search = "";

async function getData(search) {
  //loading spinner to go here
  let place = search;

  try {
    if (!search) {
      const location = await getLocation();
      const { latitude, longitude } = location.coords;
      place = `${latitude},${longitude}`;
    }
    //get daily weather
    const dailyWeatherResults = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=3129da10a0a24553a47152953231912&q=${place}&days=5&aqi=no&alerts=no`
    );
    const { forecastday } = dailyWeatherResults.data.forecast;
    const { data } = dailyWeatherResults;

    updateSnapshot(data, forecastday);

    createDailyForecast(forecastday);
  } catch (err) {
    // still want to add DOM stuff for the error message
    console.log("error with weather API");
    console.log(err);
  }
}
getData();

// listen for input to search
searchInputRef.addEventListener("input", (e) => {
  search = e.target.value;
});

searchBtnRef.addEventListener("click", (e) => {
  e.preventDefault();

  // add defensive check here for contains numbers and length? what do I do about multiple places?
  if (onlyLettersAndSpaces(search) === false) {
    errorRef.innerHTML = "please search using only letters and spaces";
  }
  console.log(search);

  getData(search);
});

myLocationBtn.addEventListener("click", () => {
  getData();
});

function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}
