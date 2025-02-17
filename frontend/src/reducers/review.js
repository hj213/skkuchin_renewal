import { LOGOUT_SUCCESS } from '../actions/auth/types';
import{
    LOAD_REVIEW_FAIL,
    LOAD_REVIEW_SUCCESS,
    LOAD_REVIEWS_FAIL,
    LOAD_REVIEWS_SUCCESS,
    LOAD_ALL_REVIEWS_SUCCESS,
    LOAD_ALL_REVIEWS_FAIL,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    MODIFY_REVIEW_FAIL,
    MODIFY_REVIEW_SUCCESS,
    CLEAR_MY_REVIEW,
} from '../actions/review/types'

const initialState = {
    review: null,
    myReview: null,
    allReview: null
}

const reviewReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_REVIEWS_SUCCESS:
            return{
                ...state,
                review: payload
            }
        case LOAD_REVIEWS_FAIL:
            return{
                ...state,
                review: null
            }
        case LOAD_REVIEW_SUCCESS:
            return{
                ...state,
                myReview: payload
            }
        case LOAD_REVIEW_FAIL:
            return{
                ...state,
                myReview: null
            }
        case LOAD_ALL_REVIEWS_SUCCESS:
            return{
                ...state,
                allReview: payload
            }
        case LOAD_ALL_REVIEWS_FAIL:
            return{
                ...state,
                allReview: null
            }
        case DELETE_REVIEW_SUCCESS:
            return{
                ...state
            }
        case DELETE_REVIEW_FAIL:
            return{
                ...state
            }
        case MODIFY_REVIEW_SUCCESS:
            return{
                ...state
            }
        case MODIFY_REVIEW_FAIL:
            return{
                ...state
            }
        case CLEAR_MY_REVIEW:
            return{
                ...state,
                myReview: null
            };
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default reviewReducer;