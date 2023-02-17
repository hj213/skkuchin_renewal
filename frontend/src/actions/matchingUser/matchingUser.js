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
    const body = JSON.stringify({
        gender, keywords, introduction, mbti
    });
    
    try {
        const res = await fetch('/api/matching/user',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 201){
            dispatch({
                type: ADD_MATCHING_INFO_SUCCESS
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: ADD_MATCHING_INFO_FAIL
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: ADD_MATCHING_INFO_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const load_matching_info = (callback) => async dispatch => {
    try {
        const res = await fetch('/api/matching/user/me',{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_MATCHING_INFO_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: LOAD_MATCHING_INFO_FAIL
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_MATCHING_INFO_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_status_info = (matching, callback) => async dispatch => {
    try {
        const res = await fetch(`/api/matching/user/${matching}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHANGE_MATCHING_STATUS_SUCCESS
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: CHANGE_MATCHING_STATUS_FAIL
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_MATCHING_STATUS_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_matching_info = (gender, keywords, introduction, mbti, callback) => async dispatch => {
    const body = JSON.stringify({
        gender, keywords, introduction, mbti
    });

    try {
        const res = await fetch(`/api/matching/user`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHANGE_MATCHING_INFO_SUCCESS
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: CHANGE_MATCHING_INFO_FAIL
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_MATCHING_INFO_FAIL
        });
        if (callback) callback([false, error]);
    }
}