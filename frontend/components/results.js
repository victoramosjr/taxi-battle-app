import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import JSONP from 'jsonp';

import * as actions from '../actions';

const TFFApiKey = 'sw5VaSp7Xavu';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taxifarefinder: '',
      lyft: '',
      uber: '',
    };

    this.getUberEstimate = this.getUberEstimate.bind(this);
    this.getLyftEstimate = this.getLyftEstimate.bind(this);
    this.getTaxiFareFinderEstimate = this.getTaxiFareFinderEstimate.bind(this);
    this.displayAllEstimate = this.displayAllEstimate.bind(this);
  }

  componentWillMount() {
    this.getTaxiFareFinderEstimate();
    this.getLyftEstimate();
    this.getUberEstimate();
  }

  getUberEstimate() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude,
    } = this.props.searchParameters;

    axios.get(`/api/estimate/uber/${currentLatitude}/${currentLongitude}/${destinationLatitude}/${destinationLongitude}`)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  getTaxiFareFinderEstimate() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude,
    } = this.props.searchParameters;

    const URL = `https://api.taxifarefinder.com/fare?key=${TFFApiKey}&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`;

    const self = this;
    JSONP(URL, (error, data) => {
      self.setState({ taxifarefinder: `$${data.metered_fare}` });
    });
  }

  getLyftEstimate() {
     const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude,
    } = this.props.searchParameters;

    axios.get(`/api/estimate/lyft/${currentLatitude}/${currentLongitude}/${destinationLatitude}/${destinationLongitude}`)
      .then((estimate) => {
        console.log(estimate)
        const minCost = estimate.data.cost_estimates[2].estimated_cost_cents_min * .01;
        const maxCost = estimate.data.cost_estimates[2].estimated_cost_cents_min * .01;
        this.setState({ lyft: `$${minCost}-${maxCost}` });
      })
      .catch(error => console.log(error));
  }

  displayAllEstimate() {
    const {  lyft, taxifarefinder } = this.state;

    if (taxifarefinder && lyft) {
      return (
        <div>
          { taxifarefinder }
          { lyft }
        </div>
      );
    }
    return <div> ... Loading</div>;
  }

  render() {
    const { 
      currentLatitude,
      currentLongitude,
      destinationLatitude,
      destinationLongitude,
    } = this.props.searchParameters;

    return (
      <div>
        {this.displayAllEstimate()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchParameters: state.location.searchParameters };
}

export default connect(mapStateToProps, actions)(Results);
