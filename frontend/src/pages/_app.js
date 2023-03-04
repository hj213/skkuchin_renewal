import { Provider } from 'react-redux';
import { useStore } from '../store';
import Container from '@mui/material/Container';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../hocs/Layout';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

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
      const wb = window.workbox
      wb.active.then(worker => {
        wb.messageSW({ action: 'CACHE_NEW_ROUTE' })
      })
    }
  }, [isOnline, router.route])

  return (
      <Provider store={store}>
        <Layout>
          <Container style={{padding:'0px', overflowY: 'hidden'}} maxWidth="sm">
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <title>스꾸친</title>
              </Head>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </Provider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});