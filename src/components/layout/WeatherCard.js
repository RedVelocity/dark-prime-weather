import React from 'react';
import PropTypes from 'prop-types';
// import { Spring, config  } from 'react-spring/renderprops'
// import { Card } from 'primereact/card';
import WeatherSearch from './WeatherSearch';
import WeatherDetail from './WeatherDetail';
import { Message } from 'primereact/message';
import { Offline } from 'react-detect-offline';
// import {Panel} from 'primereact/panel';

function WeatherCard ( {weatherState, performSearch, toggleLoading} ) {
    return (
      <div className="weather-card">
      <Offline><Message severity="warn" text="Currently Offline"></Message></Offline>
        <br />
        <WeatherSearch performSearch={performSearch} toggleLoading={toggleLoading} className="halfheight" />
        <br />
        <br />
          {(weatherState.isLoaded) && 
            <WeatherDetail weatherState={weatherState} className="halfheight"/>}
      </div>
    )
  }

// PropTypes
WeatherCard.propTypes = {
    weatherState: PropTypes.object.isRequired,
    performSearch: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired
  }

  export default WeatherCard;