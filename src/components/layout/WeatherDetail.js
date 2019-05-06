import React from "react";
import PropTypes from "prop-types";
import ReactAnimatedWeather from "react-animated-weather";
function WeatherDetail({ weatherState }) {
  const defaults = {
    color: "#1385ae",
    size: 50,
    animate: true
  };

  const { temperature, icon, summary } = weatherState.weather.currently;
  const { isLoading } = weatherState;
  return (
    <React.Fragment>
      {!isLoading ? (
        <div className="weather-detail">
          <h3>{Math.round(temperature)}°C </h3>
          <h3>{summary}</h3>
          <div>
            <ReactAnimatedWeather
              icon={icon.replace(/-/g, "_").toUpperCase()}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
        </div>
      ) : (
        <div className="weather-loading">
          <h3>Loading...</h3>
        </div>
      )}
    </React.Fragment>
  );
}

// PropTypes
WeatherDetail.propTypes = {
  weatherState: PropTypes.object.isRequired
};

export default WeatherDetail;
