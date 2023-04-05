import {
    GET_REALTIME_ALARM_SUCCESS,
    GET_REALTIME_ALARM_FAIL,
    GET_ALARM_SUBSCRIPTION_SUCCESS,
    GET_ALARM_SUBSCRIPTION_FAIL,
    GET_CHAR_ALARM_INFO_SUCCESS,
    GET_CHAR_ALARM_INFO_FAIL,
} from '../actions/chat/types'
import { LOGOUT_SUCCESS } from '../actions/auth/types';

const initialState = {
    chatAlarm: null,
    chatAlarmSubscription: null,
};

const chatAlarmReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_REALTIME_ALARM_SUCCESS:
            return {
                ...state,
                chatAlarm: payload
            }
        case GET_REALTIME_ALARM_FAIL:
            return {
                ...state,
                chatAlarm: null
            }
        case GET_ALARM_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                chatAlarmSubscription: payload
            }
        case GET_ALARM_SUBSCRIPTION_FAIL:
            return {
                ...state,
                chatAlarmSubscription: null
            }
        case GET_CHAR_ALARM_INFO_SUCCESS:
            return {
                ...state
            }
        case GET_CHAR_ALARM_INFO_FAIL:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default chatAlarmReducer;