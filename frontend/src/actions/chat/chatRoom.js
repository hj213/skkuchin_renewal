import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    CREATE_CHAT_ROOM_SUCCESS,
    CREATE_CHAT_ROOM_FAIL,
    REPLY_CHAT_REQUEST_SUCCESS,
    REPLY_CHAT_REQUEST_FAIL,
    MODIFY_CHAT_BLOCK_SUCCESS,
    MODIFY_CHAT_BLOCK_FAIL,
    MODIFY_CHAT_ALARM_SUCCESS,
    MODIFY_CHAT_ALARM_FAIL,
    EXIT_CHAT_ROOM_SUCCESS,
    EXIT_CHAT_ROOM_FAIL
}
    from './types';
import { EXIT_CHAT_ROOM_FAIL, EXIT_CHAT_ROOM_SUCCESS } from './type';

export const make_room = async (username, callback) => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        username
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
            dispatch({
                type: CREATE_CHAT_ROOM_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: CREATE_CHAT_ROOM_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: CREATE_CHAT_ROOM_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const reply_chat_request = async (reaction, room_id, callback) => {
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
        const res = await fetch(`${API_URL}/api/chat/room/requset/${room_id}`, {
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

export const block_user = async (reaction, room_id, callback) => {
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
                type: MODIFY_CHAT_BLOCK_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: MODIFY_CHAT_BLOCK_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: MODIFY_CHAT_BLOCK_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const set_chat_room_alarm = async (reaction, room_id, callback) => {
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
                type: MODIFY_CHAT_ALARM_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: MODIFY_CHAT_ALARM_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: MODIFY_CHAT_ALARM_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const exit_room = async (room_id, callback) => {
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