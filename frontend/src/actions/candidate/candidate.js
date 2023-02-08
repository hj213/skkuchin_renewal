import { 
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} 
    from './types';

export const load_candidate = () => async dispatch => {
    try {
        const res = await fetch('/api/candidate',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_CANDIDATE_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        }else {
            dispatch({
                type: LOAD_CANDIDATE_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }

    } catch (error) {
        dispatch({
            type: LOAD_CANDIDATE_FAIL
        });
        if (callback) callback([false, error]);
    }
}