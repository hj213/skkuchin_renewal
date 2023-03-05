import {
    GET_REALTIME_REQUEST_SUCCESS,
    GET_REALTIME_REQUEST_FAIL
} from '../actions/chat/types'

const initialState = {
    chatRequest: null,
};

const chatRequestReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_REALTIME_REQUEST_SUCCESS:
            return {
                ...state,
                chatRequest: payload
            }
        case GET_REALTIME_REQUEST_FAIL:
            return {
                ...state,
                chatRequest: null
            }
        default:
            return state;
    };
}

export default chatRequestReducer;