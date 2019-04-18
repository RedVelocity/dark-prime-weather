import React, { Component } from 'react';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class MapCard extends Component {

  state = {
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997
    }
  };

  setPosition = (lat, lon) => {
    const viewport = {...this.state.viewport, longitude: lat, latitude: lon};
    this.setState({viewport});
    }
    
 render(){ 
    let position = [this.state.viewport.latitude, this.state.viewport.longitude];
    let { weather } = this.props.weatherState;
    if(this.props.weatherState.isLoaded) {
      position = [weather.latitude, weather.longitude];
      // this.setPosition(position[0], position[1]);
    } 
    return (
    <ReactMapGL
      latitude= {position[0]}
      longitude= {position[1]}
      zoom={10}
      width="80vw"
      height="80vh"
      interactive={false}
      dragPan={false}
      // onViewportChange={(viewport) => this.setState({viewport})}
      mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
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