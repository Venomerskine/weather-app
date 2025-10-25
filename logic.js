export async function fetchWeather(location) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=NL5EDP63KF2YX57M743MSCJLC`);
  const data = await response.json();
  return data;
}

export function extractWeatherData(raw) {
  return {
    location: raw.resolvedAddress,
    dateTime: raw.currentConditions.datetime,
    temperature: raw.currentConditions.temp,
    feelsLike: raw.currentConditions.feelslike,
    condition: raw.currentConditions.conditions,
    icon: raw.currentConditions.icon,
    humidity: raw.currentConditions.humidity,
    windSpeed: raw.currentConditions.windspeed,
    sunrise: raw.currentConditions.sunrise,
    sunset: raw.currentConditions.sunset,
    // forecast
    forecast: raw.days.slice(1, 6).map(day => ({
      date: day.datetime,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      condition: day.conditions,
      icon: day.icon
    }))
  };
}

export async function getWeatherAndExtract(location) {
    try {
        const rawData = await fetchWeather(location)
        // console.log("raw", rawData)

        const extractedData = extractWeatherData(rawData)

        // console.log("extracted",extractedData)

        return extractedData
    } catch (error){
        console.error("Failed to process weather data:", error)
    }
}

export function cToF(celsius) {
  return (celsius * 9/5) + 32;
}

export function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}
