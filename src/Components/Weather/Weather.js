import React from 'react';
import './Weather.css';
import { useSelector } from 'react-redux';

export default function WeatherComponent() {
  // Access the Weather data from the Redux store
  const weatherDetails = useSelector((state) => state.Weather.Weather);
  console.log('Weather details:', weatherDetails);

  if (!weatherDetails) {
    // Handle the case where weatherDetails is not available yet
    return <div>Loading weather data...</div>;
  }

  // Destructure relevant data from the response
  const { location, current } = weatherDetails;
  const { name, localtime } = location;
  const {
    country,
    temp_c,
    temp_f,
    condition,
    wind_kph,
    wind_dir,
    pressure_mb,
    humidity,
    cloud,
    feelslike_c,
    vis_km,
    uv,
  } = current;

  return (
    <div className="single-element">
      <h2>
        Weather Details for
        <br />
        {name}
        ,
        {country}
      </h2>
      <div className="weather-icon">
        <img src={`https:${condition.icon}`} alt="weather" />
      </div>
      <div>
        <p>
          Temperature:
          {temp_c}
          °C (
          {temp_f}
          °F)
        </p>
        <p>
          Condition:
          {condition.text}
        </p>
        <p>
          Wind Speed:
          {wind_kph}
          {' '}
          K/H, Wind Direction:
          {wind_dir}
        </p>
        <p>
          Pressure:
          {pressure_mb}
          {' '}
          mb
        </p>
        <p>
          Humidity:
          {humidity}
          %
        </p>
        <p>
          Cloud Cover:
          {cloud}
          %
        </p>
        <p>
          Feels Like:
          {feelslike_c}
          °C
        </p>
        <p>
          Visibility:
          {vis_km}
          {' '}
          km
        </p>
        <p>
          UV Index:
          {uv}
        </p>
        <p>
          Local Time:
          {localtime}
        </p>
      </div>
    </div>
  );
}
