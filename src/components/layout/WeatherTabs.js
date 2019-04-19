import React from 'react';
import {TabView,TabPanel} from 'primereact/tabview';
import WeatherCard from './WeatherCard';
import MapCard from './MapCard';
import PropTypes from 'prop-types';

function WeatherTabs ({ weatherState, performSearch, toggleLoading, setViewport }) {
    return (
        <TabView className="weather-box" renderActiveOnly={false}>
            <TabPanel header="Weather" leftIcon="pi pi-cloud">
                <WeatherCard weatherState={weatherState} performSearch={performSearch} toggleLoading={toggleLoading} />
            </TabPanel>
            <TabPanel header="Map" leftIcon="pi pi-map-marker">
                <MapCard weatherState={weatherState} setViewport={setViewport}/>
            </TabPanel>
        </TabView>
    )
}

WeatherTabs.propTypes = {
  performSearch: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  setViewport: PropTypes.func.isRequired,
  weatherState: PropTypes.object.isRequired
}

export default WeatherTabs;