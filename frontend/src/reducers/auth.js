import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER_SUCCESS,
    EMAIL_SEND_SUCCESS,
    EMAIL_SEND_FAIL,
    RESET_EMAIL_SEND_SUCCESS,
    EMAIL_AUTH_SUCCESS,
    EMAIL_AUTH_FAIL,
    RESET_EMAIL_AUTH_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    CHECK_USERNAME_SUCCESS,
    CHECK_USERNAME_FAIL,
    RESET_CHECK_USERNAME_SUCCESS,
    CHECK_NICKNAME_SUCCESS,
    CHECK_NICKNAME_FAIL,
    RESET_CHECK_NICKNAME_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    RESET_CHANGE_PASSWORD_SUCCESS,
    CHANGE_CAMPUS_TOGGLE_SUCCESS,
    CHANGE_CAMPUS_TOGGLE_FAIL
} from '../actions/auth/types';

const initialState = {
    user: null,
    email_sent: false,
    email_auth: false,
    isAuthenticated: false,
    loading: false,
    register_success: false,
    username_check: false,
    nickname_check: false,
    password_change: false,
    campus_toggle: false
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false
            }
        case EMAIL_SEND_SUCCESS:
            return {
                ...state,
                isEmailSent: true
            }
        case EMAIL_SEND_FAIL:
            return {
                ...state,
            }
        case RESET_EMAIL_SEND_SUCCESS:
            return {
                ...state,
                isEmailSent: false
            }  
        case EMAIL_AUTH_SUCCESS:
            return {
                ...state,
                isEmailAuthenticated: true
            }
        case EMAIL_AUTH_FAIL:
            return {
                ...state,
            }
        case RESET_EMAIL_AUTH_SUCCESS:
            return {
                ...state,
                isEmailAuthenticated: false
            }  
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case REFRESH_SUCCESS:
            return {
                ...state,
            }
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case CHECK_USERNAME_SUCCESS:
            return {
                ...state,
                username_check: true
            }
        case CHECK_USERNAME_FAIL:
            return {
                ...state,
            }
        case RESET_CHECK_USERNAME_SUCCESS:
            return {
                ...state,
                username_check: false
            }
        case CHECK_NICKNAME_SUCCESS:
            return {
                ...state,
                nickname_check: true
            }
        case CHECK_NICKNAME_FAIL:
            return {
                ...state,
            }
        case RESET_CHECK_NICKNAME_SUCCESS:
            return {
                ...state,
                nickname_check: false
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                password_change: true
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
            }
        case RESET_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                password_change: false
            }
        case CHANGE_CAMPUS_TOGGLE_SUCCESS:
            return {
                ...state,
                campus_toggle: true
            }
        case CHANGE_CAMPUS_TOGGLE_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    };
};

export default authReducer;