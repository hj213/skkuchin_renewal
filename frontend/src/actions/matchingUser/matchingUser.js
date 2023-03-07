import Cookies from 'js-cookie';
import { API_URL } from '../../config/index';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import { 
    ADD_MATCHING_INFO_SUCCESS,
    ADD_MATCHING_INFO_FAIL,
    LOAD_MATCHING_INFO_SUCCESS,
    LOAD_MATCHING_INFO_FAIL,
    CHANGE_MATCHING_STATUS_SUCCESS,
    CHANGE_MATCHING_STATUS_FAIL,
    CHANGE_MATCHING_INFO_SUCCESS,
    CHANGE_MATCHING_INFO_FAIL
} 
    from './types';

export const add_matching_info = (gender, keywords, introduction, mbti, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        gender, keywords, introduction, mbti
    });
    
    try {
        const res = await fetch(`${API_URL}/api/matching/user`,{
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
            dispatch({
                type: ADD_MATCHING_INFO_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: ADD_MATCHING_INFO_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: ADD_MATCHING_INFO_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const add_new_matching_info = (username, gender, keywords, introduction, mbti, callback) => async dispatch => {

    const body = JSON.stringify({
        gender, keywords, introduction, mbti
    });
    
    try {
        const res = await fetch(`${API_URL}/api/matching/user/new/${username}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Authorization' : `Bearer ${access}`
            },
            body: body
        });
        const apiRes = await res.json();
        if(res.status === 201){
            dispatch({
                type: ADD_MATCHING_INFO_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: ADD_MATCHING_INFO_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: ADD_MATCHING_INFO_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const load_matching_info = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    try {
        const res = await fetch(`${API_URL}/api/matching/user/me`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_MATCHING_INFO_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: LOAD_MATCHING_INFO_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_MATCHING_INFO_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const change_status_info = (status, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        status
    });
    
    try {
        const res = await fetch(`${API_URL}/api/matching/user/status`,{
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
                type: CHANGE_MATCHING_STATUS_SUCCESS
            })
            dispatch(load_matching_info());
            
            if (callback) callback([true, apiRes.message]);
            
            
        }else {
            dispatch({
                type: CHANGE_MATCHING_STATUS_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_MATCHING_STATUS_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const change_matching_info = (gender, keywords, introduction, mbti, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        gender, keywords, introduction, mbti
    });

    try {
        const res = await fetch(`${API_URL}/api/matching/user`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 200){
            await dispatch({
                type: CHANGE_MATCHING_INFO_SUCCESS
            })
            dispatch(load_matching_info());
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: CHANGE_MATCHING_INFO_FAIL
            }) 
            if (callback) callback([false, apiRes.message]); 
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_MATCHING_INFO_FAIL
        })
        
        if (callback) callback([false, error]);  
    }
}