import {
    GET_FAV_SUCCESS,
    GET_FAV_FAIL,
    ENROLL_FAV_SUCCESS,
    ENROLL_FAV_FAIL,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAIL,
    // RESET_GET_FAV_SUCCESS,
    // SET_FAV_LOADING,
    // REMOVE_FAV_LOADING
} from '../actions/favorite/types';

const initialState = {
    // favorite: [],
    place: [],
};

const favoriteReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_FAV_SUCCESS:
            return {
                ...state,
                // favorite: payload.favorite
                place: payload.place
                // get_fav_success: true,
            }
        case GET_FAV_FAIL:
            return {
                ...state,
                // favorite: null
                place: null
            }
        case ENROLL_FAV_SUCCESS:
            return {
                ...state,
                favorite: payload.favorite
            }
        case ENROLL_FAV_FAIL:
            return {
                ...state,
            }
        case DELETE_FAV_SUCCESS:
            return {
                ...state,
            }
        case DELETE_FAV_FAIL:
            return {
                ...state,
            }
        
        
       
        default:
            return state;
    };
};

export default favoriteReducer;