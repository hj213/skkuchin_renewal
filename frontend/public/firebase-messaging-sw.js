// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCJfOv3y3wkfgwdZ4B013eyIhOXDDjp72w",
    authDomain: "skkuchin-renewal-d20c6.firebaseapp.com",
    projectId: "skkuchin-renewal-d20c6",
    storageBucket: "skkuchin-renewal-d20c6.appspot.com",
    messagingSenderId: "344929940532",
    appId: "1:344929940532:web:07d2e9d94a19828ce5c661",
    measurementId: "G-0H1CX4383K"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/android-icon-192x192.png'
    };

    self.registration.showNotification(
        notificationTitle, 
        notificationOptions
    );
});