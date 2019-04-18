import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-colored/theme.css';
import 'primeicons/primeicons.css';
import './App.css';
import WeatherTabs from './components/layout/WeatherTabs';
// import MapCard from './components/layout/MapCard';
// import {Messages} from 'primereact/messages';

class App extends Component {

  state = { 
    weather: {},
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () =>  this.setState({isLoading: !this.state.isLoading});
  setLatLon = (lat, lon) => {
    this.setState({ ...this.state, weather:{...this.state.weather, latitude:lat, longitude:lon}} );
    console.log('set lat long in app js', this.state);
  }

  performSearch = (lat, lon) => {
    // console.log(lat, lon, this.state)
    const exclude = '[minutely,hourly,daily,flags]';
    const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${lat},${lon}?units=ca&exclude=${exclude}`;
    axios.get(api)
      .then(res => {
        // console.log(res.data);
        return this.setState({ weather: res.data, isLoaded: true, isLoading: false })
      })
  }

  render() {
    return (
      <div className="Container">
          {/* {console.log(this.state)}          */}
          <WeatherTabs 
            weatherState={this.state} 
            performSearch={this.performSearch} 
            toggleLoading={this.toggleLoading}
            setLatLon={this.setLatLon} />
          {/* <MapCard /> */}
      </div>
    );
  }
}

export default App;
