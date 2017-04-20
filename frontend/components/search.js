import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {
  componentWillMount() {
    this.props.getLocation();
  }

  render() {
    const { coords: { latitude, longitude }} = this.props.location;

    return (
      <div>
        SEARCH:
        <input type="text" />
        {latitude} | {longitude}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { location: state.location };
}

export default connect(mapStateToProps, actions)(Search);
