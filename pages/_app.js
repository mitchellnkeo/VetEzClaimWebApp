import { Provider } from 'react-redux';
import { persistor, store } from '../store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { initializeRevenueCat } from '../store/slices/revenueCatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken } from '../helpers/sessionHelper';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../ni18n.config.js';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

import '../styles/tailwind.css';

// Separate component to use Redux hooks
const RevenueCatInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.revenueCat);

  useEffect(() => {
    const accessToken = getAccessToken();
    console.log('----> app.js');
    console.log('accessToken', accessToken);
    console.log('isInitialized', isInitialized);
    
    if (accessToken) {
      dispatch(initializeRevenueCat(accessToken));
    }
  }, [dispatch, isInitialized]);

  return children;
};

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RevenueCatInitializer>
          <Component {...pageProps} />
        </RevenueCatInitializer>
      </PersistGate>
    </Provider>
  );
};

export default appWithI18Next(App, ni18nConfig);
