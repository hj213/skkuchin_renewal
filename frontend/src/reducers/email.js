import {
    SIGNUP_EMAIL_SEND_SUCCESS,
    SIGNUP_EMAIL_SEND_FAIL,
    SIGNUP_EMAIL_CHECK_SUCCESS,
    SIGNUP_EMAIL_CHECK_FAIL,
    PASSWORD_EMAIL_SEND_SUCCESS,
    PASSWORD_EMAIL_SEND_FAIL,
    PASSWORD_EMAIL_CHECK_SUCCESS,
    PASSWORD_EMAIL_CHECK_FAIL
} from '../actions/auth/types';

const initialState = {
    isAuthenticated: false
};

const emailReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SIGNUP_EMAIL_SEND_SUCCESS:
            return {
                ...state
            }
        case SIGNUP_EMAIL_SEND_FAIL:
            return {
                ...state
            }
        case SIGNUP_EMAIL_CHECK_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case SIGNUP_EMAIL_CHECK_FAIL:
            return {
                ...state
            }
        case PASSWORD_EMAIL_SEND_SUCCESS:
            return {
                ...state
            }
        case PASSWORD_EMAIL_SEND_FAIL:
            return {
                ...state
            }
        case PASSWORD_EMAIL_CHECK_SUCCESS:
            return {
                ...state
            }
        case PASSWORD_EMAIL_CHECK_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
};

export default emailReducer;