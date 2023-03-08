import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { set_stomp_client } from '../actions/stompClient/stompClient';
import SockJS from 'sockjs-client';
import { API_URL } from '../config';
import { WEB_PUSH_PUBLIC_KEY } from '../config';

const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const Layout = ({title, content, children}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            // run only in browser
            navigator.serviceWorker.ready.then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        console.log("통과"+sub)
                    } else {
                        subscribe(reg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    }, [])

    const subscribe = async (reg) => {
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(WEB_PUSH_PUBLIC_KEY)
        })
        log(sub);
    }

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