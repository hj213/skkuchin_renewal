import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_PLACE_SUCCESS,
    LOAD_PLACE_FAIL,
    LOAD_PLACES_SUCCESS,
    LOAD_PLACES_FAIL,
    ENROLL_PLACE_SUCCESS,
    ENROLL_PLACE_FAIL,
    MODIFY_PLACE_SUCCESS,
    MODIFY_PLACE_FAIL,
    DELETE_PLACE_SUCCESS,
    DELETE_PLACE_FAIL,
    SEARCH_PLACES_SUCCESS,
    SEARCH_PLACES_FAIL,
    SEARCH_PLACES_DISCOUNT_SUCCESS,
    SEARCH_PLACES_DISCOUNT_FAIL,
    SEARCH_PLACES_CATEGORY_SUCCESS,
    SEARCH_PLACES_CATEGORY_FAIL,
    SEARCH_PLACES_TAG_SUCCESS,
    SEARCH_PLACES_TAG_FAIL,
    SEARCH_PLACES_KEYWORD_SUCCESS,
    SEARCH_PLACES_KEYWORD_FAIL,
    CLEAR_SEARCH_RESULTS,
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
        case ENROLL_PLACE_SUCCESS:
            return {
                ...state
            }
        case ENROLL_PLACE_FAIL:
            return {
                ...state
            }
        case MODIFY_PLACE_SUCCESS:
            return {
                ...state
            }
        case MODIFY_PLACE_FAIL:
            return {
                ...state
            }
        case DELETE_PLACE_SUCCESS:
            return {
                ...state
            }
        case DELETE_PLACE_FAIL:
            return {
                ...state
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
        case SEARCH_PLACES_DISCOUNT_SUCCESS:
            return {
                ...state,
                searchplace: payload
            }
        case SEARCH_PLACES_DISCOUNT_FAIL:
            return {
                ...state,
                searchplace: null
            }
        case SEARCH_PLACES_CATEGORY_SUCCESS:
            return {
                ...state,
                searchplace: payload
            }
        case SEARCH_PLACES_CATEGORY_FAIL:
            return {
                ...state,
                searchplace: null
            }
        case SEARCH_PLACES_TAG_SUCCESS:
            return {
                ...state,
                searchplace: payload
            }
        case SEARCH_PLACES_TAG_FAIL:
            return {
                ...state,
                searchplace: null
            }
        case SEARCH_PLACES_KEYWORD_SUCCESS:
            return {
                ...state,
                searchplace: payload
            }
        case SEARCH_PLACES_KEYWORD_FAIL:
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
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default placeReducer;