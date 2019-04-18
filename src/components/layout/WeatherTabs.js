import React, {Component} from 'react';
import {TabView,TabPanel} from 'primereact/tabview';
import WeatherCard from './WeatherCard';
import MapCard from './MapCard';

class WeatherTabs extends Component {
  render() {
    return (
        <TabView className="weather-box" renderActiveOnly={false}>
            <TabPanel header="Weather" leftIcon="pi pi-cloud">
                <WeatherCard weatherState={this.props.weatherState} performSearch={this.props.performSearch} toggleLoading={this.props.toggleLoading} />
            </TabPanel>
            <TabPanel header="Map" leftIcon="pi pi-map-marker">
                <MapCard weatherState={this.props.weatherState} />
            </TabPanel>
        </TabView>
    )
  }
}

export default WeatherTabs;
