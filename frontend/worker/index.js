// To disable all workbox logging during development, you can set self.__WB_DISABLE_DEV_LOGS to true
// https://developers.google.com/web/tools/workbox/guides/configure-workbox#disable_logging

// eslint-disable-next-line no-underscore-dangle,no-restricted-globals
self.__WB_DISABLE_DEV_LOGS = true;

self.addEventListener('message', async event => {
    if (event.data && event.data.action === 'CACHE_NEW_ROUTE') {
        caches.open('others').then(cache =>
            cache.match(event.source.url).then(res => {
                if (res === undefined) {
                    // console.log(event.source.url+" 페이지가 캐싱되었습니다")
                    return cache.add(event.source.url)
                }
            })
        )
    }
})