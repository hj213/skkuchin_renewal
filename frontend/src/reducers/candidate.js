import {
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} from '../actions/candidate/types';
import { LOGOUT_SUCCESS } from '../actions/auth/types';

const initialState = {
    candidate: null
};

const candidateReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_CANDIDATE_SUCCESS:
            return {
                ...state,
                candidate: payload
            }
        case LOAD_CANDIDATE_FAIL:
            return {
                ...state,
                candidate: null
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default candidateReducer;