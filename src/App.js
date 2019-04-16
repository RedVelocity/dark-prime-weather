import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-colored/theme.css';
import 'primeicons/primeicons.css';
import './App.css';
import WeatherTabs from './components/layout/WeatherTabs';
// import {Messages} from 'primereact/messages';

class App extends Component {

  state = { 
    weather: {},
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () =>  this.setState({isLoading: !this.state.isLoading});

  performSearch = (lat, lon) => {
    console.log(lat, lon, this.state)
    const exclude = '[minutely,hourly,daily,flags]';
    const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9f911aad47a388aa161a81af34f48144/${lat},${lon}?units=ca&exclude=${exclude}`;
    axios.get(api)
      .then(res => {
        console.log(res.data);
        return this.setState({ weather: res.data, isLoaded: true, isLoading: false })
      })
  }

  render() {
    return (
      <div className="Container">
          {/* {console.log(this.state)}          */}
          <WeatherTabs weatherState={this.state} performSearch={this.performSearch} toggleLoading={this.toggleLoading} />
      </div>
    );
  }
}

export default App;
