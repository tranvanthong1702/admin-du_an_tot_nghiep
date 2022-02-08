import { persistReducer, persistStore } from 'redux-persist'
import React  from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../rootReducer'

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// let composeEnhancers = null;
// if (process.env.NODE_ENV === 'production') {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// } else {
//   composeEnhancers = compose;
// }
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(persistedReducer, composedEnhancer);

export const persistor = persistStore(store);