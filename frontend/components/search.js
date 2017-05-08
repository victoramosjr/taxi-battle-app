import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Loader from 'halogen/GridLoader';
import axios from 'axios';

import { testAction } from '../actions/index';
import GoogleMap from './google-map';
import SearchCard from './search-card';
import css from '../style/style.scss';

const mapApiKey = 'AIzaSyBB3U2peonxbj2LOnS3JqQLXO6aeqd4vdE';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickupSearch: true,
      latitude: null,
      longitude: null,
      address: null,
      destinationSearch: false,
      destinationLoadTrigger: true,
      destinationFirstLoad: true,
      destinationWillMountSearchTerm: null,
      destinationWillMountLatitude: null,
      destinationWillMountLongitude: null,
      destinationLatitude: null,
      destinationLongitude: null,
      destinationAddress: null,
    };

    this.findAddress = this.findAddress.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.pickupSearch = this.pickupSearch.bind(this);
    this.findMe = this.findMe.bind(this);
    this.destinationLoadTrigger = this.destinationLoadTrigger.bind(this);
    this.destinationSearch = this.destinationSearch.bind(this);
    this.destinationSearchAgain = this.destinationSearchAgain.bind(this);
    this.searchCurrentFares = this.searchCurrentFares.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.findAddress);
  }

  onHandleChange(input, event) {
    this.setState({ [input]: event.target.value });
  }

  findMe() {
    this.setState({ latitude: null, longitude: null, address: null });
    navigator.geolocation.getCurrentPosition(this.findAddress);
  }

  findAddress({ coords: { latitude, longitude } }) {
    this.setState({ latitude, longitude });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapApiKey}`)
      .then((address) => {
        this.setState({
          address: address.data.results[0].formatted_address,
          destinationWillMountSearchTerm: address.data.results[2].formatted_address.split(' ').join('+'),
        });
      });
  }

  pickupSearch(event) {
    let address = this.state.address.split(' ').join('+');

    event.preventDefault();
    this.setState({ latitude: null, longitude: null });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapApiKey}`)
      .then((address) => {
        this.setState({
        address: address.data.results[0].formatted_address,
        latitude: address.data.results[0].geometry.location.lat,
        longitude: address.data.results[0].geometry.location.lng,
        destinationWillMountSearchTerm: `${address.data.results[0].address_components[2].long_name.split(' ').join('+')},${address.data.results[0].address_components[5].short_name.split(' ').join('+')}`,
        });
      });
  }

  destinationLoadTrigger() {
    setTimeout(() => {
      this.setState({ destinationLoadTrigger: false });
    }, 1000);
  }

  destinationSearch() {
    this.setState({ pickupSearch: false, destinationSearch: true });
    this.destinationLoadTrigger();
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destinationWillMountSearchTerm}&key=${mapApiKey}`)
      .then((address) => {
        this.setState({
          destinationWillMountLatitude: address.data.results[0].geometry.location.lat,
          destinationWillMountLongitude: address.data.results[0].geometry.location.lng,
        });
      });
  }

  destinationSearchAgain(e) {
    const address = this.state.destinationAddress.split(' ').join('+');

    e.preventDefault();
    this.setState({
      destinationLatitude: null,
      destinationLongitude: null,
      destinationFirstLoad: false
    });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapApiKey}`)
      .then(address => {
        this.setState({
          destinationAddress: address.data.results[0].formatted_address,
          destinationLatitude: address.data.results[0].geometry.location.lat,
          destinationLongitude: address.data.results[0].geometry.location.lng,
          destinationWillMountSearchTerm: `${address.data.results[0].address_components[2].long_name.split(' ').join('+')},${address.data.results[0].address_components[5].short_name.split(' ').join('+')}`,
        });
      });
  }

  searchCurrentFares() {
    browserHistory.push('/results');
    this.props.testAction(this.state);
  }

  render() {
    const {
      pickupSearch,
      destinationSearch,
      latitude,
      longitude,
      address,
      destinationLoadTrigger,
      destinationFirstLoad,
      destinationWillMountLatitude,
      destinationWillMountLongitude,
      destinationLatitude,
      destinationLongitude,
      destinationAddress,
    } = this.state;

    if (pickupSearch) {
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
            zoom={17}
            latitude={latitude}
            longitude={longitude}
          />
          <SearchCard
            address={address}
            onHandleChange={this.onHandleChange}
            pickupSearch={this.pickupSearch}
            findMe={this.findMe}
            destinationSearch={this.destinationSearch}
            floatingLabel="Pickup Address"
            textHint="Enter Pickup Address"
            buttonText="Enter Destination"
            buttonType="Directions"
            inputType="Pickup"
          />
        </div>
      );
    }  

    if (destinationSearch && destinationLoadTrigger) {
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
    } else if (destinationSearch && !destinationLoadTrigger && destinationFirstLoad) {
      return (
        <div className="search">
          <GoogleMap
            zoom={12}
            latitude={destinationWillMountLatitude}
            longitude={destinationWillMountLongitude}
          />
          <SearchCard
            address={destinationAddress}
            onHandleChange={this.onHandleChange}
            findMe={this.findMe}
            destinationSearchAgain={this.destinationSearchAgain}
            searchCurrentFares={this.searchCurrentFares}
            floatingLabel="Destination Address"
            textHint="Enter Destination Address"
            buttonText="Search Current Fares"
            buttonType="Price"
            inputType="Destination"
            destinationLatitude={destinationLatitude}
            destinationLongitude={destinationLongitude}
          />
        </div>
      );
    } else if (destinationSearch && !destinationLoadTrigger && !destinationFirstLoad) {
      if (!destinationLatitude || !destinationLongitude) {
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
            zoom={17}
            latitude={destinationLatitude}
            longitude={destinationLongitude}
          />
          <SearchCard
            address={destinationAddress}
            onHandleChange={this.onHandleChange}
            findMe={this.findMe}
            destinationSearchAgain={this.destinationSearchAgain}
            searchCurrentFares={this.searchCurrentFares}
            floatingLabel="Destination Address"
            textHint="Enter Destination Address"
            buttonText="Search Current Fares"
            buttonType="Price"
            inputType="Destination"
            destinationLatitude={destinationLatitude}
            destinationLongitude={destinationLongitude}
          />
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testAction }, dispatch);
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
