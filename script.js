import { getWeatherAndExtract, cToF, fToC } from "./logic.js";

const locationInput = document.getElementById("location");
const form = document.getElementById("searchForm");
const mainDiv = document.querySelector("main");

let isCelsius = false;

// Helper
function displayTemperature(value) {
  const unit = isCelsius ? "°C" : "°F";
  return `${value.toFixed(1)}${unit}`;
}

// Unit Toggle
function toggleTemperatureUnit() {
  isCelsius = !isCelsius;

  const tempElements = document.querySelectorAll("[data-value]");

  tempElements.forEach(el => {
    const currentValue = parseFloat(el.dataset.value);
    if (isNaN(currentValue)) return;

    let newValue = isCelsius ? fToC(currentValue) : cToF(currentValue);
    el.textContent = displayTemperature(newValue);
    el.dataset.value = newValue; // update stored numeric
  });

  document.getElementById("toggle-btn").textContent = isCelsius ? "Show °F" : "Show °C";
}

// Event Listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!locationInput.value) return;

  mainDiv.innerHTML = "Loading...";
  const weather = await getWeatherAndExtract(locationInput.value);
  if (!weather) return;

  // Today section
  mainDiv.innerHTML = `
    <div class="today">
      <div class="location">${weather.location}</div>
      <div class="dateTime">${weather.dateTime}</div>
      <div class="temp" data-value="${weather.temperature}">${displayTemperature(weather.temperature)}</div>
      <div class="condition">${weather.condition}</div>
      <div class="feelsLike" data-value="${weather.feelsLike}">Feels like: ${displayTemperature(weather.feelsLike)}</div>
    </div>
  `;

  // Forecast section
  const forecastDiv = document.createElement("div");
  forecastDiv.classList.add("forecast");

  forecastDiv.innerHTML = weather.forecast.map(day => `
    <div class="forecast-day">
      <div class="date">${new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
      <div class="icon">${day.icon}</div>
      <div class="condition">${day.condition}</div>
      <div class="temps">
        <span class="max" data-value="${day.tempMax}">High: ${displayTemperature(day.tempMax)}</span>
        <span class="min" data-value="${day.tempMin}">Low: ${displayTemperature(day.tempMin)}</span>
      </div>
    </div>
  `).join("");

  mainDiv.appendChild(forecastDiv);
});

document.getElementById("toggle-btn").addEventListener("click", toggleTemperatureUnit);
