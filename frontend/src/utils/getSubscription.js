import { WEB_PUSH_PUBLIC_KEY } from '../config';
import { useDispatch } from 'react-redux';
import { enroll_token } from '../actions/pushToken/pushToken';

export const getSubscription = () => {
    const dispatch = useDispatch();

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
    
    const subscribe = async (reg) => {
        try {
            const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64ToUint8Array(WEB_PUSH_PUBLIC_KEY)
            });
            dispatch(enroll_token(sub));
        } catch (error) {
            console.log(error)
        }
    }

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
        navigator.serviceWorker.ready.then(reg => {
            reg.pushManager.getSubscription().then(sub => {
                if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                    dispatch(enroll_token(sub));
                } else {
                    subscribe(reg);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}