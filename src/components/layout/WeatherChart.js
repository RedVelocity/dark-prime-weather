import React from 'react'
import moment from 'moment';
import {Chart} from 'primereact/chart';

function WeatherChart( {weatherState} ) {

    let daily = null;
    let data = null;
    // console.log('chart props', weather, isLoaded);
    if(weatherState.isLoaded) {
        daily = weatherState.weather.daily;
        console.log('daily', daily);
        data = {
        labels: daily.data.map((daily) => moment.unix(daily.time).format('DD/MM')),
        datasets: [
            {
                label: 'Temperature High',
                data: daily.data.map((daily) => daily.apparentTemperatureHigh),
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            },
            {
                label: 'Temperature Low',
                data: daily.data.map((daily) => daily.apparentTemperatureLow),
                fill: false,
                backgroundColor: '#66BB6A',
                borderColor: '#66BB6A'
            }
        ]   
    };
    // console.log('data', data);
  }
  return (
    <div className="weather-card">      
      {(data !== null) && <Chart type="line" data={data} /> }
    </div>
  )
}

export default WeatherChart;