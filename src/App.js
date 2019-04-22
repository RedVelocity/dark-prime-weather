import React, { Component } from "react";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-colored/theme.css";
import "primeicons/primeicons.css";
import "./App.css";
import WeatherTabs from "./components/layout/WeatherTabs";
import { getWeather } from "./API";

class App extends Component {
  state = {
    weather: {},
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997,
      zoom: 11
    },
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

  setViewport = viewport => {
    this.setState({ ...this.state, viewport: viewport });
    // console.log('set viewport in app js', this.state);
  };

  performSearch = async (lat, lon) => {
    const res = await getWeather(lat, lon);
    // console.log("res data appjs", res);
    if (res !== 0) {
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
    } else return null;
  };

  render() {
    // console.log("App State", this.state);
    return (
      <div className="Container">
        <WeatherTabs
          weatherState={this.state}
          performSearch={this.performSearch}
          toggleLoading={this.toggleLoading}
          setViewport={this.setViewport}
        />
      </div>
    );
  }
}

export default App;
