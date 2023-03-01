import {
    LOAD_PLACE_SUCCESS,
    LOAD_PLACE_FAIL,
    LOAD_PLACES_SUCCESS,
    LOAD_PLACES_FAIL,
    SEARCH_PLACES_SUCCESS,
    SEARCH_PLACES_FAIL,
    CLEAR_SEARCH_RESULTS
} from '../actions/place/types'

const initialState = {
    place: null,
};

const placeReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_PLACES_SUCCESS:
            return {
                ...state,
                allplaces: payload
            }
        case LOAD_PLACES_FAIL:
            return {
                ...state,
                allplaces: null
            }
        case LOAD_PLACE_SUCCESS:
            return {
                ...state,
                place: payload
            }
        case LOAD_PLACE_FAIL:
            return {
                ...state,
                place: null
            }
        case SEARCH_PLACES_SUCCESS:
            return {
                ...state,
                searchplace: payload
            }
        case SEARCH_PLACES_FAIL:
            return {
                ...state,
                searchplace: null
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchplace: null,
                place: null
            };
        default:
            return state;
    };
}

export default placeReducer;