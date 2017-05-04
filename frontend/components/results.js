import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

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

    axios.get(`https://api.taxifarefinder.com/fare?key=${TFFApiKey}&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`, {
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type" : "application/json",
        "dataType" : 'application/json'
      }
    })
      .then((fare) => console.log('FARE:', fare));
  }

//   var URL = `https://api.taxifarefinder.com/fare?key=${TFFApiKey}&origin=${currentLatitude},${currentLongitude}&destination=${destinationLatitude},${destinationLongitude}`
    
//     $.ajax({
//       url: URL,
//       type:'GET',
//     }).done((fare) => {
//       console.log('FARE AJAX: ', fare)
//     })
// }

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