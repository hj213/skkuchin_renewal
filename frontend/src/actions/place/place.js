import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACES_FAIL,
    LOAD_PLACES_SUCCESS
} from './types'

//load_place
export const load_place = (place_id) => async dispatch => {
    try {
        const res = await fetch(`/api/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: LOAD_PLACES_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        });
    }
}

//load_places
export const load_places = () => async dispatch => {
    try {
        const res = await fetch('/api/place', {
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
    };
}