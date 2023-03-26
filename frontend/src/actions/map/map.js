import {
    SET_MAP_SUCCESS,
    SET_MAP_FAIL,
    SET_MAP_SCRIPT_SUCCESS,
    SET_MAP_SCRIPT_FAIL
} from './types'

export const set_map = (map) => async dispatch => {

    try {
        dispatch({
            type: SET_MAP_SUCCESS,
            payload: map
        })
    } catch(error) {
        dispatch({
            type: SET_MAP_FAIL
        })
    }
};

export const set_map_script = (mapScript) => async dispatch => {

    try {
        dispatch({
            type: SET_MAP_SCRIPT_SUCCESS,
            payload: mapScript
        })
    } catch(error) {
        dispatch({
            type: SET_MAP_SCRIPT_FAIL
        })
    }
};