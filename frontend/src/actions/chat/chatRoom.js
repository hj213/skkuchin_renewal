import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
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
    SET_MEET_TIME_SUCCESS,
    SET_MEET_TIME_FAIL,
    SET_MEET_PLACE_SUCCESS,
    SET_MEET_PLACE_FAIL,
    DELETE_MEET_TIME_SUCCESS,
    DELETE_MEET_TIME_FAIL,
    DELETE_MEET_PLACE_SUCCESS,
    DELETE_MEET_PLACE_FAIL,
    EXIT_CHAT_ROOM_SUCCESS,
    EXIT_CHAT_ROOM_FAIL,
    GET_REALTIME_ROOM_SUCCESS,
    GET_CHAT_ROOM_INFO_SUCCESS,
    GET_CHAT_ROOM_INFO_FAIL,
    CLEAR_ROOM_LIST_SUCCESS,
    CLEAR_ROOM_LIST_FAIL,
    GET_CHAT_ROOM_FOR_NOT_USER_SUCCESS,
    GET_CHAT_ROOM_FOR_NOT_USER_FAIL,
    SET_USER_PROFILE_SUCCESS,
    SET_USER_PROFILE_FAIL,
    CLEAR_USER_PROFILE_SUCCESS,
    CLEAR_USER_PROFILE_FAIL
}
    from './types';

export const load_request_id = (callback) => async dispatch => {
        await dispatch(request_refresh());
        const access = dispatch(getToken('access'));
    
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
    const access = dispatch(getToken('access'));

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
    const access = dispatch(getToken('access'));

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
    const access = dispatch(getToken('access'));

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
    const access = dispatch(getToken('access'));

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

export const set_meet_time = (time, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        time
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room/meet/time/${room_id}`, {
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
                type: SET_MEET_TIME_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_MEET_TIME_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_MEET_TIME_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const set_meet_place = (place, room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        place
    });

    try {
        const res = await fetch(`${API_URL}/api/chat/room/meet/place/${room_id}`, {
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
                type: SET_MEET_PLACE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_MEET_PLACE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_MEET_PLACE_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const delete_meet_time = (room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/chat/room/meet/time/${room_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_MEET_TIME_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: DELETE_MEET_TIME_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: DELETE_MEET_TIME_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const delete_meet_place = (room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/chat/room/meet/place/${room_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_MEET_PLACE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: DELETE_MEET_PLACE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: DELETE_MEET_PLACE_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const exit_room = (room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

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

export const get_realtime_chat_room = (username, stompClient) => dispatch => {
    const access = dispatch(getToken('access'));

    const subscription = stompClient.subscribe(`/exchange/chat.exchange/room.${username}chatRoomList`,(content) => {
        const data = JSON.parse(content.body);

        try {

            dispatch({
                type: GET_REALTIME_ROOM_SUCCESS,
                payload: data
            })

        } catch(err) {
            console.log(err);
            dispatch({
                type: GET_REALTIME_ROOM_FAIL
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

export const get_chat_room_info = (stompClient) => dispatch => {
    const access = dispatch(getToken('access'));

    try {
        stompClient.send('/app/chat.list', {"pushToken" : access});
        dispatch({
            type: GET_CHAT_ROOM_INFO_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CHAT_ROOM_INFO_FAIL
        });
    }
};

export const clear_room_list = () => dispatch => {
    try {
        dispatch({
            type: CLEAR_ROOM_LIST_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: CLEAR_ROOM_LIST_FAIL
        });
    }
};

export const get_chat_room_for_not_user = () => dispatch => {
    try {
        dispatch({
            type: GET_CHAT_ROOM_FOR_NOT_USER_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CHAT_ROOM_FOR_NOT_USER_FAIL
        });
    }
};

export const set_user_profile = (profile, callback) => async dispatch => {
    try {
        await dispatch({
            type: SET_USER_PROFILE_SUCCESS,
            payload: profile
        });
        if (callback) callback(true);
    } catch (error) {
        console.log(error)
        dispatch({
            type: SET_USER_PROFILE_FAIL
        });
        if (callback) callback(false);
    }
};

export const clear_user_profile = () => dispatch => {
    try {
        dispatch({
            type: CLEAR_USER_PROFILE_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: CLEAR_USER_PROFILE_FAIL
        });
    }
};