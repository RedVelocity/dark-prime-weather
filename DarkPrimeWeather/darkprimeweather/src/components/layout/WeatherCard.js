import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Spring, config  } from 'react-spring/renderprops'
import { Card } from 'primereact/card';
import WeatherSearch from './WeatherSearch';
import WeatherDetail from './WeatherDetail';
import { Message } from 'primereact/message';
import { Offline } from "react-detect-offline";
// import {Panel} from 'primereact/panel';

class WeatherCard extends Component {
  render() {
    return (
      <Card title="Weather" className="weather-card">
      <Offline><Message severity="warn" text="Currently Offline"></Message></Offline>
        <br />
        <WeatherSearch performSearch={this.props.performSearch} toggleLoading={this.props.toggleLoading} className="halfheight" />
        <br />
          {(this.props.weatherState.isLoaded) ? 
            <WeatherDetail weatherState={this.props.weatherState} className="halfheight"/> : <div className="halfheight"></div>}  
      </Card>
    )
  }
}

// PropTypes
WeatherCard.propTypes = {
    weatherState: PropTypes.object.isRequired,
    performSearch: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired
  }

  export default WeatherCard;