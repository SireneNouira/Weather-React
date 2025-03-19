import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Search = ({ setCity }) => {
  const [inputCity, setInputCity] = useState("");

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${latitude},${longitude}`
          );
          if (response.data.length > 0) {
            const locationName = response.data[0].name;
            setCity(locationName);
            localStorage.setItem("savedCity", locationName); // Sauvegarder la localisation dans le localStorage
          } else {
            alert("Localisation non trouvée.");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de la localisation", error);
        }
      },
      () => alert("Impossible de récupérer votre localisation")
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
      setInputCity("");
      localStorage.setItem("savedCity", inputCity); 
      
    }
  };

  return (
    <>
      <button className="location-btn" onClick={handleLocation}>
        📍 Utiliser ma localisation
      </button>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Entrez une ville..."
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
    </>
  );
};

export default Search;