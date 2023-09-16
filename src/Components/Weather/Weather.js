import React, { useContext } from 'react';
import './Weather.css';
import { useSelector } from 'react-redux';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Weather() {
  const weatherDetails = useSelector((state) => state.Weather.Weather);
  const {
    weathercountry,
    // setweathercountry,
    // contryCode,
  } = useContext(UserContext);

  // Map weather details to JSX elements
  const weatherElements = weatherDetails.map((weather) => (
    <>
      {/* Render weather details here */}
      <div className="weather-icon">
        <img src={weather.current.condition.icon} alt="weather" />
      </div>
      <div>
        <p>
          Temperature:
          {weather.temp_c}
          Celsius
        </p>
        <p>
          Condition:
          {weather.current.condition.text}
        </p>
        <p>
          Humidity:
          {weather.current.humidity}
        </p>
        <p>
          Wind-direction:
          {weather.current.wind_dir}
        </p>
        <p>
          Wind-Speed:
          {weather.wind_kph}
          K/H
        </p>
      </div>
      {/* Add more weather details as needed */}
    </>
  ));

  return (
    <div className="weather-container">
      <h2>
        Weather Details for
        {weathercountry}
      </h2>
      {weatherElements}
    </div>
  );
}
