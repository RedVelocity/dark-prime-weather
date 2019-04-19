import React from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import PropTypes from 'prop-types';
// import marker from '../../assets/marker.png'
import Pin from './Pin'

export default function MapCard({ weatherState, setViewport }) {
  //Update Viewport From Search Props(Geocoder)
  // componentDidUpdate() {
  //   if(this.props.weatherState.weather.latitude !== this.state.viewport.latitude 
  //       && !this.props.weatherState.isLoading
  //       && typeof this.props.weatherState.weather.latitude !== 'undefined') {
      
  //     // console.log('weatherstate map', this.props, this.state.viewport.latitude);
  //     this.setPosition(this.props.weatherState.weather.latitude, this.props.weatherState.weather.longitude);
  //   } 
  // }
  // //Update Viewport From Scroll
  // setPosition(latitude, longitude) {
  //   // const viewport = {...this.state.viewport, longitude: lat, latitude: lon};
  //   // this.props.setLatLon(latitude, longitude);
  //   this.setState({ ...this.state, viewport:{...this.state.viewport, latitude:latitude, longitude:longitude}});
  //   // console.log('updating viewport from prop', this.state, latitude, longitude)
  // }

  // setViewport(viewport) {
  //   // const viewport = {...this.state.viewport, longitude: lat, latitude: lon};
  //   const { latitude, longitude } = viewport;
  //   this.props.setLatLon(latitude, longitude);
  //   this.setState({ ...this.state, viewport:{...this.state.viewport, latitude:latitude, longitude:longitude}});
  //   // console.log('updating viewport from map', this.state, latitude, longitude)
  // }
    
 
    // let position = [this.state.viewport.latitude, this.state.viewport.longitude];
    // let { weather } = this.props.weatherState;
    // if(this.props.weatherState.isLoaded) {
    //   position = [weather.latitude, weather.longitude];
    //   // this.setPosition(position[0], position[1]);
    // }     
    // const mapOptions = { 
    //   showZoom: true,
    //   showCompass: true
    // };
    return (
    <ReactMapGL
      {...weatherState.viewport}
      width="75vw"
      height="60vh"
      // scrollZoom={false}
      // interactive={false}
      // dragPan={false}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    >
      <div style={{position: 'absolute', right: 0}}>
          <NavigationControl 
            onViewportChange={(viewport) => setViewport(viewport)}
          />
      </div>
      <Marker 
        latitude= {weatherState.viewport.longitude}
        longitude= {weatherState.viewport.longitude}
        draggable= {true}
        offsetTop= {-10}
        offsetLeft= {-20}
      >
        <Pin />
        {/* <img src={marker} alt="NOTHING"/> */}
      </Marker>
    </ReactMapGL>
  )  
}

MapCard.propTypes = {
  setViewport: PropTypes.func.isRequired,
  weatherState: PropTypes.object.isRequired
}