import axios from 'axios';

import {
  DO_NOT_GEOLOCATE
} from './types';

export const doNotGeolocate = () => {
  console.log('DO NOT GEOLOCATE TRIGGERED')
  return {
    type: DO_NOT_GEOLOCATE,
    payload: 'true'
  }
};
