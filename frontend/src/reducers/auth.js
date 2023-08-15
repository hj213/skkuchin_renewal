import Cookies from 'js-cookie';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS,
    CHANGE_TOGGLE_NOT_FOR_USER_FAIL,
    DELETE_USER_SUCCESS,
    FIND_USERNAME_SUCCESS,
    FIND_USERNAME_FAIL,
} from '../actions/auth/types';

const initialState = {
    user: null,
    isAuthenticated: false,
    toggle_for_not_user: null
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            if (process.env.NODE_ENV === 'production') {
                Cookies.set('access', payload.access, { secure: true, expires: 1 });
                Cookies.set('refresh', payload.refresh, { secure: true, expires: 180 });
            } else {
                Cookies.set('access', payload.access);
                Cookies.set('refresh', payload.refresh);
            }
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            localStorage.setItem('map', '명륜');
            Cookies.remove('access');
            Cookies.remove('refresh');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                toggle_for_not_user: '명륜'
            }
        case LOAD_USER_SUCCESS:
            localStorage.removeItem("map");
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                toggle_for_not_user: null
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case REFRESH_SUCCESS:
            if (process.env.NODE_ENV === 'production') {
                Cookies.set('access', payload.access, { secure: true, expires: 1 });
            } else {
                Cookies.set('access', payload.access);
            }
            return {
                ...state,
            }
        case REFRESH_FAIL:
            Cookies.remove('access');
            Cookies.remove('refresh');
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS:
            return {
                ...state,
                toggle_for_not_user: payload,
            }
        case CHANGE_TOGGLE_NOT_FOR_USER_FAIL:
            return {
                ...state,
                toggle_for_not_user: null
            }
        case DELETE_USER_SUCCESS:
            Cookies.remove('access');
            Cookies.remove('refresh');
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case FIND_USERNAME_SUCCESS:
            return {
                ...state,
                user: {
                    username: payload
                }
            }
        case FIND_USERNAME_FAIL:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    };
};

export default authReducer;