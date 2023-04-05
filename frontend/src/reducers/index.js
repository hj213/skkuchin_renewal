import { combineReducers } from 'redux';
import authReducer from './auth';
import favoriteReducer from './favorite';
import menuReducer from './menu';
import placeReducer from './place';
import reviewReducer from './review';
import candidateReducer from './candidate';
import matchingUserReducer from './matchingUser';
import pushTokenReducer from './pushToken'
import chatMessageReducer from './chatMessage';
import chatRoomReducer from './chatRoom';
import chatRequestReducer from './chatRequest';
import chatAlarmReducer from './chatAlarm';
import stompClientReducer from './stompClient';
import noticeAlarmReducer from './noticeAlarm';
import noticeReducer from './notice';
import rankReducer from './rank';

export default combineReducers({
    auth: authReducer,
    favorite: favoriteReducer,
    place: placeReducer,
    menu: menuReducer,
    review: reviewReducer,
    candidate: candidateReducer,
    matchingUser: matchingUserReducer,
    pushToken: pushTokenReducer,
    chatMessage: chatMessageReducer,
    chatRequest: chatRequestReducer,
    chatRoom: chatRoomReducer,
    chatAlarm: chatAlarmReducer,
    notice: noticeReducer,
    noticeAlarm: noticeAlarmReducer,
    rank: rankReducer,
    stompClient: stompClientReducer,
});