const apiKey = "313cc7548273b599fe71ab3289f1c7c9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city-input");
const spinner = document.getElementById("spinner");
const weatherElement = document.getElementById("weather");
const errorElement = document.getElementById("error");
const tempElement = document.getElementById("temp");
const cityNameElement = document.getElementById("city-name");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const weatherIconElement = document.getElementById("weather-icon");
const weatherDescriptionElement = document.getElementById("weather-description");
const pressureElement = document.getElementById("pressure");
const sunriseElement = document.getElementById("sunrise");
const sunsetElement = document.getElementById("sunset");

async function checkWeather(city) {
    spinner.style.display = "block";
    weatherElement.style.display = "none";
    errorElement.style.display = "none";

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            errorElement.style.display = "block";
        } else {
            cityNameElement.innerHTML = data.name;
            tempElement.innerHTML = data.main.temp + "°C";
            humidityElement.innerHTML = data.main.humidity + "%";
            windSpeedElement.innerHTML = data.wind.speed + " Km/h";
            weatherDescriptionElement.innerHTML = data.weather[0].description;
            pressureElement.innerHTML = `Pressure: ${data.main.pressure} hPa`;
            sunriseElement.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            sunsetElement.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

            weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIconElement.style.display = "block";

            // Map weather conditions to CSS classes
            const weatherCondition = data.weather[0].main.toLowerCase();
            const weatherConditionsMap = {
                clear: "clear",
                clouds: "clouds",
                rain: "rain",
                drizzle: "drizzle",
                thunderstorm: "thunderstorm",
                snow: "snow",
                mist: "mist",
                haze: "haze",
                fog: "fog",
                smoke: "smoke",
                dust: "dust",
                sand: "sand",
                ash: "ash",
                squall: "squall",
                tornado: "tornado"
            };

            document.body.className = weatherConditionsMap[weatherCondition] || "default";

            weatherElement.style.display = "block";
        }
    } catch (error) {
        errorElement.style.display = "block";
    } finally {
        spinner.style.display = "none";
    }
}

function searchWeather() {
    checkWeather(searchBox.value);
}
