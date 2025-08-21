import { Provider } from 'react-redux';
import { persistor, store } from '../store/index';
import { PersistGate } from 'redux-persist/integration/react';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../ni18n.config.js';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

import '../styles/tailwind.css';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default appWithI18Next(App, ni18nConfig);
