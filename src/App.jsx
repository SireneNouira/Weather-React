import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Weather from "./components/Weather";
import "./App.css";
import Search from "./components/Search";
import Days from "./components/Days";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem("savedCity"); 
    return savedCity || "Paris"; 
  });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [loading, setLoading] = useState(true);
  

  // Fonction pour récupérer la météo actuelle et les prévisions pour 5 jours
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
        );

        // Stocker les données actuelles et les prévisions
        setWeather(response.data);
        setForecast(response.data.forecast.forecastday);
        setSelectedDay(0);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement des données météo", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="app">
      <Header />
      <article className="weather-container">
        <Search setCity={setCity} />
        <Weather weather={weather} selectedWeather={forecast[selectedDay]} />
        <Days forecast={forecast} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </article>
    </div>
  );
};

export default App;
