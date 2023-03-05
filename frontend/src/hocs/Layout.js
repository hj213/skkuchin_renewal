import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../actions/auth/auth";
import Head from "next/head";
import { set_stomp_client } from '../actions/stompClient/stompClient';
import { Client } from '@stomp/stompjs';
import { WS_URL } from '../config';

const Layout = ({title, content, children}) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const stompClient = new Client({
        brokerURL: `${WS_URL}/ws/chat`,
        reconnectDelay: 5000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 0,
        connectHeaders: {
            login: 'guest',
            passcode: 'guest',
        },
    });

    useEffect(() => {
        stompClient.activate();
        dispatch(set_stomp_client(stompClient));

        if (!isAuthenticated) {
            dispatch(load_user());
        }
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
    content: '스꾸친은 성균관대학교 학생들 간의 밥 약속을 성사시켜드립니다!'
}

export default Layout;