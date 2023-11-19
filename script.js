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
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const feelsLike = data.main.feels_like;
            const precipitation = data.rain ? data.rain['1h'] : 'N/A';
            const visibility = data.visibility / 1000;
            const humidity = data.main.humidity;
            const city = data.name;
            const country = data.sys.country;

            const displayText = `
                <div class="weather-info_header">
                    <h2>${city}, ${country}</h2>
                    <p>${temperature}°C | ${description}</p>
                </div>
                <div class="weather-info_info">
                    <div class="weather-info_info-item">
                        <p>Feels Like</p>
                        <p>${feelsLike}°C</p>
                    </div>
                    <div class="weather-info_info-item">
                        <p>Precipitation</p>
                        <p>${precipitation}%</p>
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