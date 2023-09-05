import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,
    ENROLL_MENU_SUCCESS,
    ENROLL_MENU_FAIL,
    MODIFY_MENU_SUCCESS,
    MODIFY_MENU_FAIL,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAIL
} from './types'

export const load_menu = (place_id, callback) => async dispatch => {
    
    try {
        const res = await fetch(`${API_URL}/api/menu/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_MENU_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_MENU_FAIL
            })
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        dispatch({
            type: LOAD_MENU_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const enroll_menu = (place_id, name, price, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        name, price
    });
    
    try {
        const res = await fetch(`${API_URL}/api/menu/place/${place_id}`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            await dispatch({
                type: ENROLL_MENU_SUCCESS
            })
            dispatch(load_menu(place_id));
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: ENROLL_MENU_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        dispatch({
            type: ENROLL_MENU_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}

export const modify_menu = (place_id, menu_id, name, price, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    const body = JSON.stringify({
        name, price
    });

    try {
        const res = await fetch(`${API_URL}/api/menu/${menu_id}`, {
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: MODIFY_MENU_SUCCESS
            })
            dispatch(load_menu(place_id));
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: MODIFY_MENU_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: MODIFY_MENU_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const delete_menu = (place_id, menu_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    try {
        const res = await fetch(`${API_URL}/api/menu/${menu_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: DELETE_MENU_SUCCESS
            })
            dispatch(load_menu(place_id));
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: DELETE_MENU_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: DELETE_MENU_FAIL
        })
        if (callback) callback([false, error]);
    }
}