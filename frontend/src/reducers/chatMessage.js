import {
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAIL,

} from '../actions/chat/types'

const initialState = {
    messages: null,
    user1: null,
    user2: null,
    isUser1Blocked: null,
    isUser2Blocked: null,
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
        default:
            return state;
    };
}

export default chatMessageReducer;