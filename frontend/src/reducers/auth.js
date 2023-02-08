import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
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
    CHECK_NICKNAME_SUCCESS,
    CHECK_NICKNAME_FAIL,
    CHANGE_USER_SUCCESS,
    CHANGE_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_TOGGLE_SUCCESS,
    CHANGE_TOGGLE_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    FIND_USERNAME_SUCCESS,
    FIND_USERNAME_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../actions/auth/types';

const initialState = {
    user: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    message: null
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state
            }
        case REGISTER_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                message: payload.error
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
                user: null,
                message: payload.error
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
                message: payload.success
            }
        case CHECK_USERNAME_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case CHECK_NICKNAME_SUCCESS:
            return {
                ...state,
                message: payload.success
            }
        case CHECK_NICKNAME_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case CHANGE_USER_SUCCESS:
            return {
                ...state
            }
        case CHANGE_USER_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: payload.success
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case CHANGE_TOGGLE_SUCCESS:
            return {
                ...state
            }
        case CHANGE_TOGGLE_FAIL:
            return {
                ...state
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case FIND_USERNAME_SUCCESS:
            return {
                ...state,
                username: payload.username

            }
        case FIND_USERNAME_FAIL:
            return {
                ...state,
                message: payload.error
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                message: payload.success

            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                message: payload.error
                }
        default:
            return state;
    };
};

export default authReducer;