import axios from 'axios';

import {
  FARE_SEARCH_PARAMETERS,
  DO_NOT_GEOLOCATE
} from './types';

export const testAction = (state) => {
  return {
    type: FARE_SEARCH_PARAMETERS,
    payload: {
      currentLatitude: state.latitude,
      currentLongitude: state.longitude,
      destinationLatitude: state.destinationLatitude,
      destinationLongitude: state.destinationLongitude
    }
  }
}

export const doNotGeolocate = () => {
  console.log('DO NOT GEOLOCATE TRIGGERED')
  return {
    type: DO_NOT_GEOLOCATE,
    payload: 'true'
  }
};
