import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACE_ID_SUCCESS,
    LOAD_PLACE_ID_FAIL
} from '../actions/place/types'

const initialState = {
    user: null
};

const placeReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_PLACE_SUCCESS:
            return {
                ...state,
            }
        case LOAD_PLACE_FAIL:
            return {
                ...state,
            }
        case LOAD_PLACE_ID_SUCCESS:
            return {
                ...state,
            }
        case LOAD_PLACE_ID_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    };
}

export default placeReducer;