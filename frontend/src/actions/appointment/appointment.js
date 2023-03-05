import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import { 
    LOAD_APPOINTMENT_SUCCESS,
    LOAD_APPOINTMENT_FAIL,
    ENROLL_APPOINTMENT_SUCCESS,
    ENROLL_APPOINTMENT_FAIL,
    MODIFY_APPOINTMENT_SUCCESS,
    MODIFY_APPOINTMENT_FAIL
} 
    from './types';

export const load_appointment = async (chat_room_id, callback) => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/appointment/room/${chat_room_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_APPOINTMENT_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_APPOINTMENT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: LOAD_APPOINTMENT_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const enroll_appointment = async (date_time, place, chat_room_id, callback) => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        date_time, place
    });

    try {
        const res = await fetch(`${API_URL}/api/appointment/room/${chat_room_id}`, {
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
                type: ENROLL_APPOINTMENT_SUCCESS
            })
            dispatch(load_appointment());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: ENROLL_APPOINTMENT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: ENROLL_APPOINTMENT_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const modify_appointment = async (date_time, place, chat_room_id, callback) => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        date_time, place
    });

    try {
        const res = await fetch(`${API_URL}/api/appointment/room/${chat_room_id}`, {
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
            await dispatch({
                type: MODIFY_APPOINTMENT_SUCCESS
            })
            dispatch(load_appointment());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: MODIFY_APPOINTMENT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: MODIFY_APPOINTMENT_FAIL
        })
        if (callback) callback([false, error]);
    }
};