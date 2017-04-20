import {
  GET_LOCATION
} from '../actions/types';

const INIT_STATE = {
  coords: {
    latitude: 0,
    longitude: 0
  }
}

export default function(state = INIT_STATE, action) {
  switch(action.type) {
    case GET_LOCATION:
      return action.payload;
    default:
      return state
  }
}