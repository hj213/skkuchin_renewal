import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

    let stompClient = null;
    const Stomp = require("stompjs/lib/stomp.js").Stomp
    const sockJS = new SockJS(`${API_URL}/ws/chat`);
    stompClient = Stomp.over(sockJS);
    stompClient.heartbeat.outgoing = 0;
    stompClient.heartbeat.incoming = 0;
    // stompClient.debug = null;

    const onError = (e) => {
        connectStompClient();
    }

    const connectStompClient = () => {
        stompClient.connect('guest', 'guest', () => {
            dispatch(set_stomp_client(stompClient));
        }, onError);
    };

    useEffect(() => {
        connectStompClient();
        router.push('/splash');
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 2000);
    }, [])

    sockJS.addEventListener('close', () => {
        setTimeout(() => {
            connectStompClient();
        }, 5000);
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