import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';
// import { Transition, animated } from 'react-spring/renderprops';
// import {  CSSTransition, TransitionGroup  } from 'react-transition-group';
// import './../../App.css';
function WeatherDetail({weatherState}) {

 const defaults = {
    color: 'cadetblue',
    size: 50,
    animate: true
  };
  
  // const styleDetail={ 
  //   display : 'flex', 
  //   justifyContent: 'center', 
  //   alignItems: 'center', 
  //   textAlign: 'center', 
  //   minWidth: '300px', 
  //   minHeight: '100px' 
  // };
  const {temperature, icon, summary} = weatherState.weather.currently;
  const { isLoading, isLoaded } = weatherState;
    return (    
      <React.Fragment>
        {(!isLoading && isLoaded) ?
        <div className="weather-detail">
          <h3  >{Math.round(temperature)}°C </h3>
          <h3  >{summary}</h3>
          <div>
            <ReactAnimatedWeather 
              icon={icon.replace(/-/g, "_").toUpperCase()}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
        </div> 
        : <div className="weather-detail"><h3>Loading...</h3></div>
        }
      </React.Fragment>
    )
  }

// PropTypes
WeatherDetail.propTypes = {
  weatherState: PropTypes.object.isRequired
  }

export default WeatherDetail;