import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,

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
        case LOAD_MENU_SUCCESS:
            return {
                ...state,
                menu: payload
            }
        case LOAD_MENU_FAIL:
            return {
                ...state,
                menu: null
            }
        default:
            return state;
    };
}

export default chatMessageReducer;