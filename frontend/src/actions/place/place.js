import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACE_ID_FAIL,
    LOAD_PLACE_ID_SUCCESS
} from './types'

//load_place
export const load_place = () => async dispatch => {
    try {
        const res = await fetch('/api/map/place', {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_PLACE_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: LOAD_PLACE_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACE_FAIL
        });
    }
}

//load_place_id
export const load_place_id = () => async dispatch => {
    try {
        const res = await fetch('/api/map/place/place_id', {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_PLACE_ID_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: LOAD_PLACE_ID_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACE_ID_FAIL
        });
    }
}