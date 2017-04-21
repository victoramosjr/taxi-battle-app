import {
  GET_LOCATION
} from './types';

export const getLocation = () => {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Browser Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission Denied'));
    });
  });

  return {
    type: GET_LOCATION,
    payload: location
  }
};