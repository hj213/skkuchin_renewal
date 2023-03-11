import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    LOAD_PUSHTOKEN_FAIL,
    LOAD_PUSHTOKEN_SUCCESS,
    ENROLL_PUSHTOKEN_FAIL,
    ENROLL_PUSHTOKEN_SUCCESS,
    MODIFY_PUSHTOKEN_FAIL,
    MODIFY_PUSHTOKEN_SUCCESS
} from './types'

export const load_token = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === nuwll) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/push`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PUSHTOKEN_SUCCESS,
                payload: apiRes.data
            });

            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PUSHTOKEN_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: LOAD_PUSHTOKEN_FAIL
        });

        if (callback) callback([false, error]);
    }
};

export const enroll_token = (subscription, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        subscription
    });

    try {
        const res = await fetch(`${API_URL}/api/push`, {
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
                type: ENROLL_PUSHTOKEN_SUCCESS
            });
            dispatch(load_token());

            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: ENROLL_PUSHTOKEN_FAIL
            });

            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: ENROLL_PUSHTOKEN_FAIL
        });

        if (callback) callback([false, error]);
    }
};

export const modify_token = (subscription, isInfoAlarmOn, isChatAlarmOn, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        subscription, isInfoAlarmOn, isChatAlarmOn
    });

    try {
        const res = await fetch(`${API_URL}/api/push`, {
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
                type: MODIFY_PUSHTOKEN_SUCCESS
            });
            dispatch(load_token());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: MODIFY_PUSHTOKEN_FAIL
            });

            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: MODIFY_PUSHTOKEN_FAIL
        });

        if (callback) callback([false, error]);
    }
};