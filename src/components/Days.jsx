import { useState, useEffect } from "react";
import "../styles/Days.css";
import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const Days = ({ city }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [forecast, setForecast] = useState([]);

  // Fonction pour formater la date en jour de la semaine
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Crée un objet Date
    const options = { weekday: "long" }; // Options pour obtenir le jour de la semaine
    return date.toLocaleDateString("fr-FR", options); // Formater en jour de la semaine en français
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
        );
        setForecast(response.data.forecast.forecastday);
      } catch (error) {
        console.error("Erreur de chargement des prévisions météo", error);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div className="days-container">
      {forecast.map((day, index) => (
        <button
          key={index}
          className={`day-button ${index === selectedDay ? "selected" : ""}`} 
          onClick={() => {
            setSelectedDay(index);
           
          }}
        >
          {formatDate(day.date)}
        </button>
      ))}

      {forecast[selectedDay] && (
        <div className="day-details">
          <h3>
            Détails du jour:{" "}
            {new Date(forecast[selectedDay].date).toLocaleDateString()}
          </h3>
          <p>{forecast[selectedDay].day.condition.text}</p>
          <p>Temp min: {forecast[selectedDay].day.mintemp_c}°C</p>
          <p>Temp max: {forecast[selectedDay].day.maxtemp_c}°C</p>
          <p>Précipitations: {forecast[selectedDay].day.totalprecip_mm} mm</p>
          <p>Vent: {forecast[selectedDay].day.maxwind_kph} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Days;
