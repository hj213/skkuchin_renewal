import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    LOAD_NOTICE_FAIL,
    LOAD_NOTICE_SUCCESS,
    LOAD_NOTICES_FAIL,
    LOAD_NOTICES_SUCCESS,
    DELETE_NOTICE_FAIL,
    DELETE_NOTICE_SUCCESS,
    MODIFY_NOTICE_FAIL,
    MODIFY_NOTICE_SUCCESS,
    ENROLL_NOTICE_SUCCESS,
    ENROLL_NOTICE_FAIL
} from './types'

//load_places
export const load_notices = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    try {
        const res = await fetch(`${API_URL}/api/notice`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_NOTICES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_NOTICES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_NOTICES_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

//load_place
export const load_notice = (notice_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/notice/${notice_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_NOTICE_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_NOTICE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_NOTICE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    };
}

export const enroll_notice = (notice_id, type, title, content, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        type, title, content
    });

    try {
        const res = await fetch(`${API_URL}/api/notice`, {
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
            dispatch({
                type: ENROLL_NOTICE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: ENROLL_NOTICE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch(error) {
        console.log(error)
        dispatch({
            type: ENROLL_NOTICE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
};

export const modify_notice = (notice_id, type, title, content, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    const body = JSON.stringify({
        type, title, content
    });

    try {
        const res = await fetch(`${API_URL}/api/notice/${notice_id}`, {
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
            dispatch({
                type: MODIFY_NOTICE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: MODIFY_NOTICE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch(error) {
        dispatch({
            type: MODIFY_NOTICE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
};

export const delete_notice = (notice_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/notice/${notice_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_NOTICE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: DELETE_NOTICE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch(error) {
        dispatch({
            type: DELETE_NOTICE_FAIL
        })
        
        if (callback) callback([false, error]);
    }
};