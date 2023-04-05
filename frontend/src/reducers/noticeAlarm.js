import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    GET_REALTIME_NOTICE_ALARM_SUCCESS,
    GET_REALTIME_NOTICE_ALARM_FAIL,
    GET_NOTICE_ALARM_SUBSCRIPTION_SUCCESS,
    GET_NOTICE_ALARM_SUBSCRIPTION_FAIL,
    GET_NOTICE_ALARM_INFO_SUCCESS,
    GET_NOTICE_ALARM_INFO_FAIL
} from '../actions/notice/types'

const initialState = {
    noticeAlarm: null,
    noticeAlarmSubscription: null,
};

const noticeAlarmReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_REALTIME_NOTICE_ALARM_SUCCESS:
            return {
                ...state,
                noticeAlarm: payload
            }
        case GET_REALTIME_NOTICE_ALARM_FAIL:
            return {
                ...state,
                noticeAlarm: null
            }
        case GET_NOTICE_ALARM_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                noticeAlarmSubscription: payload
            }
        case GET_NOTICE_ALARM_SUBSCRIPTION_FAIL:
            return {
                ...state,
                noticeAlarmSubscription: null
            }
        case GET_NOTICE_ALARM_INFO_SUCCESS:
            return {
                ...state
            }
        case GET_NOTICE_ALARM_INFO_FAIL:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default noticeAlarmReducer;