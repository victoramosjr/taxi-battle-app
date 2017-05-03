import {
  FARE_SEARCH_PARAMETERS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FARE_SEARCH_PARAMETERS:
      return {...state, searchParameters: action.payload};
    default:
      return state
  }
}