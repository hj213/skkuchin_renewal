import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_RANK_SUCCESS,
    LOAD_RANK_FAIL
} from '../actions/rank/types';

const initialState = {
    rank: null
};

const rankReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_RANK_SUCCESS:
            return {
                ...state,
                rank: payload
            }
        case LOAD_RANK_FAIL:
            return {
                ...state,
                rank: null
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default rankReducer;