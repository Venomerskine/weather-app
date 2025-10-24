import {getWeatherAndExtract} from "./logic.js";

let locationInput = document.getElementById('location')
let checkButton = document.getElementById("check")
let form = document.getElementById('searchForm')
let mainDiv = document.querySelector('main')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const weather = await getWeatherAndExtract(locationInput.value)
mainDiv.innerHTML = `
  <div class="today">
    <div class="location">${weather.location}</div>
    <div class="dateTime">${weather.dateTime}</div>
    <div class="temp">${weather.temperature}°${weather.unit || 'F'}</div>
    <div class="condition">${weather.condition}</div>
    <div class="feelsLike">Feels like: ${weather.feelsLike}°${weather.unit || 'F'}</div>
  </div>

`;

const forecastDiv = document.createElement('div');
forecastDiv.classList.add('forecast');

forecastDiv.innerHTML = weather.forecast.map(day => `
      <div class="forecast-day">
    <div class="date">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
    <div class="icon">${day.icon}</div>
    <div class="condition">${day.condition}</div>
    <div class="temps">
      <span class="max">High: ${day.tempMax}°${weather.unit || 'C'}</span>
      <span class="min">Low: ${day.tempMin}°${weather.unit || 'C'}</span>
    </div>
  </div>`).join('')

  mainDiv.appendChild(forecastDiv)

  console.log(weather);
});
