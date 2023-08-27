import { getToken, request_refresh } from '../auth/auth';
import {
    GET_REALTIME_NOTICE_ALARM_SUCCESS,
    GET_NOTICE_ALARM_SUBSCRIPTION_SUCCESS,
    GET_NOTICE_ALARM_INFO_SUCCESS,
    GET_NOTICE_ALARM_INFO_FAIL,
}
    from './types';

export const get_realtime_notice_alarm = (username, stompClient) => dispatch => {
    const access = dispatch(getToken('access'));
    
    const subscription = stompClient.subscribe(`/exchange/chat.exchange/notice.${username}`,(content) => {
        const data = JSON.parse(content.body);
        
        dispatch({
            type: GET_REALTIME_NOTICE_ALARM_SUCCESS,
            payload: data
        })
    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
    });

    dispatch({
        type: GET_NOTICE_ALARM_SUBSCRIPTION_SUCCESS,
        payload: subscription
    })

    return subscription;
};

export const get_notice_alarm_info = (stompClient) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        stompClient.send('/app/notice.alarm', {"pushToken" : access});
        dispatch({
            type: GET_NOTICE_ALARM_INFO_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_NOTICE_ALARM_INFO_FAIL
        });
    }

};