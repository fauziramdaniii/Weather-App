import { useState } from "react";
import background from "./assets/background.jpg";
import "./component/description.css";
import getDataWeather from "./utils/apiService";
import Description from "./component/Description";

function App() {
  // Create a state for the city name
  const [city, setCity] = useState("");

  // Create a state for the weather data
  const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
      const response = await getDataWeather(city, import.meta.env.VITE_REACT_APP_API_KEY);
      console.log(response);
      setWeatherData(response);
    };

    const handleSearch = () => {
      fetchData();
    };


  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input
              type="text"
              name="city"
              placeholder="Enter a City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {/* Give the handleSearch function as the onClick property to the button */}
            <button type="submit" onClick={handleSearch}>
              Search ℃
            </button>
          </div>

          <div className="section section__temperature">
            {weatherData && (
              <div className="icon">
                <h3>
                  {weatherData.city.name}, {weatherData.city.country}
                </h3>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
                  alt="weatherIcon"
                />
                <h3>{weatherData.list[0].weather[0].description}</h3>
              </div>
            )}
            <div className="temperature">
              {weatherData && (
                <h1>{Math.round(weatherData.list[0].main.temp)} ℃</h1>
              )}
            </div>
          </div>
          <Description forecastData={weatherData} />
        </div>
      </div>
    </div>
  );
}

export default App;
