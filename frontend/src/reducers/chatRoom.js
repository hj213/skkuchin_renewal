import {
    CREATE_CHAT_ROOM_SUCCESS,
    CREATE_CHAT_ROOM_FAIL,
    REPLY_CHAT_REQUEST_SUCCESS,
    REPLY_CHAT_REQUEST_FAIL,
    MODIFY_CHAT_BLOCK_SUCCESS,
    MODIFY_CHAT_BLOCK_FAIL,
    MODIFY_CHAT_ALARM_SUCCESS,
    MODIFY_CHAT_ALARM_FAIL,
    EXIT_CHAT_ROOM_SUCCESS,
    EXIT_CHAT_ROOM_FAIL
} from '../actions/chat/types'

const initialState = {
    chatRoom: null,
};

const chatRoomReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case CREATE_CHAT_ROOM_SUCCESS:
            return {
                ...state
            }
        case CREATE_CHAT_ROOM_FAIL:
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
        case MODIFY_CHAT_BLOCK_SUCCESS:
            return {
                ...state
            }
        case MODIFY_CHAT_BLOCK_FAIL:
            return {
                ...state
            }
        case MODIFY_CHAT_ALARM_SUCCESS:
            return {
                ...state
            }
        case MODIFY_CHAT_ALARM_FAIL:
            return {
                ...state
            }
        case EXIT_CHAT_ROOM_SUCCESS:
            return {
                ...state,
                chatRoom: null
            }
        case EXIT_CHAT_ROOM_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default chatRoomReducer;