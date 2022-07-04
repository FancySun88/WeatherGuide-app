function showWeather(response) {
  console.log(response.data);
  let string = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#city").innerHTML = string;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

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

let apiKey = "6b45fead1f572a2847620f61855bb862";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

search("Kyiv");

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

let currentPosisitionButton = document.querySelector("#button-geoposition");
currentPosisitionButton.addEventListener("click", getCurrentLocation);

let cityOne = document.querySelector("#defaultCityOne");
cityOne.addEventListener("click", searchCityOneWeather);

function searchCityOneWeather(event) {
  event.preventDefault();
  search("Kyiv");
}

let cityTwo = document.querySelector("#defaultCityTwo");
cityTwo.addEventListener("click", searchCityTwoWeather);

function searchCityTwoWeather(event) {
  event.preventDefault();
  search("Amsterdam");
}

let cityThree = document.querySelector("#defaultCityThree");
cityThree.addEventListener("click", searchCityThreeWeather);

function searchCityThreeWeather(event) {
  event.preventDefault();
  search("Valletta");
}

let cityFour = document.querySelector("#defaultCityFour");
cityFour.addEventListener("click", searchCityFourWeather);

function searchCityFourWeather(event) {
  event.preventDefault();
  search("Poznan");
}
