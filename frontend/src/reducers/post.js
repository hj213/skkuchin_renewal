import { LOGOUT_SUCCESS } from '../actions/auth/types';
import{
    LOAD_POST_FAIL,
    LOAD_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    LOAD_ALL_POSTS_FAIL,
    LOAD_MY_POSTS_SUCCESS,
    LOAD_MY_POSTS_FAIL,
    LOAD_FAV_POSTS_SUCCESS,
    LOAD_FAV_POSTS_FAIL,
    ENROLL_POST_FAIL,
    ENROLL_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    MODIFY_POST_FAIL,
    MODIFY_POST_SUCCESS,
    SEARCH_POSTS_FAIL,
    SEARCH_POSTS_SUCCESS,
    CLEAR_SEARCH_POSTS,
    CLEAR_PREV_POST,
} from '../actions/post/types'

const initialState = {
    post: null,
    myPosts: null,
    favPosts: null,
    allPosts: null,
    filteredPosts: null
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
        case LOAD_MY_POSTS_SUCCESS:
            return{
                ...state,
                myPosts: payload
            }
        case LOAD_MY_POSTS_FAIL:
            return{
                ...state,
                myPosts: null
            }
        case LOAD_FAV_POSTS_SUCCESS:
            return{
                ...state,
                favPosts: payload
            }
        case LOAD_FAV_POSTS_FAIL:
            return{
                ...state,
                favPosts: null
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
        case SEARCH_POSTS_SUCCESS:
            return{
                ...state,
                filteredPosts: payload
            }
        case SEARCH_POSTS_FAIL:
            return{
                ...state,
                filteredPosts: null
            }
        case CLEAR_SEARCH_POSTS:
            return{
                ...state,
                filteredPosts: null
            }
        case CLEAR_PREV_POST:
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