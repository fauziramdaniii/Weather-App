import moment from "moment";
import { FaArrowDown } from "react-icons/fa";

/**
 * Component to display weather descriptions for forecast data.
 * @param {Object} props - Component props.
 * @param {Object} props.forecastData - Forecast data containing weather information.
 */
const Description = ({ forecastData }) => {
    return (
        <div className="section section__descriptions">
            {forecastData &&
                forecastData.list.map((item, index) => (
                    // Only return the items with index 0, 8, 16, 24, and 32 (every 8th item)
                    index % 8 === 0 && (
                        <div className="card" key={index}>
                            <div className="description__card-icon">
                                <FaArrowDown style={{ color: 'white' }} />
                                {/* Use moment to format the date to the day name */}
                                <small style={{ color: 'white' }}>{moment(item.dt_txt).format("dddd")}</small>
                            </div>
                            {/* Display the maximum and minimum temperature in Celcius */}
                            <h4 style={{ color: 'white' }}>
                                {Math.round(item.main.temp_max)} ℃
                                {/* {Math.round(item.main.temp_min)} ℃ */}
                            </h4>
                            {/* Display the weather icon */}
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt="weatherIcon"
                                style={{ textAlign: 'center' }}
                            />
                            <h3>{item.weather[0].description}</h3>
                        </div>
                    )
                ))}
        </div>
    );
};

export default Description;
