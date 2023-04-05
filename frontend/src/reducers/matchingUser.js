import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    ADD_MATCHING_INFO_SUCCESS,
    ADD_MATCHING_INFO_FAIL,
    LOAD_MATCHING_INFO_SUCCESS,
    LOAD_MATCHING_INFO_FAIL,
    CHANGE_MATCHING_STATUS_SUCCESS,
    CHANGE_MATCHING_STATUS_FAIL,
    CHANGE_MATCHING_INFO_SUCCESS,
    CHANGE_MATCHING_INFO_FAIL,
    CLEAR_MATCHING_SUCCESS,
    CLEAR_MATCHING_FAIL
} from '../actions/matchingUser/types';

const initialState = {
    matchingUser: null
};

const matchingUserReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_MATCHING_INFO_SUCCESS:
            return {
                ...state
            }
        case ADD_MATCHING_INFO_FAIL:
            return {
                ...state
            }
        case LOAD_MATCHING_INFO_SUCCESS:
            return {
                ...state,
                matchingUser: payload
            }
        case LOAD_MATCHING_INFO_FAIL:
            return {
                ...state,
                matchingUser: null
            }
        case CHANGE_MATCHING_STATUS_SUCCESS:
            return {
                ...state
            }
        case CHANGE_MATCHING_STATUS_FAIL:
            return {
                ...state
            }
        case CHANGE_MATCHING_INFO_SUCCESS:
            return {
                ...state
            }
        case CHANGE_MATCHING_INFO_FAIL:
            return {
                ...state
            }
        case CLEAR_MATCHING_SUCCESS:
            return {
                ...state,
                matchingUser: null
            }
        case CLEAR_MATCHING_FAIL:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default matchingUserReducer;