// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

// eslint-disable-next-line no-underscore-dangle,no-restricted-globals
self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text());
    event.waitUntil(
        registration.showNotification(data.title, {
            body: data.message,
            icon: '/icons/android-icon-192x192.png'
        })
    )
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            if (clientList.length > 0) {
                let client = clientList[0]
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i]
                    }
                }
                return client.focus()
            }   
            return clients.openWindow('/')
        })
    )
})

// self.addEventListener('pushsubscriptionchange', async () => {
//     const permissionResult = await Notification.requestPermission();
//     if (permissionResult !== 'granted') {
//         throw new Error('Permission not granted for Notification');
//     }
//     const reg = await self.registration;
//     const sub = await reg.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: base64ToUint8Array("BJkNh3LjryGnKrmWZCY_fAebZqGPhtuzBZCBBoB7lPh54M1raOJGfATpy0X7BpVahZJXk6Iq6XFTxM4STBMSFTY")
//     });
//     console.log('Subscribed to web push:', sub.endpoint);
// });

// self.addEventListener('pushsubscriptionchange', function(event) {
//     event.waitUntil(
//         Promise.all([
//             Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//             Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//             .then(function(sub) { return saveSubscription(sub) })
//         ])
//     )
// })

self.addEventListener('message', async event => {
    if (event.data && event.data.action === 'CACHE_NEW_ROUTE') {
        caches.open('others').then(cache =>
            cache.match(event.source.url).then(res => {
                if (res === undefined) {
                    return cache.add(event.source.url)
                }
            })
        )
    }
})