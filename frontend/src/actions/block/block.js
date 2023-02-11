import { 
    LOAD_BLOCK_SUCCESS,
    LOAD_BLOCK_FAIL,
    ENROLL_BLOCK_SUCCESS,
    ENROLL_BLOCK_FAIL,
    DELETE_BLOCK_SUCCESS,
    DELETE_BLOCK_FAIL,
} 
    from './types';

export const load_block_users = (callback) => async dispatch => {
    try {
        const res = await fetch('/api/block',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_BLOCK_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: LOAD_BLOCK_FAIL
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        dispatch({
            type: LOAD_BLOCK_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const enroll_block_user = (blocked_user_id, callback) => async dispatch => {
    const body = JSON.stringify({
        blocked_user_id
    });

    try {
        const res = await fetch('/api/block', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 201) {
            dispatch({
                type: ENROLL_BLOCK_SUCCESS
            });
            dispatch(load_block_users());
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: ENROLL_BLOCK_FAIL
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        dispatch({
            type: ENROLL_BLOCK_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const delete_block_users = (block_id, callback) => async dispatch => {
    try {
        const res = await fetch(`/api/block/${block_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (res.status === 200) {
            dispatch({
                type: DELETE_BLOCK_SUCCESS
            });
            dispatch(load_block_users());
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: DELETE_BLOCK_FAIL
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        dispatch({
            type: DELETE_BLOCK_FAIL
        });
        if (callback) callback([false, error]);
    }
};

