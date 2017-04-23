import {
  DO_NOT_GEOLOCATE,
  GET_LOCATION,
  FIND_ADDRESS
} from '../actions/types';

export default function(state = { reloaded: false }, action) {
  switch(action.type) {
    case DO_NOT_GEOLOCATE:
      return { ...state, reloaded: action.payload }
    case GET_LOCATION:
      return { 
        ...state, 
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude,
        address: action.payload 
      };
    default:
      return state
  }
}