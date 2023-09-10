import e from 'express';
import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_COMMENT_FAIL,
    LOAD_COMMENT_SUCCESS,
    LOAD_ALL_COMMENTS_SUCCESS,
    LOAD_ALL_COMMENTS_FAIL,
    ENROLL_COMMENT_FAIL,
    ENROLL_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_SUCCESS,
    MODIFY_COMMENT_FAIL,
    MODIFY_COMMENT_SUCCESS,
    ENROLL_REPLY_FAIL,
    ENROLL_REPLY_SUCCESS,
    CLEAR_PREV_COMMENT,
} from './types'

export const load_comment = (article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/comment/${article_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_COMMENT_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_COMMENT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_COMMENT_FAIL
        });
        if (callback) callback([false, error]);
    }
}


export const enroll_comment = (content, article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        content, article_id
    });

    try {
        const res = await fetch(`${API_URL}/api/comment`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            await dispatch({
                type: ENROLL_COMMENT_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: ENROLL_COMMENT_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: ENROLL_COMMENT_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const enroll_reply = (content, comment_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        content
    });

    try {
        const res = await fetch(`${API_URL}/api/comment/${comment_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            await dispatch({
                type: ENROLL_REPLY_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: ENROLL_REPLY_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: ENROLL_REPLY_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const clear_prev_comment = () => ({
    type: CLEAR_PREV_COMMENT
});