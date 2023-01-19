import {
    LOAD_MENU_FAIL,
    LOAD_MENU_SUCCESS,

} from '../actions/menu/types'

const initialState = {
    menu: []
};

const menuReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_MENU_SUCCESS:
            return {
                ...state,
                menu: payload.menu
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

export default menuReducer;