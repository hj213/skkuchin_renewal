import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACES_FAIL,
    LOAD_PLACES_SUCCESS,
    SEARCH_PLACES_SUCCESS,
    SEARCH_PLACES_FAIL,
    CLEAR_SEARCH_RESULTS,
} from './types'

//load_places
export const load_places = (callback) => async dispatch => {
    try {
        const res = await fetch('/api/place', {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: data
            })
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            });
            if (callback) callback([false, data.error]);
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

    try {
        const res = await fetch(`/api/place/${id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACE_SUCCESS,
                payload: data
            })
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: LOAD_PLACE_FAIL
            });
            if (callback) callback([false, data.error]);
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

    try {
        const res = await fetch(`/api/place/search/${keyword}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_SUCCESS,
                payload: data
            })
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: SEARCH_PLACES_FAIL
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_FAIL
        });
        if (callback) callback([false, error]);
    };
}
// 액션 생성자 정의
export const clear_search_results = () => ({
    type: CLEAR_SEARCH_RESULTS
  });