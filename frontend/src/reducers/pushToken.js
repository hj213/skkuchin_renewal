import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_PUSHTOKEN_SUCCESS,
    LOAD_PUSHTOKEN_FAIL,
    ENROLL_PUSHTOKEN_SUCCESS,
    ENROLL_PUSHTOKEN_FAIL,
    SET_CHAT_PUSH_SUCCESS,
    SET_CHAT_PUSH_FAIL,
    SET_INFO_PUSH_SUCCESS,
    SET_INFO_PUSH_FAIL
} from '../actions/pushToken/types'

const initialState = {
    pushToken: null,
};

const pushTokenReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_PUSHTOKEN_SUCCESS:
            return {
                ...state,
                pushToken: payload
            }
        case LOAD_PUSHTOKEN_FAIL:
            return {
                ...state,
                pushToken: null
            }
        case ENROLL_PUSHTOKEN_SUCCESS:
            return {
                ...state
            }
        case ENROLL_PUSHTOKEN_FAIL:
            return {
                ...state
            }
        case SET_CHAT_PUSH_SUCCESS:
            return {
                ...state
            }
        case SET_CHAT_PUSH_FAIL:
            return {
                ...state
            }
        case SET_INFO_PUSH_SUCCESS:
            return {
                ...state
            }
        case SET_INFO_PUSH_FAIL:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default pushTokenReducer;