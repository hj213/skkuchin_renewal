import Cookies from 'js-cookie';
import { API_URL } from '../../config/index';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import { 
    LOAD_FAV_SUCCESS,
    LOAD_FAV_FAIL,
    ENROLL_FAV_SUCCESS,
    ENROLL_FAV_FAIL,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAIL,
} 
    from './types';

export const load_favorite = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/favorite`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_FAV_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: LOAD_FAV_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        dispatch({
            type: LOAD_FAV_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}


export const enroll_favorite = (place_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    const body = JSON.stringify({
        place_id
    });

    try {
        const res = await fetch(`${API_URL}/api/favorite`, {
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
                type: ENROLL_FAV_SUCCESS
            })
            await dispatch(load_favorite());
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: ENROLL_FAV_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch(error) {
        dispatch({
            type: ENROLL_FAV_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const delete_favorite = (favorite_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/favorite/${favorite_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: DELETE_FAV_SUCCESS
            })
            await dispatch(load_favorite());
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: DELETE_FAV_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch(error) {
        dispatch({
            type: DELETE_FAV_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
};

