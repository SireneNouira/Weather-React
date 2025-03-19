import { useState, useEffect } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Days from "./components/Days";
import "./App.css";
import Search from "./components/Search";


const App = () => {
  const [city, setCity] = useState("Paris");

  return (
    <div className="app">
      <Header />
      <article className="weather-container">
      <Search setCity={setCity} />
        <Weather city={city} />
        <Days city={city} />
      </article>
    </div>
  );
};

export default App;
