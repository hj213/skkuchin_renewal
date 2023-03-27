import {
    SET_MAP_SUCCESS,
    SET_MAP_FAIL,
    SET_MAP_SCRIPT_SUCCESS,
    SET_MAP_SCRIPT_FAIL
} from '../actions/map/types'

const initialState = {
    map: null,
    mapScript: null
};

const mapReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SET_MAP_SUCCESS:
            return {
                ...state,
                map: payload
            }
        case SET_MAP_FAIL:
            return {
                ...state,
                map: null
            }
        case SET_MAP_SCRIPT_SUCCESS:
            return {
                ...state,
                mapScript: payload
            }
        case SET_MAP_SCRIPT_FAIL:
            return {
                ...state,
                mapScript: null
            }
        default:
            return state;
    };
}

export default mapReducer;