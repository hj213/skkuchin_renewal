import { combineReducers } from 'redux';
import authReducer from './auth';
import placeReducer from './place';

export default combineReducers({
    auth: authReducer,
    place: placeReducer
});