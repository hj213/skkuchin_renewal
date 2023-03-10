import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAIL,
    READ_CHAT_MESSAGE_SUCCESS,
    READ_CHAT_MESSAGE_FAIL,
    GET_REALTIME_MESSAGE_SUCCESS,
    GET_REALTIME_SETTING_SUCCESS,
    GET_REALTIME_USER_SUCCESS,
    GET_REALTIME_MESSAGE_FAIL,
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

export const read_message = (message_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        read: true
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/message/read/${message_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: READ_CHAT_MESSAGE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: READ_CHAT_MESSAGE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: READ_CHAT_MESSAGE_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const get_realtime_otherUser = (room_id, user_number, stompClient) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const subscription = stompClient.subscribe(`/exchange/chat.exchange/user.${room_id}${user_number}`,(content) => {
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

    return subscription;
};

export const get_realtime_setting = (room_id, user_number, stompClient) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const subscription = stompClient.subscribe(`/exchange/chat.exchange/setting.${room_id}${user_number}`,(content) => {
        const data = JSON.parse(content.body);
        
        dispatch({
            type: GET_REALTIME_SETTING_SUCCESS,
            payload: data
        })

    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
        }
    );

    return subscription;
};

export const get_realtime_message = (room_id, user_number, username, stompClient)  => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const subscription = stompClient.subscribe(`/exchange/chat.exchange/chat.${room_id}${user_number}`,(content) => {
        const datas = JSON.parse(content.body);

        try {
            datas.map((message) => {
                if (username !== message.sender && message.read_status === false) {
                    dispatch(read_message(message.id));
                }
            });

            dispatch({
                type: GET_REALTIME_MESSAGE_SUCCESS,
                payload: datas
            })

        } catch(err) {
            console.log(err);
            dispatch({
                type: GET_REALTIME_MESSAGE_FAIL
            })
        }

    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
        }
    );

    return subscription;
};

export const get_realtime_chat_infos = (room_id, stompClient)  => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    stompClient.send(`/app/chat.chatMessage.${room_id}`, {"pushToken" : access});
};