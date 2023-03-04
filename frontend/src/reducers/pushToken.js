import {
    LOAD_PUSHTOKEN_SUCCESS,
    LOAD_PUSHTOKEN_FAIL,
    ENROLL_PUSHTOKEN_SUCCESS,
    ENROLL_PUSHTOKEN_FAIL,
    MODIFY_PUSHTOKEN_SUCCESS,
    MODIFY_PUSHTOKEN_FAIL
} from '../actions/pushToken/types'

const initialState = {
    pushToken: null,
};

const pushTokenReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_PUSHTOKEN_SUCCESS:
            return {
                ...state,
                pushToken: payload
            }
        case LOAD_PUSHTOKEN_FAIL:
            return {
                ...state,
                pushToken: null
            }
        case ENROLL_PUSHTOKEN_SUCCESS:
            return {
                ...state
            }
        case ENROLL_PUSHTOKEN_FAIL:
            return {
                ...state
            }
        case MODIFY_PUSHTOKEN_SUCCESS:
            return {
                ...state
            }
        case MODIFY_PUSHTOKEN_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default pushTokenReducer;