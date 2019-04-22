import React, { Component } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from "primereact/autocomplete";
import { getLocation, getSuggestions } from "../../API";

export default class WeatherSearch extends Component {
  state = {
    //hold gps location for proximity suggestions
    latitude: null,
    longitude: null,
    //user entered text
    place: "",
    //place suggestions and coords in features
    suggestions: null,
    features: null,
    //user selected text
    place_name: ""
  };

  componentDidMount() {
    const { isLoaded, toggleLoading, performSearch } = this.props;
    if (!isLoaded) {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        // const asyncGetCurrentPosition = options =>
        //   new Promise((resolve, reject) => {
        //     navigator.geolocation.getCurrentPosition(resolve, reject, options);
        //   }); loc= await asyncGetCurrentPosition;
        navigator.geolocation.getCurrentPosition(async position => {
          const {
            coords: { latitude, longitude }
          } = position;
          this.setState({
            latitude: latitude,
            longitude: longitude
          });
          toggleLoading();
          const res = await getLocation(latitude, longitude);
          // console.log("res data getloc", res);
          if (res !== 0) {
            this.setState({
              ...this.state,
              place_name: res.features[0].place_name_en
            });
          }
          performSearch(latitude, longitude);
        });
      } else {
        /* geolocation IS NOT available */
      }
    }
  }

  loadSuggestions = async e => {
    const res = await getSuggestions(
      this.state.latitude,
      this.state.longitude,
      this.state.place
    );
    res !== 0
      ? this.setState({
          suggestions: res.features.map(feature => feature.place_name),
          features: res.features
        })
      : // console.log('place state', this.state);
        this.setState({
          ...this.state,
          features: null,
          suggestions: ["Place Not Found"]
        });
  };

  onSelect = e => {
    if (this.state.features !== null && this.state.features !== undefined) {
      const { toggleLoading, performSearch } = this.props;
      const feature = this.state.features.filter(
        feature => feature.place_name === e.value
      );
      if (feature.length !== 0) {
        // console.log('selected co-ords',feature[0].geometry.lat, latitude:feature[0].geometry.lat, this.state);
        toggleLoading();
        performSearch(
          feature[0].geometry.coordinates[1],
          feature[0].geometry.coordinates[0]
        );
        this.setState({ place: "", place_name: e.value });
      } else this.setState({ place: "" });
    } else this.setState({ place: "" });
  };

  render() {
    return (
      <div className="weather-search">
        {/* <span className="p-float-label"   > */}
        <AutoComplete
          inputStyle={{ marginTop: "2px", width: "300px" }}
          placeholder="Enter Place Name"
          value={this.state.place}
          onChange={e => this.setState({ place: e.target.value })}
          suggestions={this.state.suggestions}
          completeMethod={this.loadSuggestions}
          onSelect={this.onSelect}
        />
        <label style={{ margin: "10px" }}>{this.state.place_name}</label>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  performSearch: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
};
