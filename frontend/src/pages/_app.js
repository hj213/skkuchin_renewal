import { Provider } from 'react-redux';
import { useStore } from '../store';
import Container from '@mui/material/Container';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ononline' in window && 'onoffline' in window) {
      setIsOnline(window.navigator.onLine)
      if (!window.ononline) {
        window.addEventListener('online', () => {
          setIsOnline(true)
        })
      }
      if (!window.onoffline) {
        window.addEventListener('offline', () => {
          setIsOnline(false)
        })
      }
    }
  }, [])

  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined && isOnline) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== '/') {
        const wb = window.workbox
        wb.active.then(worker => {
          wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
        })
      }
    }
  }, [isOnline, router.route])

  return (
      <Provider store={store}>
        <Container style={{padding:'0px', overflowY: 'hidden'}} maxWidth="sm">
          <Component {...pageProps} />
        </Container>
      </Provider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});