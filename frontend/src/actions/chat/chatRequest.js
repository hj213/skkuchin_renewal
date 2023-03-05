import Cookies from 'js-cookie';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
    GET_REALTIME_REQUEST_SUCCESS,
    GET_REALTIME_REQUEST_FAIL
}
    from './types';

export const get_realtime_chat_request = (username) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const sockJS = new SockJS("/ws/chat");
    const stomp = Stomp.over(sockJS);

    stomp.connect('guest', 'guest', (frame) => {
        stomp.subscribe(`/exchange/chat.exchange/alarm.${username}`,(content) => {
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
            }
        );
        stomp.send(`/app/chat.alarm`);
    }, onError, '/');

    const onError = (e) => {
        console.log(e);
        dispatch({
            type: GET_REALTIME_REQUEST_FAIL
        })
    }
};