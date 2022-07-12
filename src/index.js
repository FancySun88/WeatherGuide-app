function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hours}:${minutes}`;
  return `${time}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#users-input");
  search(cityInputElement.value);
}

function search(city) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let string = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#city").innerHTML = string;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(showForecast);
}

function formatTimeStamp(timestamp) {
  let dateForecast = new Date(timestamp * 1000);
  let day = dateForecast.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="Forecast-day">${formatTimeStamp(forecastDay.dt)}</div>
      <div class="Forecast-description"></div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" class="forecast-img" />
      <div class="Weather-forecast-temperature">
        <span class="Forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span> /
        <span class="Forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPositionWeather);
}

function getCurrentPositionWeather(position) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCityOneWeather(event) {
  event.preventDefault();
  search("Kyiv");
}

function searchCityTwoWeather(event) {
  event.preventDefault();
  search("Amsterdam");
}

function searchCityThreeWeather(event) {
  event.preventDefault();
  search("Valletta");
}

function searchCityFourWeather(event) {
  event.preventDefault();
  search("Poznan");
}
function forecastConvertToFarehrenheit(event) {
  event.preventDefault();
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let fahrenheit = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let apiKey = "6b45fead1f572a2847620f61855bb862";
let city = "Kyiv";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = document.querySelector("#day");
day.innerHTML = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = document.querySelector("#date");
date.innerHTML = now.getDate();

let month = document.querySelector("#month");
month.innerHTML = months[now.getMonth()];

let year = document.querySelector("#year");
year.innerHTML = now.getFullYear();

let time = document.querySelector("#time");
time.innerHTML = formatDate();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentPosisitionButton = document.querySelector("#button-geoposition");
currentPosisitionButton.addEventListener("click", getCurrentLocation);

let cityOne = document.querySelector("#defaultCityOne");
cityOne.addEventListener("click", searchCityOneWeather);

let cityTwo = document.querySelector("#defaultCityTwo");
cityTwo.addEventListener("click", searchCityTwoWeather);

let cityThree = document.querySelector("#defaultCityThree");
cityThree.addEventListener("click", searchCityThreeWeather);

let cityFour = document.querySelector("#defaultCityFour");
cityFour.addEventListener("click", searchCityFourWeather);

let celsiusTemp = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", convertToCelsius);

search("Kyiv");
