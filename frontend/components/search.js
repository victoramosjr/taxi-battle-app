import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'halogen/GridLoader';

import * as actions from '../actions';
import GoogleMap from './google-map';

class Search extends Component {
  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    const { coords: { latitude, longitude }} = this.props.location;

    if (!latitude || !longitude) {
      return (
        <Loader color="#fc4a66" size="200px" margin="4px" />
      );
    }

    return (
      <div>
        <div className="map">
          <GoogleMap
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, actions)(Search);
