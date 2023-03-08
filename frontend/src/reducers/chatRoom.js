import {
    GET_REQUEST_ID_SUCCESS,
    GET_REQUEST_ID_FAIL,
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
    requestId: null,
    chatRooms: null
};

const chatRoomReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_REQUEST_ID_SUCCESS:
            return {
                ...state,
                requestId: payload
            }
        case GET_REQUEST_ID_FAIL:
            return {
                ...state,
                requestId: null
            }
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
                chatRooms: null
            }
        case EXIT_CHAT_ROOM_FAIL:
            return {
                ...state
            }
        case GET_REALTIME_ROOM_SUCCESS:
            return {
                ...state,
                chatRooms: payload
            }
        case GET_REALTIME_ROOM_FAIL:
            return {
                ...state,
                chatRooms: null
            }
        default:
            return state;
    };
}

export default chatRoomReducer;