import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../actions/auth/auth";
import Head from "next/head";
import { getToken } from '../utils/firebase';
import { enroll_token } from "../actions/pushToken/pushToken";
import { getMessaging, onMessage } from 'firebase/messaging';

const Layout = ({title, content, children}) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("load")
            dispatch(load_user());
        }

        async function getMessageToken() {
            console.log(Notification.permission);
            if (!("Notification" in window)) {
                console.log("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                console.log("granted");
                const token = await getToken();

                if (token !== null) {
                    dispatch(enroll_token(token, null, null));
                }
            } else {
                Notification.requestPermission().then(async (permission) => {
                    console.log(permission)
                    if (permission === "granted") {
                        console.log("granted");
                        const token = await getToken();

                        if (token !== null) {
                            dispatch(enroll_token(token, true, true));
                        }
                    }
                })
                .catch((err) => {
                    console.log('An error occurred while requesting permission. ', err);
                })

            }
        }
        getMessageToken();

        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                    body: payload.notification.body,
                    icon: '/icons/android-icon-192x192.png'
            };
            
            const notification = new Notification(notificationTitle, notificationOptions);
        });
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