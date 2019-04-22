import React from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
// import marker from '../../assets/marker.png'
// import Pin from './Pin'

export default function MapCard({ weatherState, setViewport }) {
  return (
    <div style={{ display: "grid" }}>
      <MediaQuery maxWidth={500}>
        {matches => {
          if (matches) {
            return (
              <ReactMapGL
                {...weatherState.viewport}
                width="400px"
                height="auto"
                onViewportChange={viewport => setViewport(viewport)}
                mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              >
                <div style={{ position: "absolute", right: 0 }}>
                  <NavigationControl
                    onViewportChange={viewport => setViewport(viewport)}
                  />
                </div>
              </ReactMapGL>
            );
          } else {
            return (
              <ReactMapGL
                {...weatherState.viewport}
                width="900px"
                height="400px"
                onViewportChange={viewport => setViewport(viewport)}
                mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              >
                <div style={{ position: "absolute", right: 0 }}>
                  <NavigationControl
                    onViewportChange={viewport => setViewport(viewport)}
                  />
                </div>
              </ReactMapGL>
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
