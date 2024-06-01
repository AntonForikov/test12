import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {imageReducer} from '../store/image/imageSlice';
import {userReducer} from '../store/user/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore} from 'redux-persist';


const userPersistConfig = {
  key: 'gallery:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  images: imageReducer,
  users: persistReducer(userPersistConfig, userReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;