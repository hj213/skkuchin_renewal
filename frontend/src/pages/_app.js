import Head from 'next/head';
import { Provider } from 'react-redux';
import { useStore } from '../store';

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initaialReduxState);


  return (

    <Provider store={store}>
      <Head>
        <title>HTTPOnly Auth</title>
        <meta name='viewport' content='width=device-width, inital-scale=1' />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" 
          crossorigin="anonymous" />
        <script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" 
          crossorigin="anonymous">
        </script>

      </Head>
      <Component {...pageProps} />
    </Provider>
      
  );
}

export default App;
