import { getToken, request_refresh } from '../auth/auth';
import {
    GET_REALTIME_ALARM_SUCCESS,
    GET_ALARM_SUBSCRIPTION_SUCCESS,
    GET_CHAR_ALARM_INFO_SUCCESS,
    GET_CHAR_ALARM_INFO_FAIL,
}
    from './types';

export const get_realtime_chat_alarm = (username, stompClient) => dispatch => {
    const access = dispatch(getToken('access'));
    const subscription = stompClient.subscribe(`/exchange/chat.exchange/alarm.${username}`,(content) => {
        const data = JSON.parse(content.body);
        
        dispatch({
            type: GET_REALTIME_ALARM_SUCCESS,
            payload: data
        })
    },{
        'auto-delete':true, 
        'durable':false, 
        'exclusive':false,
        pushToken : access
    });

    dispatch({
        type: GET_ALARM_SUBSCRIPTION_SUCCESS,
        payload: subscription
    })

    return subscription;
};

export const get_chat_alarm_info = (stompClient) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        stompClient.send('/app/chat.alarm', {"pushToken" : access});
        dispatch({
            type: GET_CHAR_ALARM_INFO_SUCCESS
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_CHAR_ALARM_INFO_FAIL
        });
    }

};