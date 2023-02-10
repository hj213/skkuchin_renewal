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
        const res = await fetch('/api/email/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const data = await res.json();
        console.log("ttttttttt", data);
        
        if (res.status === 201) {
            console.log("suc");
            dispatch({
                type: SIGNUP_EMAIL_SEND_SUCCESS
            });
            if (callback) callback([true, data.success]);
        } else {
            console.log("fail");
            dispatch({
                type: SIGNUP_EMAIL_SEND_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: SIGNUP_EMAIL_SEND_FAIL
        });
        if (callback) callback([false, data.error]);
    }
};

export const signup_email_check = (username, callback) => async dispatch => {
    const body = JSON.stringify({
        username
    });

    try {
        const res = await fetch('/api/email/signup/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const data = await res.json();
        
        if (res.status === 200) {
            console.log("suc");
            dispatch({
                type: SIGNUP_EMAIL_CHECK_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else {
            console.log("fail");
            console.log(data);
            dispatch({
                type: SIGNUP_EMAIL_CHECK_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: SIGNUP_EMAIL_CHECK_FAIL
        });
        if (callback) callback([false, data.error]);
    }
};
