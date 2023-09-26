import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_MY_LIKE_SUCCESS,
    LOAD_MY_LIKE_FAIL,
    ENROLL_LIKE_SUCCESS,
    ENROLL_LIKE_FAIL,
    DELETE_LIKE_SUCCESS,
    DELETE_LIKE_FAIL,

} from '../actions/like/types';

const initialState = {
    isLiked: null,
    likes: null
};

const likeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_MY_LIKE_SUCCESS:
            return {
                ...state,
                likes: payload
            }
        case LOAD_MY_LIKE_FAIL:
            return {
                ...state,
                likes: null
            }
        case ENROLL_LIKE_SUCCESS:
            return {
                ...state,
            }
        case ENROLL_LIKE_FAIL:
            return {
                ...state,
            }
        case DELETE_LIKE_SUCCESS:
            return {
                ...state,
            }
        case DELETE_LIKE_FAIL:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default likeReducer;