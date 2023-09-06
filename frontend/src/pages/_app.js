import { Provider } from 'react-redux';
import { useStore } from '../store';
import Container from '@mui/material/Container';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../hocs/Layout';
import Script from 'next/script';
import * as gtag from '../lib/gtag';
import '../styles.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);

  const [isOnline, setIsOnline] = useState(true);

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

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        gtag.pageview(url);
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
          <div style={{ position: 'fixed', zIndex: '-3', top: 0, left: 0, width:'100%', height:'100%', backgroundColor: '#f4f4f4'}} >
            <div style={{ margin: '0 auto', zIndex: '-2', width:'100%', height:'100%', backgroundColor: '#fff', maxWidth: '420px'}} />
          </div>
            <Container style={{ maxWidth: '420px', margin: '0 auto', padding: '0px', overflowY: 'hidden' }}>
              <Head>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gtag.GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                  }}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <title>스꾸친</title>
              </Head>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
              />
              <Component {...pageProps} />
            </Container>
        </Layout>
      </Provider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});