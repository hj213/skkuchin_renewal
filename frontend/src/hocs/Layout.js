import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { set_stomp_client } from '../actions/stompClient/stompClient';
import SockJS from 'sockjs-client';
import { API_URL } from '../config';
import { get_realtime_chat_alarm, get_chat_alarm_info } from '../actions/chat/chatAlarm';
import { get_realtime_notice_alarm, get_notice_alarm_info } from '../actions/notice/noticeAlarm';
import { getSubscription } from '../utils/getSubscription';
import { change_toggle_for_not_user, load_user, update_last_accessed_time } from '../actions/auth/auth';

const Layout = ({title, content, children}) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const anotherStompClient = useSelector(state => state.stompClient.stompClient);
    const subscriptions = {};
    const connection = useRef(false);

    const notify = async () => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            getSubscription();
        } else if (Notification.permission === "default") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    getSubscription();
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            notify();
            if (user && connection.current) {
                subscriptions.alarm = dispatch(get_realtime_chat_alarm(user.username, anotherStompClient));
                subscriptions.notice = dispatch(get_realtime_notice_alarm(user.username, anotherStompClient));

                Promise.all(Object.values(subscriptions)).then(() => {
                    dispatch(get_chat_alarm_info(anotherStompClient));
                    dispatch(get_notice_alarm_info(anotherStompClient));
                });
            }
        }
    }, [isAuthenticated, connection]);

    let stompClient = null;

    const onError = (e) => {
        connection.current = false;
        connectStompClient();
    }

    const connectStompClient = () => {
        const Stomp = require("stompjs/lib/stomp.js").Stomp;
        const sockJS = new SockJS(`${API_URL}/ws/chat`);
        stompClient = Stomp.over(sockJS);
        stompClient.heartbeat.outgoing = 0;
        stompClient.heartbeat.incoming = 0;
        stompClient.debug = null;

        stompClient.connect('guest', 'guest', () => {
            connection.current = true;
            dispatch(set_stomp_client(stompClient));
        }, onError);
    };
    
    const campus = localStorage.getItem('map');

    useEffect(() => {
        connectStompClient();
        localStorage.removeItem('user');

        dispatch(load_user())
        .then(() => {
            dispatch(update_last_accessed_time(true));
        })
        .catch((error) => {
            console.log(error);
            if (campus) {
                dispatch(change_toggle_for_not_user(campus));
            } else {
                localStorage.setItem('map', '명륜');
                dispatch(change_toggle_for_not_user('명륜'));
            }
        })
    }, []);

    return ( 
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} ></meta>
            </Head>
            <div>
                {children}
            </div>
        </>
    )
};

Layout.defaultProps = {
    title: '스꾸친',
    content: '성대 네트워킹의 모든 것, 스꾸친'
}

export default Layout;