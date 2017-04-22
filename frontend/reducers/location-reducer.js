import {
  GET_LOCATION,
  FIND_ADDRESS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
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