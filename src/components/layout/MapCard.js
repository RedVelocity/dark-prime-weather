import React from "react";
import {
  // StaticMap,
  Marker,
  InteractiveMap,
  NavigationControl
} from "react-map-gl";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import marker from "../../assets/marker.png";

export default function MapCard({ weatherState, setViewport }) {
  return (
    <div style={{ display: "grid" }}>
      <MediaQuery maxWidth={500}>
        {matches => {
          if (matches) {
            return (
              <InteractiveMap
                {...weatherState.viewport}
                width="85vw"
                height="80vh"
                onViewportChange={viewport => setViewport(viewport)}
                mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              >
                <div style={{ position: "absolute", right: 0 }}>
                  <NavigationControl
                    onViewportChange={viewport => setViewport(viewport)}
                  />
                </div>
                <Marker
                  latitude={weatherState.weather.latitude}
                  longitude={weatherState.weather.longitude}
                  // offsetLeft={-20}
                  // offsetTop={-10}
                >
                  <img src={marker} alt="" />
                </Marker>
              </InteractiveMap>
              // <StaticMap
              //   width="85vw"
              //   height="80vh"
              //   {...weatherState.viewport}
              //   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              //   mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              // >
              //   <Marker
              //     latitude={weatherState.latitude}
              //     longitude={weatherState.longitude}
              //     offsetLeft={-20}
              //     offsetTop={-10}
              //   >
              //     <img src={marker} alt="" />
              //   </Marker>
              // </StaticMap>
            );
          } else {
            return (
              <InteractiveMap
                {...weatherState.viewport}
                width="70vw"
                height="75vh"
                onViewportChange={viewport => setViewport(viewport)}
                mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              >
                <div style={{ position: "absolute", right: 0 }}>
                  <NavigationControl
                    onViewportChange={viewport => setViewport(viewport)}
                  />
                </div>
                <Marker
                  latitude={weatherState.weather.latitude}
                  longitude={weatherState.weather.longitude}
                  offsetLeft={-18}
                  offsetTop={-25}
                >
                  <img src={marker} alt="" />
                </Marker>
              </InteractiveMap>
              // <StaticMap
              //   width="70vw"
              //   height="75vh"
              //   {...weatherState.viewport}
              //   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              //   mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              // >
              //   <Marker
              //     latitude={weatherState.viewport.latitude}
              //     longitude={weatherState.viewport.longitude}
              //     offsetLeft={-20}
              //     offsetTop={-10}
              //   >
              //     <img src={marker} alt="" />
              //   </Marker>
              // </StaticMap>
            );
          }
        }}
      </MediaQuery>
    </div>
  );
}

MapCard.propTypes = {
  setViewport: PropTypes.func.isRequired,
  weatherState: PropTypes.object.isRequired
};
