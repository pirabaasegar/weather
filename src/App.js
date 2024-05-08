import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random?sky');
        setBackgroundImage(response.url);
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${response.url})`;
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };
    fetchRandomImage();
  }, []);

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = () => {
    if (cityName.trim() === '') {
      alert('Please enter a city name');
      return;
    }

    const apiKey = '75dd14c9f5cbb58f49ad575bf2396ec5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
        setWeatherData(null);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <main className="main">
        {weatherData ? (
          <WeatherInfo weatherData={weatherData} />
        ) : (
          <div className="input-container">
            <input
              type="text"
              id="cityInput"
              className='border-0 border-bottom border-white border-2 bg-transparent text-white me-2'
              placeholder="Enter city name"
              autoComplete="off"
              value={cityName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button className='border-0 text-white bg-transparent' onClick={handleSubmit}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
      </main>
    </div>
  );
}

function WeatherInfo({ weatherData }) {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity, rain },
    weather: [{ description, icon }],
    visibility,
    name,
  } = weatherData;

  return (
    <div className="weather-info d-flex flex-column text-center text-white shadow">
      <div className="weather-info_header d-flex justify-content-between">
        <div className="weather-info_header-left d-flex flex-column align-items-start">
          <h6>{name}</h6>
          <p>{Math.round(temp)}°</p>
        </div>
        <div className="weather-info_header-right  d-flex flex-column align-items-end">
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather icon"
            draggable="false"
          />
          <p className='text-capitalize'>{description}</p>
          <p>
            H:{Math.round(temp_max)}° L:{Math.round(temp_min)}°
          </p>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between gap-4">
        <div className="text-start">
          <p>Feels Like</p>
          <p>{Math.round(feels_like)}°C</p>
        </div>
        <div className="text-start">
          <p>Precipitation</p>
          <p>{rain ? rain['1h'] : 'N/A'}</p>
        </div>
        <div className="text-start">
          <p>Visibility</p>
          <p>{Math.round(visibility / 1000)} km</p>
        </div>
        <div className="text-start">
          <p>Humidity</p>
          <p>{humidity}%</p>
        </div>
      </div>
    </div>
  );
}

export default App;