import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,
    ENROLL_MENU_SUCCESS,
    ENROLL_MENU_FAIL,
    MODIFY_MENU_SUCCESS,
    MODIFY_MENU_FAIL,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAIL,
} from '../actions/menu/types'
import { CLEAR_SEARCH_RESULTS } from '../actions/place/types';

const initialState = {
    menu: null,
};

const menuReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_MENU_SUCCESS:
            return {
                ...state,
                menu: payload
            }
        case LOAD_MENU_FAIL:
            return {
                ...state,
                menu: null
            }
        case ENROLL_MENU_SUCCESS:
            return {
                ...state
            }
        case ENROLL_MENU_FAIL:
            return {
                ...state
            }
        case MODIFY_MENU_SUCCESS:
            return {
                ...state
            }
        case MODIFY_MENU_FAIL:
            return {
                ...state
            }
        case DELETE_MENU_SUCCESS:
            return {
                ...state
            }
        case DELETE_MENU_FAIL:
            return {
                ...state
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                menu: null
            }
        default:
            return state;
    };
}

export default menuReducer;