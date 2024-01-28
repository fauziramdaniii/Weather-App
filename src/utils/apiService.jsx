import axios from "axios";

const getDataWeather = async ({ city, latitude, longitude, apiKey }) => {
  try {
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    } else if (latitude && longitude) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    } else {
      throw new Error("Invalid parameters for getDataWeather");
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default getDataWeather;
