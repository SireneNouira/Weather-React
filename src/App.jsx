import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Days from "./components/Days";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [city, setCity] = useState("Lyon");
  const [forecast, setForecast] = useState([]);

  // useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         try {
  //           const response = await axios.get(
  //             `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${latitude},${longitude}`
  //           );
  //           setCity(response.data[0].name);
  //         } catch (error) {
  //           console.error("Erreur lors de la récupération de la localisation");
  //         }
  //       },
  //       () => alert("Impossible de récupérer votre localisation")
  //     );
  //   }, []);

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
    <div className="app">
      <Header />
      <article className="weather-container">
        <Weather city={city} />
        <Days forecast={forecast} />
      </article>
    </div>
  );
};

export default App;
