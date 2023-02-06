import { combineReducers } from 'redux';
import authReducer from './auth';
import favoriteReducer from './favorite';
import menuReducer from './menu';
import placeReducer from './place';
import reviewReducer from './review';

export default combineReducers({
    auth: authReducer,
    favorite: favoriteReducer,
    place: placeReducer,
    menu: menuReducer,
    review: reviewReducer,
});