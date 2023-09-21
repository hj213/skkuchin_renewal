import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';

export const test = () => {
    console.log("test test");
}
export const enroll_request = (campus, name, reason, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        campus, name, reason
    });
    try {
        const res = await fetch(`${API_URL}/api/request`, {
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
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        if (callback) callback([false, error]);
    }
}
