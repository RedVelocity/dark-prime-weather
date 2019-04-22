import React from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
// import Media from 'react-media';
import MediaQuery from "react-responsive";

function WeatherChart({ weatherState }) {
  let daily = null;
  let data = null;
  // console.log('chart props', weather, isLoaded);
  if (weatherState.isLoaded && !weatherState.isLoading) {
    daily = weatherState.weather.daily;
    data = {
      labels: daily.data.map(daily =>
        moment.unix(daily.time).format("ddd DD/MM")
      ),
      datasets: [
        {
          label: "Temperature High",
          data: daily.data.map(daily =>
            Math.round(daily.apparentTemperatureHigh)
          ),
          fill: false,
          backgroundColor: "#f7a800",
          borderColor: "#f7a800"
        },
        {
          label: "Temperature Low",
          data: daily.data.map(daily =>
            Math.round(daily.apparentTemperatureLow)
          ),
          fill: false,
          backgroundColor: "#42A5F5",
          borderColor: "#42A5F5"
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
                {data !== null && (
                  <Chart type="line" data={data} width="85vw" />
                )}
              </div>
            );
          } else {
            return (
              <div>
                {data !== null && (
                  <Chart type="line" data={data} width="38vw" />
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
