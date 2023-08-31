import Cookies from 'js-cookie';
import { AUTHENTICATED_FAIL } from '../auth/types';
import {
    GET_CHAT_REQUEST_FOR_NOT_USER_FAIL,
    GET_CHAT_REQUEST_FOR_NOT_USER_SUCCESS,
    GET_CHAT_REQUEST_INFO_FAIL,
    GET_CHAT_REQUEST_INFO_SUCCESS,
    GET_REALTIME_REQUEST_SUCCESS
}
    from './types';
import { getToken } from '../auth/auth';

export const get_realtime_chat_request = (username, stompClient) => dispatch => {
    const access = dispatch(getToken('access'));
    const subscription = stompClient.subscribe(`/exchange/chat.exchange/request.${username}`,(content) => {
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
    const access = dispatch(getToken('access'));

    try {
        stompClient.send('/app/chat.request', {"pushToken" : access});
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

export const get_chat_request_for_not_user = () => dispatch => {
    try {
        dispatch({
            type: GET_CHAT_REQUEST_FOR_NOT_USER_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CHAT_REQUEST_FOR_NOT_USER_FAIL
        });
    }
};