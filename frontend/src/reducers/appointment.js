import {
    LOAD_APPOINTMENT_SUCCESS,
    LOAD_APPOINTMENT_FAIL,
    ENROLL_APPOINTMENT_SUCCESS,
    ENROLL_APPOINTMENT_FAIL,
    MODIFY_APPOINTMENT_SUCCESS,
    MODIFY_APPOINTMENT_FAIL
} from '../actions/appointment/types'

const initialState = {
    appointment: null,
};

const appointmentReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointment: payload
            }
        case LOAD_APPOINTMENT_FAIL:
            return {
                ...state,
                appointment: null
            }
        case ENROLL_APPOINTMENT_SUCCESS:
            return {
                ...state
            }
        case ENROLL_APPOINTMENT_FAIL:
            return {
                ...state
            }
        case MODIFY_APPOINTMENT_SUCCESS:
            return {
                ...state
            }
        case MODIFY_APPOINTMENT_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default appointmentReducer;