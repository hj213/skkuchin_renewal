import {
    GET_REALTIME_REQUEST_SUCCESS,
    GET_REALTIME_REQUEST_FAIL,
    GET_CHAT_REQUEST_INFO_SUCCESS,
    GET_CHAT_REQUEST_INFO_FAIL,
    GET_CHAT_REQUEST_FOR_NOT_USER_SUCCESS,
    GET_CHAT_REQUEST_FOR_NOT_USER_FAIL
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
        case GET_CHAT_REQUEST_INFO_SUCCESS:
            return {
                ...state
            }
        case GET_CHAT_REQUEST_INFO_FAIL:
            return {
                ...state
            }
        case GET_CHAT_REQUEST_FOR_NOT_USER_SUCCESS:
            return {
                ...state,
                chatRequest: []
            }
        case GET_CHAT_REQUEST_FOR_NOT_USER_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default chatRequestReducer;