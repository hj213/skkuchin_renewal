import { combineReducers } from 'redux';
import authReducer from './auth';
import favoriteReducer from './favorite';
import placeReducer from './place';

export default combineReducers({
    auth: authReducer,
    favorite: favoriteReducer,
    place: placeReducer,
});