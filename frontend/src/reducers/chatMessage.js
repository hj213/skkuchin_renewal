import {
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAIL,
    GET_REALTIME_USER_SUCCESS,
    GET_REALTIME_USER_FAIL,
    GET_REALTIME_BLOCK_ALARM_SUCCESS,
    GET_REALTIME_BLOCK_ALARM_FAIL,
    GET_REALTIME_MESSAGE_SUCCESS,
    GET_REALTIME_MESSAGE_FAIL,
} from '../actions/chat/types'

const initialState = {
    messages: null,
    otherUser: null,
    blockAlarm: null
};

const chatMessageReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SEND_CHAT_MESSAGE_SUCCESS:
            return {
                ...state
            }
        case SEND_CHAT_MESSAGE_FAIL:
            return {
                ...state
            }
        case GET_REALTIME_USER_SUCCESS:
            return {
                ...state,
                otherUser: payload
            }
        case GET_REALTIME_USER_FAIL:
            return {
                ...state,
                otherUser: null
            }
        case GET_REALTIME_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: payload
            }
        case GET_REALTIME_MESSAGE_FAIL:
            return {
                ...state,
                messages: null
            }
        case GET_REALTIME_BLOCK_ALARM_SUCCESS:
            return {
                ...state,
                blockAlarm: payload
            }
        case GET_REALTIME_BLOCK_ALARM_FAIL:
            return {
                ...state,
                blockAlarm: null
            }
        default:
            return state;
    };
}

export default chatMessageReducer;