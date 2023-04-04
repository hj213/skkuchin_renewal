import { API_URL } from '../../config';
import { 
    LOAD_RANK_SUCCESS,
    LOAD_RANK_FAIL
}
    from './types';


export const load_rank = (campus, callback) => async dispatch => {
    try {
        const res = await fetch(`${API_URL}/api/rank/campus/${campus}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_RANK_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_RANK_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_RANK_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}