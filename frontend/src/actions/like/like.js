import { API_URL } from '../../config/index';
import { getToken, request_refresh } from '../auth/auth';
import { 
    LOAD_MY_LIKE_SUCCESS,
    LOAD_MY_LIKE_FAIL,
    ENROLL_LIKE_SUCCESS,
    ENROLL_LIKE_FAIL,
    DELETE_LIKE_SUCCESS,
    DELETE_LIKE_FAIL,
} 
from './types';
import { load_post } from '../post/post';

export const enroll_like = (article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({article_id});

    try {
        const res = await fetch(`${API_URL}/api/article/like`,{
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
                type: ENROLL_LIKE_SUCCESS
            })
            await dispatch(load_post(article_id));
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: ENROLL_LIKE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: ENROLL_LIKE_FAIL
        });
        if (callback) callback([false, error]);
    }
}

