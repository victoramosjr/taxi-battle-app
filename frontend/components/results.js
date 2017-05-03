import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';

const TFFApiKey = 'sw5VaSp7Xavu';

class Results extends Component {

  componentWillMount() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude
    } = this.props.searchParameters;

    axios.get(`https://api.taxifarefinder.com/fare?key=${TFFApiKey}&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`)
      .then((fare) => console.log('FARE:', fare));
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { searchParameters: state.location.searchParameters };
}

export default connect(mapStateToProps, actions)(Results);