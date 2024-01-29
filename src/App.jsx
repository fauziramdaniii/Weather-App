import { useState, useEffect } from "react";
import background from "./assets/background.jpg";
import getDataWeather from "./utils/apiService";
import Description from "./component/Description";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SavedCitiesModal from "./component/SavedCitiesModal";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (latitude, longitude) => {
    try {
      const response = await getDataWeather({
        city,
        latitude,
        longitude,
        apiKey: import.meta.env.VITE_REACT_APP_API_KEY
      });
      console.log(response)
      if (response === null) {
        toast("City Not Found")
      }
      setWeatherData(response);
    } catch (error) {
      // Display a toast error with a message
      toast.error("Error fetching weather data");
    }
  };

  const handleSearch = () => {
    fetchData(null, null);
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);

          // Get city name based on coordinates and update the input
          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=GOOGLE_MAPS_API_KEY`);
            const data = await response.json();
            const cityName = data.results[0].address_components.find(component => component.types.includes("locality")).long_name;
            setCity(cityName);
          } catch (error) {
            console.error("Error fetching city name:", error);
          }
        },
        (error) => {
          // Handle geolocation error
          toast.error("Error getting current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

 
  const saveCity = () => {
    if (weatherData && weatherData.city) {
      const savedCityList = JSON.parse(localStorage.getItem("savedCities")) || [];
      const cityName = weatherData.city.name;

      // Check if the city is already saved
      if (!savedCityList.includes(cityName)) {
        const updatedSavedCityList = [...savedCityList, cityName];
        localStorage.setItem("savedCities", JSON.stringify(updatedSavedCityList));
        setSavedCities(updatedSavedCityList);
        toast.success(`City "${cityName}" saved!`);
      } else {
        toast.info(`City "${cityName}" is already saved!`);
      }
    }
  };

  const deleteCity = (cityName) => {
    const savedCityList = JSON.parse(localStorage.getItem("savedCities")) || [];
    const updatedSavedCityList = savedCityList.filter(city => city !== cityName);
    localStorage.setItem("savedCities", JSON.stringify(updatedSavedCityList));
    setSavedCities(updatedSavedCityList);
    toast.success(`City "${cityName}" deleted from saved list!`);
  };

 const accessSavedList = () => {
    const savedCityList = JSON.parse(localStorage.getItem("savedCities")) || [];
    setSavedCities(savedCityList);
    setShowModal(true);
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

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
            <div className="section__temperature-buttons">
                <button className="section__temperature-save-button" type="button" onClick={saveCity}>
                    Save City
                </button>
                <button className="section__temperature-access-button" type="button" onClick={accessSavedList}>
                    Show Saved List
                </button>
            </div>

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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnFocusLoss
          />
       {showModal && (
        <SavedCitiesModal
          savedCities={savedCities}
          onClose={() => setShowModal(false)}
          deleteCity={deleteCity}
        />
      )}
        </div>
      </div>
    </div>
  );
}

export default App;
