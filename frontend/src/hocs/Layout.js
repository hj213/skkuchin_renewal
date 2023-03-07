import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../actions/auth/auth";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { set_stomp_client } from '../actions/stompClient/stompClient';
import SockJS from 'sockjs-client';
import { API_URL } from '../config';

const Layout = ({title, content, children}) => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const [show, setShow] = useState(false);

    const Stomp = require("stompjs/lib/stomp.js").Stomp
    const sockJS = new SockJS(`${API_URL}/ws/chat`);
    const stompClient = Stomp.over(sockJS);

    stompClient.heartbeat.outgoing = 0;
    stompClient.heartbeat.incoming = 0;
    // stompClient.debug = null;

    useEffect(() => {
        stompClient.connect('guest', 'guest');
        dispatch(set_stomp_client(stompClient));
        router.push('/splash')
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    }, [])

    sockJS.addEventListener('close', () => {
        console.log("WebSocket disconnected, attempting to reconnect...");
        stompClient.connect('guest', 'guest');
        dispatch(set_stomp_client(stompClient));
    });

    return ( 
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={content} ></meta>
                </Head>
                
                {show && <div>
                    {children}
                </div>}
            </>
        )
};

Layout.defaultProps = {
    title: '스꾸친',
    content: '스꾸친은 성균관대학교 학생들 간의 밥 약속을 성사시켜드립니다!'
}

export default Layout;