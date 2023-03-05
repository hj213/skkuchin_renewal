import {
    SET_STOMP_CLIENT_SUCCESS,
    SET_STOMP_CLIENT_FAIL
} from './types'

export const set_stomp_client = (stompClient) => async dispatch => {

    try {
        dispatch({
            type: SET_STOMP_CLIENT_SUCCESS,
            payload: stompClient
        })
    } catch(error) {
        dispatch({
            type: SET_STOMP_CLIENT_FAIL
        })
    }
};
