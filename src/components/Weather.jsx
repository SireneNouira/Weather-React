import "../styles/Weather.css";

const Weather = ({ weather, selectedWeather}) => {
  return (
    <div className="weather-card">
      <span className="card-title">{weather.location.name}</span>
      <p>
      <img
          src={`https:${selectedWeather.day.condition.icon}`}
          alt={selectedWeather.day.condition.text}
        />
      </p>
      <span className="temperature">{selectedWeather.day.avgtemp_c}°C</span>
      <div className="wind">Vent: {selectedWeather.day.maxwind_kph} km/h</div>
    </div>
  );
};

export default Weather;
