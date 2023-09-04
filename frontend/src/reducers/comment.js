import { LOGOUT_SUCCESS } from '../actions/auth/types';
import{
    LOAD_COMMENT_FAIL,
    LOAD_COMMENT_SUCCESS,
    LOAD_ALL_COMMENTS_SUCCESS,
    LOAD_ALL_COMMENTS_FAIL,
    ENROLL_COMMENT_FAIL,
    ENROLL_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    MODIFY_COMMENT_FAIL,
    MODIFY_COMMENT_SUCCESS,
    CLEAR_PREV_COMMENT,
} from '../actions/comment/types'

const initialState = {
    comment: null,
    // myCOMMENT: null,
    allComments: null
}

const commentReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_COMMENT_SUCCESS:
            return{
                ...state,
                comment: payload
            }
        case LOAD_COMMENT_FAIL:
            return{
                ...state,
                comment: null
            }
        case LOAD_ALL_COMMENTS_SUCCESS:
            return{
                ...state,
                allComment: payload
            }
        case LOAD_ALL_COMMENTS_FAIL:
            return{
                ...state,
                allComment: null
            }
        case DELETE_COMMENT_SUCCESS:
            return{
                ...state
            }
        case DELETE_COMMENT_FAIL:
            return{
                ...state
            }
        case ENROLL_COMMENT_SUCCESS:
            return{
                ...state
            }
        case ENROLL_COMMENT_FAIL:
            return{
                ...state
            }
        case MODIFY_COMMENT_SUCCESS:
            return{
                ...state
            }
        case MODIFY_COMMENT_FAIL:
            return{
                ...state
            }
        case CLEAR_PREV_COMMENT:
            return{
                ...state,
                comment: null
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default commentReducer;