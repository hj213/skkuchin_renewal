import Head from 'next/head';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import Container from '@mui/material/Container';

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
      <Provider store={store}>
        <Head>
          <title>HTTPOnly Auth</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Container style={{padding:'0px'}} maxWidth="sm">
          <Component {...pageProps} />
        </Container>
      </Provider>
  );
}

export default App;
