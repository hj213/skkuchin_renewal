import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';

export const enroll_report_community = (report_type, content, comment_id, article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        report_type, content, comment_id, article_id
    });

    console.log(body);

    try {
        const res = await fetch(`${API_URL}/api/article/report`, {
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
    }
    catch(error) {
        if (callback) callback([false, error]);
    }
}