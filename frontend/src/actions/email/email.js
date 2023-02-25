import { API_URL } from '../../config/index';
import {
    SIGNUP_EMAIL_SEND_SUCCESS,
    SIGNUP_EMAIL_SEND_FAIL,
    SIGNUP_EMAIL_CHECK_SUCCESS,
    SIGNUP_EMAIL_CHECK_FAIL,
    PASSWORD_EMAIL_SEND_SUCCESS,
    PASSWORD_EMAIL_SEND_FAIL,
    PASSWORD_EMAIL_CHECK_SUCCESS,
    PASSWORD_EMAIL_CHECK_FAIL
}
    from './types';

export const signup_email_send = (username, email, agreement, callback) => async dispatch => {
    const body = JSON.stringify({
        username, 
        email,
        agreement
    });

    try {
        const res = await fetch(`${API_URL}/api/email/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();
        
        if (res.status === 201) {
            dispatch({
                type: SIGNUP_EMAIL_SEND_SUCCESS
            });
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SIGNUP_EMAIL_SEND_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: SIGNUP_EMAIL_SEND_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const signup_email_check = (username, callback) => async dispatch => {
    const body = JSON.stringify({
        username
    });

    try {
        const res = await fetch(`${API_URL}/api/email/signup/check`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();
        
        if (res.status === 200) {
            dispatch({
                type: SIGNUP_EMAIL_CHECK_SUCCESS,
                payload: apiRes.data
            });
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SIGNUP_EMAIL_CHECK_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: SIGNUP_EMAIL_CHECK_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const password_email_send = (email, callback) => async dispatch => {
    const body = JSON.stringify({
        email
    });

    try {
        const res = await fetch(`${API_URL}/api/email/password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();
        
        if (res.status === 201) {
            dispatch({
                type: PASSWORD_EMAIL_SEND_SUCCESS
            });
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: PASSWORD_EMAIL_SEND_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: PASSWORD_EMAIL_SEND_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const password_email_check = (email, callback) => async dispatch => {
    const body = JSON.stringify({
        email
    });

    try {
        const res = await fetch(`${API_URL}/api/email/password/check`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();
        
        if (res.status === 200) {
            dispatch({
                type: PASSWORD_EMAIL_CHECK_SUCCESS,
                payload: apiRes.data
            });
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: PASSWORD_EMAIL_CHECK_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: SIGNUP_EMAIL_CHECK_FAIL
        });
        if (callback) callback([false, error]);
    }
};