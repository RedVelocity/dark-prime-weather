import React, { Component } from 'react';
import * as opencage from 'opencage-api-client';
import PropTypes from 'prop-types';
// import axios from 'axios';
//import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export default class WeatherSearch extends Component {
    state = { 
        latitude: 12.9791198,
        longitude: 77.5912997,
        place:'Bengaluru, India'
    };

    onSearch = (e) => {
        opencage.geocode({q: this.state.place, key: process.env.REACT_APP_OPENCAGE_KEY}).then(data => {
            // console.log(JSON.stringify(data));
            if (data.status.code === 200) {
              if (data.results.length > 0) {
                var place = data.results[0];
                // console.log(place.formatted);
                this.setState({ latitude: place.geometry.lat, longitude: place.geometry.lng  });
                // console.log('geocode',this.state, place.geometry);
                this.props.toggleLoading();
                this.props.performSearch(this.state.latitude, this.state.longitude);
                // console.log(place.annotations.timezone.name);
              }
            } else if (data.status.code === 402) {
              console.log('hit free-trial daily limit');
              console.log('become a customer: https://opencagedata.com/pricing'); 
            } else {
              // other possible response codes:
              // https://opencagedata.com/api#codes
              console.log('error', data.status.message);
            }
          }).catch(error => {
            console.log('error', error.message);
          });
    }

    componentDidMount() {
      if(!this.props.isLoaded) {this.onSearch()};
    }

    render() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
        <span className="p-float-label"   >
        <InputText 
              //placeholder="Place" 
              id="place"
              value={this.state.place} 
              onChange={(e) => this.setState({place: e.target.value})}    
              />
              <label htmlFor="place">Enter Place Name</label>
        </span>
        <Button 
              label="Get Weather" 
              onClick={this.onSearch} />
        </div>
    )
  }
}

WeatherSearch.propTypes = {
  performSearch: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
}