import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACES_FAIL,
    LOAD_PLACES_SUCCESS,
    SEARCH_PLACES_SUCCESS,
    SEARCH_PLACES_FAIL,
    CLEAR_SEARCH_RESULTS
} from './types'

//load_places
export const load_places = (callback) => async dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    try {
        const res = await fetch(`${API_URL}/api/place`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        });
        if (callback) callback([false, error]);
    }
}

//load_place
export const load_place = (id, callback) => async dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/${id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACE_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PLACE_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACE_FAIL
        });
        if (callback) callback([false, error]);
    };
}

//search_place
export const search_places = (keyword, callback) => async dispatch => {
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search?q=${keyword}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: SEARCH_PLACES_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_FAIL
        });
        if (callback) callback([false, error]);
    };
}

export const clear_search_results = () => ({
    type: CLEAR_SEARCH_RESULTS
});