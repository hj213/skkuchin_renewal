import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,

} from '../actions/menu/types'

const initialState = {
    chatRequest: null,
};

const chatRequestReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_MENU_SUCCESS:
            return {
                ...state,
                menu: payload
            }
        case LOAD_MENU_FAIL:
            return {
                ...state,
                menu: null
            }
        default:
            return state;
    };
}

export default chatRequestReducer;