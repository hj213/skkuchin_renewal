import {
    SET_STOMP_CLIENT_SUCCESS,
    SET_STOMP_CLIENT_FAIL
} from '../actions/stompClient/types'

const initialState = {
    stompClient: null,
};

const stompClientReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SET_STOMP_CLIENT_SUCCESS:
            return {
                ...state,
                stompClient: payload
            }
        case SET_STOMP_CLIENT_FAIL:
            return {
                ...state,
                stompClient: null
            }
        default:
            return state;
    };
}

export default stompClientReducer;