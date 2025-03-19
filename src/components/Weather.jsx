import "../styles/Weather.css";

const Weather = ({ weather }) => {
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
