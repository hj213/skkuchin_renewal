import Cookies from 'js-cookie';
import { AUTHENTICATED_FAIL } from '../auth/types';
import {
    GET_CHAT_REQUEST_INFO_FAIL,
    GET_CHAT_REQUEST_INFO_SUCCESS,
    GET_REALTIME_REQUEST_SUCCESS
}
    from './types';

export const get_realtime_chat_request = (username, stompClient) => dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    const subscription = stompClient.subscribe(`/exchange/chat.exchange/alarm.${username}`,(content) => {
        const data = JSON.parse(content.body);
        
        dispatch({
            type: GET_REALTIME_REQUEST_SUCCESS,
            payload: data
        })
    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
    });
    return subscription;
};

export const get_chat_request_info = (stompClient) => dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        stompClient.send('/app/chat.alarm', {"pushToken" : access});
        dispatch({
            type: GET_CHAT_REQUEST_INFO_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CHAT_REQUEST_INFO_FAIL
        });
    }

};