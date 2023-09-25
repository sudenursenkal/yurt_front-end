// rootReducer.js
import { combineReducers } from 'redux';
import addressReducer from './reducers';

const rootReducer = combineReducers({
  address: addressReducer,
});

export default rootReducer;
