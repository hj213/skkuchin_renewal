import { combineReducers } from 'redux';
import authReducer from './auth';
import favoriteReducer from './favorite';

export default combineReducers({
    auth: authReducer,
    favorite: favoriteReducer
});