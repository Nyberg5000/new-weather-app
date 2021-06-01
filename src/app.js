function updateForecast(coordinates) {
  let apiKey = "6564272724482451c8ea4a6b9bde60dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function updateDate() {
  let todayDate = document.querySelector("#date");
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  todayDate.innerHTML = `${currentDay} ${hours}:${minutes}`;
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
function forecastWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id="forecast-day">
          <div class="forecast-day-only">
     ${forecastWeekday(dayForecast.dt)} <br>
     </div>
     <img src="http://openweathermap.org/img/wn/${
       dayForecast.weather[0].icon
     }@2x.png" alt="icon" id="forecast-icon"> <br>
     <div class="forecast-temp-min-max">
     <span class="forecast-temp-min"> ${Math.round(
       dayForecast.temp.min
     )}°</span> ${Math.round(dayForecast.temp.max)}° </div>
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", findCity);

getCity("Copenhagen");
updateDate();
