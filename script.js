function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const inputContainer = document.getElementById('inputContainer');
    const weatherInfo = document.getElementById('weatherInfo');

    const cityName = cityInput.value;

    if (cityName.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = '75dd14c9f5cbb58f49ad575bf2396ec5';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp.toFixed();
            const description = data.weather[0].description;
            const feelsLike = data.main.feels_like.toFixed();
            const precipitation = data.rain ? (typeof data.rain['1h'] === 'number' ? data.rain['1h'] + '%' : 'N/A') : 'N/A';
            const visibility = data.visibility / 1000;
            const humidity = data.main.humidity;
            const city = data.name;
            const icon = data.weather[0].icon;
            const minTemp = data.main.temp_min.toFixed();
            const maxTemp = data.main.temp_max.toFixed();
            const updatedTime = new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const displayText = `
                <div class="weather-info_header">
                    <div class="weather-info_header-left">
                        <h2>${city}</h2>
                        <p>${temperature}°</p>
                    </div>
                    <div class="weather-info_header-right">
                        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" draggable="false">
                        <p>${description}</p>
                        <p>H:${maxTemp}° L:${minTemp}°</p>
                    </div>
                </div>
                <div class="weather-info_info">
                    <div class="weather-info_info-item">
                        <p>Feels Like</p>
                        <p>${feelsLike}°C</p>
                    </div>
                    <div class="weather-info_info-item">
                        <p>Precipitation</p>
                        <p>${precipitation}</p>
                    </div>
                    <div class="weather-info_info-item">
                        <p>Visibility</p>
                        <p>${visibility}%</p>
                    </div>
                    <div class="weather-info_info-item">
                        <p>Humidity</p>
                        <p>${humidity}%</p>
                    </div>
                </div>
            `;
            weatherInfo.style.display = 'block';
            inputContainer.style.display = 'none';
            weatherInfo.innerHTML = displayText;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.textContent = 'Error fetching weather data';
        });
}

document.getElementById('getWeatherButton').addEventListener('click', getWeather);
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });