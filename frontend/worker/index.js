// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

// eslint-disable-next-line no-underscore-dangle,no-restricted-globals
self.__WB_DISABLE_DEV_LOGS = true;

// self.addEventListener('push', function (event) {
//     // console.log(event)
//     const data = JSON.parse(event.data.text());
//     // console.log(data)
//     event.waitUntil(
//         registration.showNotification(data.title, {
//             body: data.message,
//             icon: '/icons/android-icon-192x192.png'
//         })
//     )
// })

self.addEventListener('push', (event) => {
    // console.log(event)
    let pushMessageJSON = event.data.json();
    // console.log(data)
    event.waitUntil(
        self.registration.showNotification(pushMessageJSON.title, {
            body: pushMessageJSON.message,
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