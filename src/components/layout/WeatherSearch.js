import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import {InputText} from 'primereact/inputtext';
// import {Button} from 'primereact/button';
import {AutoComplete} from 'primereact/autocomplete';

export default class WeatherSearch extends Component {
    state = { 
        latitude: 12.9791198,
        longitude: 77.5912997,
        place:'',
        suggestions: null,
        features: null
    };

    componentDidMount() {
      const { isLoaded, toggleLoading, performSearch} = this.props;
      if(!isLoaded) {
        if ("geolocation" in navigator) {
          /* geolocation is available */
          navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ latitude:position.coords.latitude, longitude:position.coords.longitude });
            toggleLoading();
            performSearch(position.coords.latitude, position.coords.longitude);
          });
        } else {
          /* geolocation IS NOT available */
        }
      };
    }

    loadSuggestions = (e) => {
      const api = encodeURI(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.place}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place&proximity=${this.state.longitude},${this.state.latitude}&language=en`)
      axios.get(api)
        .then(res => {
          if(res.data.features.length !== 0) {
          this.setState({suggestions: res.data.features.map((feature) => feature.place_name), features: res.data.features})
          // console.log('place state', this.state);
        } else this.setState({ ...this.state, features:null, suggestions: ['Place Not Found'] })
        }).catch((error) => {
          console.log(error);
        })
      
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
    }

    onSelect = (e) => {
      if(this.state.features !== null && this.state.features !== undefined) {
        const { toggleLoading, performSearch} = this.props;
        const feature = this.state.features.filter((feature) => feature.place_name === e.value);
        if(feature.length !== 0) {
          this.setState({latitude:feature[0].geometry.coordinates[1], longitude:feature[0].geometry.coordinates[0]});
        // console.log('selected co-ords',feature[0].geometry.lat, latitude:feature[0].geometry.lat, this.state);
          toggleLoading();
          performSearch(feature[0].geometry.coordinates[1], feature[0].geometry.coordinates[0]);
        } else this.setState({place: ''})
      } else this.setState({place: ''})
    }

    render() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '500px'}} >
        {/* <span className="p-float-label"   > */}
        <label 
          style={{margin: '5px 5px 0px 5px', fontWeight: 'bold'}}>Enter Place Name</label>
        <AutoComplete 
          inputStyle={{margin: '2px', width: '300px'}}
          style={{margin: '5px'}}
          placeholder="Place"
          value={this.state.place} 
          onChange={(e) => this.setState({place: e.target.value})}
          suggestions={this.state.suggestions} 
          completeMethod={this.loadSuggestions}
          onSelect={this.onSelect} />
        {/* <InputText 
              style={{flex: '5'}}
              placeholder="Enter Place Name" 
              id="place"
              value={this.state.place} 
              onChange={(e) => this.setState({place: e.target.value})}    
              /> */}
              {/* <label htmlFor="place">Enter Place Name</label>
        </span> */}
        {/* <Button 
              style={{flex: '4'}}
              label="Get Weather" 
              onClick={this.onSearchv2} /> */}
        </div>
    )
  }
}

WeatherSearch.propTypes = {
  performSearch: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
}