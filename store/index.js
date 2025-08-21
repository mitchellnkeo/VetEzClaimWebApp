import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './slices/themeConfigSlice';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { login, loginWithGoogle, loginWithFacebook } from '@/services/auth';
import * as usersApi from '@/services/users';
import { seed, deltCookie } from '@/helpers/sessionHelper';

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: ['app', 'auth'],
  // blacklist: ['app'],
};

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  profile: profileSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
