import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    LOAD_PUSHTOKEN_FAIL,
    LOAD_PUSHTOKEN_SUCCESS,
    ENROLL_PUSHTOKEN_FAIL,
    ENROLL_PUSHTOKEN_SUCCESS,
    ENROLL_PHONE_FAIL,
    ENROLL_PHONE_SUCCESS,
    SET_CHAT_PUSH_SUCCESS,
    SET_CHAT_PUSH_FAIL,
    SET_INFO_PUSH_SUCCESS,
    SET_INFO_PUSH_FAIL
} from './types'

export const load_token = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/push`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
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

export const enroll_phone = (phone, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        phone
    });

    try {
        const res = await fetch(`${API_URL}/api/push/phone`, {
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
                type: ENROLL_PHONE_SUCCESS
            });
            dispatch(load_token());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: ENROLL_PHONE_FAIL
            });

            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: ENROLL_PHONE_FAIL
        });

        if (callback) callback([false, error]);
    }
};

export const set_chat_push = (chat, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        chat
    });

    try {
        const res = await fetch(`${API_URL}/api/push/chat`, {
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
                type: SET_CHAT_PUSH_SUCCESS
            });
            dispatch(load_token());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_CHAT_PUSH_FAIL
            });

            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_CHAT_PUSH_FAIL
        });

        if (callback) callback([false, error]);
    }
};

export const set_info_push = (info, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        info
    });

    try {
        const res = await fetch(`${API_URL}/api/push/info`, {
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
                type: SET_INFO_PUSH_SUCCESS
            });
            dispatch(load_token());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SET_INFO_PUSH_FAIL
            });

            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: SET_INFO_PUSH_FAIL
        });

        if (callback) callback([false, error]);
    }
};