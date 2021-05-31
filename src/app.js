function updateForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6564272724482451c8ea4a6b9bde60dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
  console.log;
}

function showTemperature(response) {
  let icon = response.data.weather[0].icon;
  document
    .querySelector("#weather-icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  updateForecast(response.data.coord);
}

function getCity(city) {
  let apiKey = "6564272724482451c8ea4a6b9bde60dd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name").value;
  getCity(city);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#city-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureDisplay.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureDisplay = document.querySelector("#city-temp");
  temperatureDisplay.innerHTML = celsiusTemperature;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let weatherForecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class= "row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2" id="forecast-day">
          <div class="forecast-day-only">
     ${day} <br>
     </div>
     <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon" id="forecast-icon"> <br>
     <div class="forecast-temp-min-max">
     <span class="forecast-temp-min">  15°/</span>20° </div>
     </div>`;
    forecastHTML = forecastHTML + `</div>`;
    weatherForecast.innerHTML = forecastHTML;
  });
}

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", findCity);

let todayDate = document.querySelector("#date");
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
todayDate.innerHTML = `${currentDay} ${hours}:${minutes}`;

let celsiusTemperature = null;

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", convertFahrenheit);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", convertCelsius);

getCity("Copenhagen");
