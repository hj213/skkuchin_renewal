import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_POST_FAIL,
    LOAD_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    LOAD_ALL_POSTS_FAIL,
    ENROLL_POST_FAIL,
    ENROLL_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    MODIFY_POST_FAIL,
    MODIFY_POST_SUCCESS,
    CLEAR_PREV_POST,
} from './types'

export const load_post = (postId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/${postId}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_POST_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_POST_FAIL
            })

            if (callback) callback([false, apiRes.message]);

        }
    } catch (error) {
        dispatch({
            type: LOAD_POST_FAIL
        })

        if (callback) callback([false, error]);

    }
}


export const load_all_posts = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });
        
        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_ALL_POSTS_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_ALL_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_ALL_POSTS_FAIL
        })

        if (callback) callback([false, error]);
    }
}

export const enroll_post = (title, content, article_type, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    console.log(title, content, article_type);

    const body = JSON.stringify({
        title, content, article_type
    });

    try {
        const res = await fetch(`${API_URL}/api/article`, {
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
                type: ENROLL_POST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: ENROLL_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: ENROLL_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const clear_prev_post = () => ({
    type: CLEAR_PREV_POST
});