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
  

  const {temperature, icon, summary} = weatherState.weather.currently;
  const isLoading = weatherState.isLoading;
  // const detail = () => { return (
  //   <div style={{ display : 'flex', flexDirection: 'column' }}>
  //         {(!this.props.weatherState.isLoading) ?
  //         <div style={{ display : 'flex' }}>
  //           <h3 style={{flex: '3'}} >{Math.round(temperature)}°C </h3>
  //             <h3 style={{flex: '3'}} >{summary}</h3>
  //             <div style={{flex: '3'}} >
  //                 <ReactAnimatedWeather
  //                 icon={icon.replace(/-/g, "_").toUpperCase()}
  //                 color={this.defaults.color}
  //                 size={this.defaults.size}
  //                 animate={this.defaults.animate}
  //               /> 
  //           </div>
  //           </div> : 
  //           <h3>Loading...</h3>
  //         }
  //     </div>
  //   ) };
    return (    
      <React.Fragment>
        {(!isLoading) ?
        <div style={{ display : 'flex', justifyItems: 'start', textAlign: 'center' }}>
          <h3 style={{flex: '3'}} >{Math.round(temperature)}°C </h3>
          <h3 style={{flex: '3'}} >{summary}</h3>
          <div 
            style={{flex: '3'}}>
            <ReactAnimatedWeather 
              icon={icon.replace(/-/g, "_").toUpperCase()}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
        </div> 
        : <div><h3>Loading...</h3></div>
        }
      </React.Fragment>
    )
  }

// PropTypes
WeatherDetail.propTypes = {
  weatherState: PropTypes.object.isRequired
  }

export default WeatherDetail;