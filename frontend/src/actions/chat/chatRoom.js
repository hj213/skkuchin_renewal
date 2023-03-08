import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    GET_REQUEST_ID_SUCCESS,
    GET_REQUEST_ID_FAIL,
    REQUEST_CHAT_SUCCESS,
    REQUEST_CHAT_FAIL,
    REPLY_CHAT_REQUEST_SUCCESS,
    REPLY_CHAT_REQUEST_FAIL,
    SET_USER_BLOCK_SUCCESS,
    SET_USER_BLOCK_FAIL,
    SET_CHAT_ALARM_SUCCESS,
    SET_CHAT_ALARM_FAIL,
    EXIT_CHAT_ROOM_SUCCESS,
    EXIT_CHAT_ROOM_FAIL,
    GET_REALTIME_ROOM_SUCCESS
}
    from './types';

export const load_request_id = (callback) => async dispatch => {
        await dispatch(request_refresh());
        const access = Cookies.get('access') ?? null;
    
        if (access === null) {
            console.log('access 토큰이 존재하지 않습니다')
            return dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    
        try {
            const res = await fetch(`${API_URL}/api/chat/room/request`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            });
    
            const apiRes = await res.json();
    
            if (res.status === 200) {
                dispatch({
                    type: GET_REQUEST_ID_SUCCESS,
                    payload: apiRes.data
                })
                if (callback) callback([true, apiRes.message]);
            } else {
                dispatch({
                    type: GET_REQUEST_ID_FAIL
                })
                if (callback) callback([false, apiRes.message]);
            }
        } catch(error) {
            dispatch({
                type: GET_REQUEST_ID_FAIL
            })
            if (callback) callback([false, error]);
        }
    };

export const request_chat = (id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        id
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room`, {
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
            await dispatch({
                type: REQUEST_CHAT_SUCCESS
            })
            dispatch(load_request_id());

            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: REQUEST_CHAT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: REQUEST_CHAT_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const reply_chat_request = (reaction, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        reaction
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room/request/${room_id}`, {
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
                type: REPLY_CHAT_REQUEST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: REPLY_CHAT_REQUEST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: REPLY_CHAT_REQUEST_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const set_user_block = (reaction, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        reaction
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room/block/${room_id}`, {
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
                type: SET_USER_BLOCK_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_USER_BLOCK_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_USER_BLOCK_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const set_chat_room_alarm = (reaction, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        reaction
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room/alarm/${room_id}`, {
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
                type: SET_CHAT_ALARM_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_CHAT_ALARM_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_CHAT_ALARM_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const exit_room = (room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/chat/room/exit/${room_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: EXIT_CHAT_ROOM_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: EXIT_CHAT_ROOM_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: EXIT_CHAT_ROOM_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const get_realtime_chat_room = (username, stompClient) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const subscription = stompClient.subscribe(`/exchange/chat.exchange/room.${username}chatRoomList`,(content) => {
        const data = JSON.parse(content.body);
        
        dispatch({
            type: GET_REALTIME_ROOM_SUCCESS,
            payload: data
        })

    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
        }
    );
    stompClient.send('/app/chat.list', {"pushToken" : access});
    return subscription;
};