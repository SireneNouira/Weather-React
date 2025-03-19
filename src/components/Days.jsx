import { useState } from "react";
import "../styles/Days.css";

const Days = ({ forecast, onSelect }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  // Fonction pour formater la date en jour de la semaine
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Crée un objet Date
    const options = { weekday: "long" }; // Options pour obtenir le jour de la semaine
    return date.toLocaleDateString("fr-FR", options); // Formater en jour de la semaine en français
  };

  return (
    <div className="days-container">
      {forecast.map((day, index) => (
        <button
          key={index}
          className={`day-button ${index === selectedDay ? "selected" : ""}`} 
          onClick={() => {
            setSelectedDay(index);
            onSelect(index);
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
