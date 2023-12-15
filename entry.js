import { getLocation } from "./location.js";
// import { updateDOM } from "./domManipulation.js";
import { GetHoursandMins } from "./domUtils.js";

// Upper scope variables
const todayRef = document.getElementById("today");
const placeRef = document.getElementById("place");
const todayHourlyRef = document.getElementById("today-hourly");
const todayHourlyForecastRef = document.querySelector("#today-hourly-forecast");

async function getData(latitude, longitude) {
  //put some kind of loader here

  try {
    const location = await getLocation();
    const { latitude, longitude } = location.coords;
    // const params =
    //   "waveDirection,waveHeight,airTemperature,waterTemperature,swellPeriod";

    const weatherResults = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3da0b387c5b2d581708f65391659f831`
    );
    console.log(weatherResults.data);

    const fiveDayWeatherResults = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=3da0b387c5b2d581708f65391659f831`
    );
    console.log(fiveDayWeatherResults.data);

    // const { data } = await axios.get(
    //   `https://api.stormglass.io/v2/weather/point?lat=${latitude}&lng=${longitude}&params=${params}`,
    //   {
    //     headers: {
    //       Authorization:
    //         "58718e26-9876-11ee-950b-0242ac130002-58718ec6-9876-11ee-950b-0242ac130002",
    //     },
    //   }
    // );
    // console.log(data);

    //DOM MANIPULATION

    function updateDOM() {
      const { name } = weatherResults.data;
      placeRef.innerHTML = `<h1>${name}</h1><p>live</p>`;

      const { description } = weatherResults.data.weather[0];
      const { main } = weatherResults.data.weather[0];
      const { temp } = weatherResults.data.main;
      const { icon } = weatherResults.data.weather[0];
      const tempinDeg = temp - 273.15;
      const { sunrise, sunset } = weatherResults.data.sys;
      const { speed } = weatherResults.data.wind;
      const { deg } = weatherResults.data.wind;
      const humanFormatSunrise = new Date(sunrise * 1000);
      const humanFormatSunset = new Date(sunset * 1000);
      todayRef.innerHTML = `
                          <div class="flex-container "today-widget">
                              <div class= "today-icon-temp">
                                <img class = "today-icon" src="images/icons/${icon}.png">
                                <p class="description">${description}</p>
                                <h3> ${Math.floor(tempinDeg)} &degC</h3> 
                              </div>

                              <div class= "today-info">
                                <div class= "info-card">
                                  <p class= "sunrise">Sunrise: ${GetHoursandMins(
                                    humanFormatSunrise
                                  )}</p>
                                  <p> Sunset: ${GetHoursandMins(
                                    humanFormatSunset
                                  )}</p>
                                </div>
                                <div class= "info-card">
                                   <p> Wind speed: ${Math.floor(
                                     speed * 2.237
                                   )}mph</p> 
                
                                   <p> Wind direction: ${deg}&deg</p> 
                                </div>
                                <div class= "info-card">
                                   <div>
                                  <h4>Nearest surf location</h4>
                                  <p>Cromer</p>
                                  </div>
                                  <div>
                                   <p>wave height: 0.8m</p>
                                   <img class = ""src="images/small-wave.png">
                                   </div>
                                   <p>wave period: 12s</p>
                                   
                                   
                                </div>
                                
                              </div>
                          </div>`;

      const { list } = fiveDayWeatherResults.data;
      const next24H = list.slice(0, 7);
      console.log(next24H);

      function createHourlyForecast() {
        next24H.forEach((item) => {
          //time
          const times = item.dt;
          const humanFormatTimes = new Date(times * 1000);
          const everyThreeHours = GetHoursandMins(humanFormatTimes);
          const icons = item.weather[0].icon;
          const hourlyTemp = Math.floor(item.main.temp - 273.15);
          console.log(hourlyTemp);

          todayHourlyForecastRef.innerHTML += `
                                      <div class="hourly-forecast-items">
                                      <img class="hourly-icons" src="images/icons/${icons}.png">
                                      <h4>${hourlyTemp}&degC</h4>
                                      <p class="today-hourly-time">${everyThreeHours}</p>
                                      
                                      </div>
                                      `;
        });
      }
      createHourlyForecast();
    }

    updateDOM();
  } catch (err) {
    console.log("error with weather API");
  }
}

getData();
