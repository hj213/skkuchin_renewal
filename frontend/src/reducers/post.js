import { LOGOUT_SUCCESS } from '../actions/auth/types';
import{
    LOAD_POST_FAIL,
    LOAD_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    LOAD_ALL_POSTS_FAIL,
    ENROLL_POST_FAIL,
    ENROLL_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    MODIFY_POST_FAIL,
    MODIFY_POST_SUCCESS,
    CLEAR_MY_POST,
} from '../actions/post/types'

const initialState = {
    post: null,
    // myPost: null,
    allPosts: null
}

const postReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_POST_SUCCESS:
            return{
                ...state,
                post: payload
            }
        case LOAD_POST_FAIL:
            return{
                ...state,
                post: null
            }
        case LOAD_ALL_POSTS_SUCCESS:
            return{
                ...state,
                allPosts: payload
            }
        case LOAD_ALL_POSTS_FAIL:
            return{
                ...state,
                allPosts: null
            }
        case DELETE_POST_SUCCESS:
            return{
                ...state
            }
        case DELETE_POST_FAIL:
            return{
                ...state
            }
        case ENROLL_POST_SUCCESS:
            return{
                ...state
            }
        case ENROLL_POST_FAIL:
            return{
                ...state
            }
        case MODIFY_POST_SUCCESS:
            return{
                ...state
            }
        case MODIFY_POST_FAIL:
            return{
                ...state
            }
        case CLEAR_MY_POST:
            return{
                ...state,
                post: null
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default postReducer;