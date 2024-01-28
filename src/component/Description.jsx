import moment from "moment";
import { FaArrowDown } from "react-icons/fa";

const Description = ({ forecastData }) => {
    return (
      <div className="section section__descriptions">
        {/* Use the map method to iterate over the forecast data list array */}
        {forecastData &&
          forecastData.list.map((item, index) => (
            // Only return the items with index 0, 8, 16, 24, and 32 (every 8th item)
            // This will give us the forecast data for the next 5 days at 12:00 pm
            index % 8 === 0 && (
              <div className="card" key={index}>
                <div className="description__card-icon">
                  <FaArrowDown />
                  {/* Use moment to format the date to the day name */}
                  <small>{moment(item.dt_txt).format("dddd")}</small>
                </div>
                {/* Display the maximum and minimum temperature in Celcius */}
                <h2>
                  {Math.round(item.main.temp_max)} ℃ 
                  {/* {Math.round(item.main.temp_min)} ℃ */}
                </h2>
                {/* Display the weather icon */}
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="weatherIcon"
                />
              </div>
            )
          ))}
      </div>
    );
  };

  export default Description