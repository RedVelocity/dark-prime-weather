import React, { Component } from "react";
import axios from "axios";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-colored/theme.css";
import "primeicons/primeicons.css";
import "./App.css";
import WeatherTabs from "./components/layout/WeatherTabs";
// import Moment from 'react-moment';

class App extends Component {
  state = {
    weather: {},
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997,
      zoom: 11,
      pitch: 0,
      bearing: 0
    },
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

  setViewport = viewport => {
    this.setState({ ...this.state, viewport: viewport });
    // console.log('set viewport in app js', this.state);
  };

  performSearch = (lat, lon) => {
    const exclude = "[minutely,hourly,flags]";
    const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${
      process.env.REACT_APP_DARKSKY_KEY
    }/${lat},${lon}?units=ca&exclude=${exclude}`;
    axios
      .get(api)
      .then(res => {
        // console.log('weather data', res.data);
        return this.setState({
          weather: res.data,
          viewport: {
            ...this.state.viewport,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            zoom: 11
          },
          isLoaded: true,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("App State", this.state);
    return (
      <div className="Container">
        <WeatherTabs
          weatherState={this.state}
          performSearch={this.performSearch}
          toggleLoading={this.toggleLoading}
          setViewport={this.setViewport}
        />
        {/* <MapCard /> */}
      </div>
    );
  }
}

export default App;
