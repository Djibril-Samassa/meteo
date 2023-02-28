/* eslint-disable */
const REACT_APP_WEATHER_API_KEY = "c0c82a5a228cd41201702662c5b33e4e";
import React, { useState, useEffect } from 'react';
import './App.css';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';

const API_KEY = 'c0c82a5a228cd41201702662c5b33e4e';

const App = () => {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [founded, setFounded] = useState()

  useEffect(() => {
    const fetchWeatherData = async () => {
      forecastData ? setForecastData([]) : null
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
      response.status === 404 ? setFounded(false) : null
      response.status === 200 ? setFounded(true) : null
      const data = await response.json();
      setWeatherData(data);
    };

    const fetchForecastData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
      const data = await response.json();
      setForecastData(data.list);
    };

    if (city) {
      fetchWeatherData();
      fetchForecastData();
    }
  }, [city, unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="App">
      <div className='test'>
        <div className='req'>
          <h2>Météo par Djibril Samassa</h2>

          <form className='formulaire' onSubmit={handleSubmit}>
            <input type="text" name="city" placeholder="Entrez le nom d'une ville" />
            <button type="submit">Afficher les informations</button>
          </form>
        </div>

        {founded ? weatherData.main ?
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>{Math.round(weatherData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <img className='image' src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
            <p>
              {weatherData.weather[0].description === "clear sky" ? "Clair" :
                weatherData.weather[0].description === "few clouds" ? "Peu Nuageux" :
                  weatherData.weather[0].description === "scattered clouds" ? "Nuageux" :
                    weatherData.weather[0].description === "light rain" ? "Peu pluvieux" :
                      weatherData.weather[0].description === "broken clouds" ? "Très Nuageux" :
                        weatherData.weather[0].description === "shower rain" ? "Peu pluvieux" :
                          weatherData.weather[0].description === "rain" ? "Pluvieux" :
                            weatherData.weather[0].description === "thunderstorm" ? "Orageux" :
                              weatherData.weather[0].description === "snow" ? "Neige" :
                                weatherData.weather[0].description === "mist" ? "Brouillard" :
                                  weatherData.weather[0].description === "overcast clouds" ? "Couvert" :
                                    null}</p>

            <div className="unit-toggle">
              <label>
                <input type="radio" name="unit" value="metric" checked={unit === 'metric'} onChange={handleUnitChange} />
                Celsius
              </label>
              <label>
                <input type="radio" name="unit" value="imperial" checked={unit === 'imperial'} onChange={handleUnitChange} />
                Fahrenheit
              </label>
            </div>

          </div>
          : null : null}
      </div>
      {founded === true ? null : founded === false ? <p style={{ color: 'red' }}>Aucune information trouvé</p> : null}


      {forecastData && forecastData.length > 0 ? (
        <div className="forecast-info">
          <h3>Prévisions</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.slice(0, 7).map((data) =>
                <tr key={data.dt}>
                  <td className='prev'>{data.dt_txt.split(' ')[0]}</td>
                  <td className='prev'>{Math.round(data.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</td>
                  <td className='prev' style={{ display: 'flex', alignItems: 'center' }}><img className='image' src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} /><p>{data.weather[0].description === "clear sky" ? "Clair" :
                    data.weather[0].description === "few clouds" ? "Peu Nuageux" :
                      data.weather[0].description === "scattered clouds" ? "Nuageux" :
                        data.weather[0].description === "broken clouds" ? "Très Nuageux" :
                          data.weather[0].description === "light rain" ? "Peu pluvieux" :
                            data.weather[0].description === "shower rain" ? "Peu pluvieux" :
                              data.weather[0].description === "rain" ? "Pluvieux" :
                                data.weather[0].description === "thunderstorm" ? "Orageux" :
                                  data.weather[0].description === "snow" ? "Neige" :
                                    data.weather[0].description === "mist" ? "Brouillard" :
                                      data.weather[0].description === "overcast clouds" ? "Couvert" :
                                        data.weather[0].description}</p></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
};

export default App;
