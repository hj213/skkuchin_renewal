import{
    LOAD_NOTICE_FAIL,
    LOAD_NOTICE_SUCCESS,
    LOAD_NOTICES_FAIL,
    LOAD_NOTICES_SUCCESS,
    DELETE_NOTICE_FAIL,
    DELETE_NOTICE_SUCCESS,
    MODIFY_NOTICE_FAIL,
    MODIFY_NOTICE_SUCCESS,
    ENROLL_NOTICE_FAIL,
    ENROLL_NOTICE_SUCCESS,
    READ_NOTICE_SUCCESS,
    READ_NOTICE_FAIL
} from '../actions/notice/types'

const initialState = {
    notice: null,
}

const noticeReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_NOTICE_SUCCESS:
            return{
                ...state,
                review: payload
            }
        case LOAD_NOTICE_FAIL:
            return{
                ...state,
                review: null
            }
        case LOAD_NOTICES_SUCCESS:
            return{
                ...state,
                review: payload
            }
        case LOAD_NOTICES_FAIL:
            return{
                ...state,
                review: null
            }
        case ENROLL_NOTICE_SUCCESS:
            return{
                ...state
            }
        case ENROLL_NOTICE_FAIL:
            return{
                ...state
            }
        case MODIFY_NOTICE_SUCCESS:
            return{
                ...state
            }
        case MODIFY_NOTICE_FAIL:
            return{
                ...state
            }
        case DELETE_NOTICE_SUCCESS:
            return{
                ...state
            }
        case DELETE_NOTICE_FAIL:
            return{
                ...state
            }
        case READ_NOTICE_SUCCESS:
            return{
                ...state
            }
        case READ_NOTICE_FAIL:
            return{
                ...state
            }
        default:
            return state;
    }
}

export default noticeReducer;