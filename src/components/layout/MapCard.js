import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

export default class MapCard extends Component {

  state = {
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997
    }
  };

  componentDidUpdate() {
    if(this.props.weatherState.weather.latitude !== this.state.viewport.latitude 
        && !this.props.weatherState.isLoading
        && typeof this.props.weatherState.weather.latitude !== 'undefined') {
      
      // console.log('weatherstate map', this.props, this.state.viewport.latitude);
      this.setPosition(this.props.weatherState.weather.latitude, this.props.weatherState.weather.longitude);
    } 
  }

  setPosition(latitude, longitude) {
    // const viewport = {...this.state.viewport, longitude: lat, latitude: lon};
    // this.props.setLatLon(latitude, longitude);
    this.setState({ ...this.state, viewport:{...this.state.viewport, latitude:latitude, longitude:longitude}});
    // console.log('updating viewport from prop', this.state, latitude, longitude)
  }

  setViewport(viewport) {
    // const viewport = {...this.state.viewport, longitude: lat, latitude: lon};
    const { latitude, longitude } = viewport;
    this.props.setLatLon(latitude, longitude);
    this.setState({ ...this.state, viewport:{...this.state.viewport, latitude:latitude, longitude:longitude}});
    // console.log('updating viewport from map', this.state, latitude, longitude)
  }
    
 render(){ 
    // let position = [this.state.viewport.latitude, this.state.viewport.longitude];
    // let { weather } = this.props.weatherState;
    // if(this.props.weatherState.isLoaded) {
    //   position = [weather.latitude, weather.longitude];
    //   // this.setPosition(position[0], position[1]);
    // } 
    return (
    <ReactMapGL
      latitude= {this.state.viewport.latitude}
      longitude= {this.state.viewport.longitude}
      zoom={10}
      width="75vw"
      height="60vh"
      // scrollZoom={true}
      // interactive={true}
      // dragPan={true}
      onViewportChange={(viewport) => this.setViewport(viewport)}
      mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    >
      {/* <Marker 
        latitude= {this.state.viewport.longitude}
        longitude= {this.state.viewport.longitude}
        draggable= {false}
        offsetTop= {-25}
      >
        <img src="https://img.icons8.com/color/32/000000/marker.png" alt=""/>
      </Marker> */}
    </ReactMapGL>
  )
 }
}