import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_POST_FAIL,
    LOAD_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    LOAD_ALL_POSTS_FAIL,
    LOAD_MY_POSTS_SUCCESS,
    LOAD_MY_POSTS_FAIL,
    LOAD_FAV_POSTS_SUCCESS,
    LOAD_FAV_POSTS_FAIL,
    ENROLL_POST_FAIL,
    ENROLL_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    MODIFY_POST_FAIL,
    MODIFY_POST_SUCCESS,
    SEARCH_POSTS_FAIL,
    SEARCH_POSTS_SUCCESS,
    CLEAR_SEARCH_POSTS,
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

export const load_my_posts = (userId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/user/${userId}`, {
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
                type: LOAD_MY_POSTS_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_MY_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_MY_POSTS_FAIL
        })

        if (callback) callback([false, error]);
    }
}

export const load_fav_posts = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/like`, {
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
                type: LOAD_FAV_POSTS_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_FAV_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_FAV_POSTS_FAIL
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

export const modify_post = (article_id, title, content, article_type, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    const body = JSON.stringify({
        title, content, article_type
    });

    try {
        const res = await fetch(`${API_URL}/api/article/${article_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: MODIFY_POST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: MODIFY_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    }
    catch (error) {
        dispatch({
            type: MODIFY_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}


export const delete_post = (article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    console.log("delete_post", article_id);
    
    try {
        const res = await fetch(`${API_URL}/api/article/${article_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_POST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: DELETE_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        dispatch({
            type: DELETE_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const search_posts = (tag, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/tags/${tag}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_POSTS_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: SEARCH_POSTS_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        dispatch({
            type: SEARCH_POSTS_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const clear_search_posts = () => ({
    type: CLEAR_SEARCH_POSTS
});

export const clear_prev_post = () => ({
    type: CLEAR_PREV_POST
});