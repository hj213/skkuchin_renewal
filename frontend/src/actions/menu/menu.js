import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,
} from './types'

//load_menu
export const load_menu = (place_id, callback) => async dispatch => {
    try {
        const res = await fetch(`/api/menu/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_MENU_SUCCESS,
                payload: data
            })
            if (callback) callback([true, data.success]);
        }else{
            dispatch({
                type: LOAD_MENU_FAIL
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_MENU_FAIL
        });
        if (callback) callback([false, error]);
    }
}
