import {
    REQUEST_CHAT_SUCCESS,
    REQUEST_CHAT_FAIL,
    REPLY_CHAT_REQUEST_SUCCESS,
    REPLY_CHAT_REQUEST_FAIL,
    SET_USER_BLOCK_SUCCESS,
    SET_USER_BLOCK_FAIL,
    SET_CHAT_ALARM_SUCCESS,
    SET_CHAT_ALARM_FAIL,
    EXIT_CHAT_ROOM_SUCCESS,
    EXIT_CHAT_ROOM_FAIL,
    GET_REALTIME_ROOM_SUCCESS,
    GET_REALTIME_ROOM_FAIL
} from '../actions/chat/types'

const initialState = {
    chatMessages: null
};

const chatRoomReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case REQUEST_CHAT_SUCCESS:
            return {
                ...state
            }
        case REQUEST_CHAT_FAIL:
            return {
                ...state
            }
        case REPLY_CHAT_REQUEST_SUCCESS:
            return {
                ...state
            }
        case REPLY_CHAT_REQUEST_FAIL:
            return {
                ...state
            }
        case SET_USER_BLOCK_SUCCESS:
            return {
                ...state
            }
        case SET_USER_BLOCK_FAIL:
            return {
                ...state
            }
        case SET_CHAT_ALARM_SUCCESS:
            return {
                ...state
            }
        case SET_CHAT_ALARM_FAIL:
            return {
                ...state
            }
        case EXIT_CHAT_ROOM_SUCCESS:
            return {
                ...state,
                chatMessages: null
            }
        case EXIT_CHAT_ROOM_FAIL:
            return {
                ...state
            }
        case GET_REALTIME_ROOM_SUCCESS:
            return {
                ...state,
                chatMessages: payload
            }
        case GET_REALTIME_ROOM_FAIL:
            return {
                ...state,
                chatMessages: null
            }
        default:
            return state;
    };
}

export default chatRoomReducer;