import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'halogen/GridLoader';
import axios from 'axios';

import * as actions from '../actions';
import GoogleMap from './google-map';
import SearchCard from './search-card';
import css from '../style/style.scss';

const mapApiKey = 'AIzaSyBB3U2peonxbj2LOnS3JqQLXO6aeqd4vdE';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { latitude: null, longitude: null, address: null };

    this.findAddress = this.findAddress.bind(this);
    this.searchBox = this.searchBox.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.addressSearch = this.addressSearch.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.findAddress)
  }

  findAddress({ coords: { latitude, longitude } }) {

    this.setState({ latitude, longitude });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapApiKey}`)
      .then(address => this.setState({ address: address.data.results[0].formatted_address }))
  }

  searchBox() {
    return (
      <div>
        <input 
          type="text" 
          value={this.state.address} 
          onChange={this.onHandleChange.bind(this, "address")}
        />
      </div>
    )
  }

  onHandleChange(input, event) {
    this.setState({ [input]: event.target.value })
  }

  addressSearch(event) {
    event.preventDefault();
    
    let address = this.state.address.split(" ").join("+");
    this.setState({ latitude: null, longitude: null });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapApiKey}`)
      .then(address => {
        this.setState({ 
        address: address.data.results[0].formatted_address,
        latitude: address.data.results[0].geometry.location.lat,
        longitude: address.data.results[0].geometry.location.lng
        })
      })
  }

  render() {
    const { latitude, longitude, address } = this.state;

    if (!latitude || !longitude || !address) {
      return (
        <div className="search">
          <div className="search__loader">
            <Loader 
              color="#fc4a66" 
              size="150px" 
              margin="8px" 
            />
          </div>
        </div> 
      );
    }

    return (
      <div className="search">
        <GoogleMap
          latitude={latitude}
          longitude={longitude}
        />

        <SearchCard 
          address={address}
          latitude={latitude}
          longitude={longitude}
          onHandleChange={this.onHandleChange}
          addressSearch={this.addressSearch}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, actions)(Search);
