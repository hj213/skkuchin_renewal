
import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACE_ID_SUCCESS,
    LOAD_PLACE_ID_FAIL
} from '../actions/place/types'

const initialState = {
    place: null
};

const placeReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_PLACE_SUCCESS:
            return {
                ...state,
                place: payload.place
            }
        case LOAD_PLACE_FAIL:
            return {
                ...state,
                place: null
            }
        case LOAD_PLACE_ID_SUCCESS:
            return {
                ...state,
                place: payload.place
            }
        case LOAD_PLACE_ID_FAIL:
            return {
                ...state,
                place: null
            }
        default:
            return state;
    };
}

export default placeReducer;