import { combineReducers } from 'redux';
import locationReducer from './location-reducer';

const rootReducer = combineReducers({
  location: locationReducer
});

export default rootReducer;
