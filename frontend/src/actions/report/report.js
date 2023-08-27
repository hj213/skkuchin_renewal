import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';

export const enroll_report = (report_type, content, review_id, chat_room_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        report_type, content, review_id, chat_room_id
    });

    try {
        const res = await fetch(`${API_URL}/api/report`, {
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
};
