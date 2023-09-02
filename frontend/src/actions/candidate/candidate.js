import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import { 
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} from './types';

export const load_candidate = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/candidate`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_CANDIDATE_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: LOAD_CANDIDATE_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CANDIDATE_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}