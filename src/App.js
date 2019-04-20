import React, { Component } from 'react';
import axios from 'axios';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-colored/theme.css';
import 'primeicons/primeicons.css';
import './App.css';
import WeatherTabs from './components/layout/WeatherTabs';
// import Moment from 'react-moment';
import moment from 'moment';
import {Chart} from 'primereact/chart';

class App extends Component {

  state = { 
    weather: {},
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997,
      zoom: 12
    },
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () =>  this.setState({isLoading: !this.state.isLoading});

  setViewport = (viewport) => {
    this.setState({ ...this.state, viewport:viewport });
    // console.log('set viewport in app js', this.state);
  }

  performSearch = (lat, lon) => {
    const exclude = '[minutely,hourly,flags]';
    const api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${lat},${lon}?units=ca&exclude=${exclude}`;
    axios.get(api)
      .then(res => {
        console.log('weather data', res.data);
        return this.setState({ weather: res.data, viewport:{...this.state.viewport, latitude: res.data.latitude, longitude: res.data.longitude, zoom:10}, isLoaded: true, isLoading: false })
      }).catch((error) => {
        console.log(error);
      })
  }

  render() {
      const { daily } = this.state.weather;
      console.log('daily', daily);
      let data = null;
      if(this.state.isLoaded) {
          data = {
          labels: daily.data.map((daily) => moment.unix(daily.time).format('DD/MM')),
          datasets: [
              {
                  label: 'Temperature High',
                  data: daily.data.map((daily) => daily.apparentTemperatureHigh),
                  fill: false,
                  backgroundColor: '#42A5F5',
                  borderColor: '#42A5F5'
              }
              // {
              //     label: 'Second Dataset',
              //     data: [28, 48, 40, 19, 86, 27, 90],
              //     fill: false,
              //     backgroundColor: '#66BB6A',
              //     borderColor: '#66BB6A'
              // }
          ]   
      };
      console.log('data', data);
    }
    return (
      
      <div className="Container">
      {(data !== null) &&
      <Chart type="line" data={data} /> }
          <WeatherTabs 
            weatherState={this.state} 
            performSearch={this.performSearch} 
            toggleLoading={this.toggleLoading}
            setViewport={this.setViewport} />
          {/* <MapCard /> */}
      </div>
    );
  }
}

export default App;
