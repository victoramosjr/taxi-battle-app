import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import JSONP from 'jsonp'
const TFFApiKey = 'sw5VaSp7Xavu';

class Results extends Component {

  componentWillMount() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude
    } = this.props.searchParameters;

    const URL = `https://api.taxifarefinder.com/fare?key=${TFFApiKey}&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`

    JSONP(URL, function(error, data) {
        // handle results here
        console.log('error: ', error)
        console.log('data: ', data)
    });
  }

  render() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude
    } = this.props.searchParameters;
    
    return (
      <div>
        {currentLatitude}
        {currentLongitude}
        {destinationLatitude}
        {destinationLongitude}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { searchParameters: state.location.searchParameters };
}

export default connect(mapStateToProps, actions)(Results);