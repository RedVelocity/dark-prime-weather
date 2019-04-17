import React, { Component } from 'react';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class MapCard extends Component {

  // state = {
  //   viewport: {
  //     latitude: 12.9791198,
  //     longitude: 77.5912997,
  //     zoom: 10
  //   }
  // };

    // setPosition = (lat, lon) => {
    //     this.setState({viewport: {latitude:lat, longitude:lon}});
    //   }
    
 render(){ 
    let position = [12.9791198, 77.5912997];
    if(this.props.weatherState.isLoaded) {
      position = [this.props.weatherState.weather.latitude, this.props.weatherState.weather.longitude];
      // this.setState({viewport: {latitude:position[0], longitude:position[1]}});
    } 
    return (
    <ReactMapGL
      latitude= {position[0]}
      longitude= {position[1]}
      zoom={10}
      width="400px"
      height="250px"
      interactive={false}
      dragPan={false}
      onViewportChange={(viewport) => this.setState({viewport})}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    >
      <Marker 
        latitude= {position[0]}
        longitude= {position[1]}
        draggable= {false}
        offsetTop= {-25}
      >
        <img src="https://img.icons8.com/color/32/000000/marker.png" alt=""/>
      </Marker>
    </ReactMapGL>
  )
 }
}