import { useEffect, useState } from "react";
import axios from "axios";
import Days from "./Days";
import "../styles/Weather.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  // Fonction pour récupérer la météo actuelle et les prévisions pour days
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        setWeather(currentResponse.data);
      } catch (error) {
        console.error("Erreur de chargement des données météo", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <p>Chargement...</p>;

  return (
    <div className="weather-card">
   
        <span className="card-title">{weather.location.name}</span>
        <p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
          />
        </p>
        <span className="temperature">{weather.current.temp_c}°C</span>
        <div className="wind">Vent: {weather.current.wind_kph} km/h</div>
      </div>
 
  );
};

export default Weather;
