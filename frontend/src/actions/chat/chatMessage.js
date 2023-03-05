import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAIL,
    GET_REALTIME_MESSAGE_SUCCESS,
    GET_REALTIME_MESSAGE_FAIL,
    GET_REALTIME_BLOCK_SUCCESS,
    GET_REALTIME_BLOCK_FAIL,
    GET_REALTIME_USER_SUCCESS,
    GET_REALTIME_USER_FAIL
}
    from './types';

export const send_message = (message, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        message, room_id
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/message`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            dispatch({
                type: SEND_CHAT_MESSAGE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SEND_CHAT_MESSAGE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SEND_CHAT_MESSAGE_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const get_realtime_otherUser = (room_id, user_number) => async dispatch => {
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
        stomp.subscribe(`/exchange/chat.exchange/user.${room_id}${user_number}`,(content) => {
            const data = JSON.parse(content.body);
            
            dispatch({
                type: GET_REALTIME_USER_SUCCESS,
                payload: data
            })

        },{
            'auto-delete':true, 
            'durable':false, 
            'exclusive':false,
            pushToken : access
            }
        );
        stomp.send(`/app/chat.chatMessage.${room_id}`);
    }, onError, '/');

    const onError = (e) => {
        console.log(e);
        dispatch({
            type: GET_REALTIME_USER_FAIL
        })
    }
};

export const get_realtime_block = (room_id, user_number) => async dispatch => {
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
        stomp.subscribe(`/exchange/chat.exchange/block.${room_id}${user_number}`,(content) => {
            const data = JSON.parse(content.body);
            
            dispatch({
                type: GET_REALTIME_BLOCK_SUCCESS,
                payload: data
            })

        },{
            'auto-delete':true, 
            'durable':false, 
            'exclusive':false,
            pushToken : access
            }
        );
        stomp.send(`/app/chat.chatMessage.${room_id}`);
    }, onError, '/');

    const onError = (e) => {
        console.log(e);
        dispatch({
            type: GET_REALTIME_BLOCK_FAIL
        })
    }
};

export const get_realtime_message = (room_id, user_number)  => async dispatch => {
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
        stomp.subscribe(`/exchange/chat.exchange/chat.${room_id}${user_number}`,(content) => {
            const data = JSON.parse(content.body);
            
            dispatch({
                type: GET_REALTIME_MESSAGE_SUCCESS,
                payload: data
            })

        },{
            'auto-delete':true, 
            'durable':false, 
            'exclusive':false,
            pushToken : access
            }
        );
        stomp.send(`/app/chat.chatMessage.${room_id}`);
    }, onError, '/');

    const onError = (e) => {
        console.log(e);
        dispatch({
            type: GET_REALTIME_MESSAGE_FAIL
        })
    }
};