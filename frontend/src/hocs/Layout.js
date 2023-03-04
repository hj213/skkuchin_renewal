import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "../actions/auth/auth";
import Head from "next/head";
import { createToken } from '../utils/firebase';
import { enroll_token } from "../actions/pushToken/pushToken";
import { getMessaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const Layout = ({title, content, children}) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("load")
            dispatch(load_user());
        }

        const firebaseConfig = {
            apiKey: "AIzaSyCJfOv3y3wkfgwdZ4B013eyIhOXDDjp72w",
            authDomain: "skkuchin-renewal-d20c6.firebaseapp.com",
            projectId: "skkuchin-renewal-d20c6",
            storageBucket: "skkuchin-renewal-d20c6.appspot.com",
            messagingSenderId: "344929940532",
            appId: "1:344929940532:web:07d2e9d94a19828ce5c661",
            measurementId: "G-0H1CX4383K"
        };
            
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        async function getMessageToken() {
            console.log(Notification.permission);
            if (!("Notification" in window)) {
                console.log("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                console.log("granted");
                const token = await createToken();

                if (token !== null) {
                    dispatch(enroll_token(token, null, null));
                }
            } else {
                console.log("not granted");
                Notification.requestPermission().then(async (permission) => {
                    console.log(permission)
                    if (permission === "granted") {
                        console.log("granted");
                        const token = await createToken();

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