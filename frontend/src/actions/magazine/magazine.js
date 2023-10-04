import { API_URL } from '../../config/index';
import { getToken, request_refresh } from '../auth/auth';
import { 
    ADD_MAGAZINE_FAIL,
    ADD_MAGAZINE_SUCCESS,
    LOAD_ALL_MAGAZINE_FAIL,
    LOAD_ALL_MAGAZINE_SUCCESS,
    LOAD_MAGAZINE_FAIL,
    LOAD_MAGAZINE_SUCCESS,
    CHANGE_MAGAZINE_FAIL,
    CHANGE_MAGAZINE_SUCCESS,
    DELETE_MAGAZINE_FAIL,
    DELETE_MAGAZINE_SUCCESS,
} 
    from './types';

export const add_magazine = (title, gate ,content, link, placeID, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        title, gate, content, link, placeID
    });
    
    try {
        const res = await fetch(`${API_URL}/api/magazine`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 201){
            await dispatch({
                type: ADD_MAGAZINE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);

        }else {
            await dispatch({
                type: ADD_MAGAZINE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: ADD_MAGAZINE_FAIL
        })
        
        if (callback) callback([false, error]);
        
    }
}
 

export const load_magazine = (articleID, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    try {
        const res = await fetch(`${API_URL}/api/magazine/${articleID}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_MAGAZINE_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: LOAD_MAGAZINE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_MAGAZINE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const load_all_magazine = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    try {
        const res = await fetch(`${API_URL}/api/magazine`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_ALL_MAGAZINE_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        }else {
            dispatch({
                type: LOAD_ALL_MAGAZINE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_ALL_MAGAZINE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const change_magazine = (articleID,title,gate,content,link, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        title, gate, content, link
    });
    
    try {
        const res = await fetch(`${API_URL}/api/magazine/${articleID}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`,
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 200){
            await dispatch({
                type: CHANGE_MAGAZINE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: CHANGE_MAGAZINE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_MAGAZINE_FAIL
        })
        
        if (callback) callback([false, error]);
        
    }
}

export const delete_magazine = (articleID, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    try {
        const res = await fetch(`${API_URL}/api/article/${articleID}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_MAGAZINE_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: DELETE_MAGAZINE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        dispatch({
            type: DELETE_MAGAZINE_FAIL
        });
        if (callback) callback([false, error]);
    }
}