import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const API_KEY = '6ca114f48a7bde06f9a944dd7911b615';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try{
      const response = await fetch(URL);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1>React Weather App</h1>
      <SearchForm fetchWeather={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
