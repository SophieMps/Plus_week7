function liveDayTime() {
  let now = new Date();

  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];

  let showCurrentDay = document.querySelector("#current-day");
  showCurrentDay.innerHTML = `${day}, ${date} ${month} ${year}`;
  let showCurrentTime = document.querySelector("#current-time");
  showCurrentTime.innerHTML = `${hour}:${minutes}`;
}

liveDayTime();

function displayTemp(response) {
  console.log(response);
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#card-text-temp");
  tempElement.innerHTML = `${temp}°`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "12bdbd86bcab685847fea4f4c4d743cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputInsertCity1").value;
  searchCity(city);
}

let enterCity = document.querySelector("#search-form");
enterCity.addEventListener("submit", showCity);

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "12bdbd86bcab685847fea4f4c4d743cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let button = document.querySelector("#exampleInputLocation1");
button.addEventListener("click", getCurrentPosition);
