import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError("Could not fetch weather data");
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <nav>
        <form onSubmit={handleSubmit}>
          <label className="label-text" htmlFor="city">Write the city in English</label>
          <br/>
          <input
            type="text"
            id="city"
            placeholder="Enter city name"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="Btn-search" type="submit">Search</button>
        </form>
      </nav>
      <main>
        {error && <p>{error}</p>}
        {weather && (
          <div className="main-research-result">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <ul className="list-condition">
              <li>Temperature: {weather.main.temp.toFixed()}°C</li>
              <li>Pressure: {weather.main.pressure} hPa</li>
              <li>Humidity: {weather.main.humidity}%</li>
              <li>Wind speed: {weather.wind.speed} m/s</li>
              <li>Wind direction: {weather.wind.deg}°</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default Weather;