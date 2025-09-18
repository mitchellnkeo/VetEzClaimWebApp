import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './slices/themeConfigSlice';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';
import formSlice from './slices/formSlice';
import revenueCatSlice from './slices/revenueCatSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { createTransform } from 'redux-persist';

const revenueCatTransform = createTransform(
  (inboundState) => {
    const { isInitialized, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => {
    return { ...outboundState, isInitialized: false };
  },
  { whitelist: ['revenueCat'] }
);

const persistConfig = {
  key: 'root',
  storage: storage,
  transforms: [revenueCatTransform],
};


const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  profile: profileSlice,
  form: formSlice,
  revenueCat: revenueCatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
