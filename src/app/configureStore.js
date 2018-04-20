import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from "redux-thunk";
import createHistory from 'history/createMemoryHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import rootReducer from '../store/reducers/index.js';

const routerReducers = routerMiddleware(createHistory());//路由
const middleware = [thunkMiddleware,routerReducers];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  // other store enhancers if any
);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let configureStore = (initialState) => createStore(
    persistedReducer,
    initialState,
    enhancer
);

export default configureStore;
