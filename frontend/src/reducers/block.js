import {
    LOAD_BLOCK_SUCCESS,
    LOAD_BLOCK_FAIL,
    ENROLL_BLOCK_SUCCESS,
    ENROLL_BLOCK_FAIL,
    DELETE_BLOCK_SUCCESS,
    DELETE_BLOCK_FAIL,

} from '../actions/block/types';

const initialState = {
    blockedUsers: null,
};

const blockReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_BLOCK_SUCCESS:
            return {
                ...state,
                blockedUsers: payload.blockedUsers
            }
        case LOAD_BLOCK_FAIL:
            return {
                ...state,
                blockedUsers: null
            }
        case ENROLL_BLOCK_SUCCESS:
            return {
                ...state,
            }
        case ENROLL_BLOCK_FAIL:
            return {
                ...state,
            }
        case DELETE_BLOCK_SUCCESS:
            return {
                ...state,
            }
        case DELETE_BLOCK_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    };
};

export default blockReducer;