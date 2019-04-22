import React, { Component } from "react";
import PropTypes from "prop-types";
import { AutoComplete } from "primereact/autocomplete";
import { getLocation, getSuggestions } from "../../API";

export default class WeatherSearch extends Component {
  state = {
    //hold gps location for proximity
    latitude: null,
    longitude: null,
    place: "",
    suggestions: null,
    features: null,
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

    // const api = encodeURI(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.place}&key=${process.env.REACT_APP_OPENCAGE_KEY}&proximity=${this.state.latitude}, ${this.state.longitude}&language=en-in&limit=5&min_confidence=1&no_annotations=1&abbrv=1`)
    // axios.get(api)
    //   .then(res => {
    //     if(res.data.results.length !== 0) {
    //       this.setState(
    //         {suggestions: res.data.results.map((feature) => feature.formatted), features: res.data.results})
    //     // console.log('place state', res.data.results.length);
    //     } else this.setState({ ...this.state, fetaures:null, suggestions: ['Place Not Found'] })
    //   }).catch((error) => {
    //     console.log(error);
    //   })
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
