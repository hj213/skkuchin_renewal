import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,
} from './types'

//load_menu
export const load_menu = (place_id, callback) => async dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    try {
        const res = await fetch(`${API_URL}/api/menu/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_MENU_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        }else{
            dispatch({
                type: LOAD_MENU_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_MENU_FAIL
        });
        if (callback) callback([false, error]);
    }
}
