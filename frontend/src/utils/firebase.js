import { getMessaging, getToken } from "firebase/messaging";
import { FIREBASE_VAPID_KEY } from '../config';

export async function getToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY }).then((token) => {
        return token;
    })
    .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        return null;
    });
}