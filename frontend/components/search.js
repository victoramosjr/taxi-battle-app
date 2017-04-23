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
      destinationAddress: null
    };

    this.findAddress = this.findAddress.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.pickupSearch = this.pickupSearch.bind(this);
    this.findMe = this.findMe.bind(this);
    this.destinationLoadTrigger = this.destinationLoadTrigger.bind(this);
    this.destinationSearch = this.destinationSearch.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.findAddress)
  }

  onHandleChange(input, event) {
    this.setState({ [input]: event.target.value })
  }

  findMe() {
    this.setState({ latitude: null, longitude: null, address: null });
    navigator.geolocation.getCurrentPosition(this.findAddress)
    console.log('FIND ME TRIGGERED')
  }

  findAddress({ coords: { latitude, longitude } }) {
    this.setState({ latitude, longitude });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${mapApiKey}`)
      .then(address => {
        console.log(address) 
        this.setState({ 
          address: address.data.results[0].formatted_address,
          destinationWillMountSearchTerm: address.data.results[2].formatted_address.split(" ").join("+")
        })
        console.log(this.state.destinationWillMountSearchTerm)
      })
  }

  pickupSearch(event) {
    event.preventDefault();
    
    let address = this.state.address.split(" ").join("+");
    this.setState({ latitude: null, longitude: null });
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapApiKey}`)
      .then(address => {
        this.setState({ 
        address: address.data.results[0].formatted_address,
        latitude: address.data.results[0].geometry.location.lat,
        longitude: address.data.results[0].geometry.location.lng,
        destinationWillMountSearchTerm: `${address.data.results[0].address_components[2].long_name.split(" ").join("+")},${address.data.results[0].address_components[5].short_name.split(" ").join("+")}`
        })
        console.log('PICKUP SEARCH', address)
      })
  }

  destinationLoadTrigger() {
    setTimeout( () => {
      this.setState({ destinationLoadTrigger: false })
    }, 1000)
  }

  destinationSearch() {
    this.setState({ pickupSearch: false, destinationSearch: true })
    this.destinationLoadTrigger();
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.destinationWillMountSearchTerm}&key=${mapApiKey}`)
      .then(address => {
        console.log('DESTINATION MOUNT SEARCH COMPLETE')
        this.setState({
          destinationWillMountLatitude: address.data.results[0].geometry.location.lat,
          destinationWillMountLongitude: address.data.results[0].geometry.location.lng,
        })
        console.log(this.state.destinationWillMountLatitude, this.state.destinationWillMountLongitude)
      })
  }

  render() {
    const {
      pickupSearch,
      destinationSearch,
      latitude,
      longitude,
      address,
      destinationWillMountSearchTerm,
      destinationLoadTrigger,
      destinationFirstLoad,
      destinationWillMountLatitude,
      destinationWillMountLongitude,
      destinationLatitude,
      destinationLongitude,
      destinationAddress
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
            zoom={18}
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
      )
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
            pickupSearch={this.pickupSearch}
            findMe={this.findMe}
            destinationSearch={this.destinationSearch}
            floatingLabel="Destination Address"
            textHint="Enter Destination Address"
            buttonText="Search Current Fares"
            buttonType="Price"
          />
        </div>
      )
    }


  }
}


// if (destinationSearch) {
//       if (!destinationLatitude || !destinationLongitude) {
//         return (
//           <div className="search">
//             <div className="search__loader">
//               <Loader 
//                 color="#fc4a66" 
//                 size="150px" 
//                 margin="8px" 
//               />
//             </div>
//           </div> 
//         )
//       }

//       return (
//         <div className="search">
//           <GoogleMap
//             latitude={}
//             longitude={longitude}
//           />

//           <SearchCard 
//             address={address}
//             latitude={latitude}
//             longitude={longitude}
//             onHandleChange={this.onHandleChange}
//             pickupSearch={this.pickupSearch}
//             findMe={this.findMe}
//             destinationSearch={this.destinationSearch}
//           />
//         </div>
//       );
//     }

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, actions)(Search);
