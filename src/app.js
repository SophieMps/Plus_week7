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

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` 
                          <div class="col-2">
                <div class="weather-forecast-date">${forecastDay.dt}</div>
                <img src=`http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png` alt="" width="42"/>
                <div class="weather-forecast-temperature">
                  <span clas="weather-forecast-temperature-max">${forecastDay.temp.max}°</span>
                  <span class="weather-forecast-temperature-min">${forecastDay.temp.min}°</span>
                </div>
              </div>
         
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "12bdbd86bcab685847fea4f4c4d743cf";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let showCity = document.querySelector("#current-city");
  showCity.innerHTML = response.data.name;
  let tempElement = document.querySelector("#card-text-temp");

  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#card-text-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let tempElement = document.querySelector("#card-text-temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
