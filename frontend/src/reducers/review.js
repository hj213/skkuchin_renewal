import{
    LOAD_REVIEW_FAIL,
    LOAD_REVIEW_SUCCESS,
    LOAD_REVIEWS_FAIL,
    LOAD_REVIEWS_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    MODIFY_REVIEW_FAIL,
    MODIFY_REVIEW_SUCCESS
} from '../actions/review/types'

const initialState = {
    review: null,
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
        default:
            return state;
    }
}

export default reviewReducer;