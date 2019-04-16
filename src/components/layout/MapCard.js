import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Card } from 'primereact/card';
// import 'leaflet/dist/leaflet.css';

export default class MapCard extends Component {

    state = {
        lat: 0.00,
        lng: 0.00,
        zoom: 11
      }

    // setPosition = (lat, lon) => {
    //     this.setState({lat:lat, lng:lon});
    //   }
    
 render(){ 

  let position = [this.state.lat, this.state.lng];
    if(this.props.weatherState.isLoaded) {
    position = [this.props.weatherState.weather.latitude, this.props.weatherState.weather.longitude] 
    } 
    return (
    <Map center={position} zoom={this.state.zoom} style={{height: '300px', width: '420px'}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
    </Map>
  )
 }
}