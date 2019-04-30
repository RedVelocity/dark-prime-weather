import React from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
// import Media from 'react-media';
import MediaQuery from "react-responsive";

function WeatherChart({ weatherState }) {
  let dailyWeather = null,
    chartData = null;
  // console.log('chart props', weather, isLoaded);
  if (weatherState.isLoaded && !weatherState.isLoading) {
    dailyWeather = weatherState.weather.daily.data;
    chartData = {
      labels: dailyWeather.map(daily =>
        moment.unix(daily.time).format("ddd DD/MM")
      ),
      datasets: [
        {
          label: "Temperature High",
          data: dailyWeather.map(daily =>
            Math.round(daily.apparentTemperatureHigh)
          ),
          fill: false,
          backgroundColor: "#f7a800",
          borderColor: "#f7a800"
        },
        {
          label: "Temperature Low",
          data: dailyWeather.map(daily =>
            Math.round(daily.apparentTemperatureLow)
          ),
          fill: false,
          backgroundColor: "#1385ae",
          borderColor: "#1385ae"
        },
        {
          label: "Average",
          data: dailyWeather.map(daily =>
            Math.round(
              (daily.apparentTemperatureHigh + daily.apparentTemperatureLow) / 2
            )
          ),
          fill: false,
          backgroundColor: "#e02365",
          borderColor: "#e02365"
        }
      ]
    };
    // console.log('data', data);
  }
  return (
    <div>
      {/* <Media query="(max-width: 500px)">
          {matches =>
            matches ? (              
            <div>      
              {(data !== null) && <Chart type="line" data={data} width="380px" /> }
            </div>
            ) : (
            <div>      
              {(data !== null) && <Chart type="line" data={data} width="500px" /> }
            </div>
            )
          }
    </Media> */}
      <MediaQuery maxWidth={500}>
        {matches => {
          if (matches) {
            return (
              <div>
                {chartData !== null && (
                  <Chart type="line" data={chartData} width="85vw" />
                )}
              </div>
            );
          } else {
            return (
              <div>
                {chartData !== null && (
                  <Chart type="line" data={chartData} width="38vw" />
                )}
              </div>
            );
          }
        }}
      </MediaQuery>
    </div>
  );
}

export default WeatherChart;
