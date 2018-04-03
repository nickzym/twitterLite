import {createStore, applyMiddleware,compose} from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from "redux-thunk";
import createHistory from 'history/createMemoryHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import rootReducer from '../store/reducers/index.js';

const routerReducers = routerMiddleware(createHistory());//路由
//const composeEnhancers = process.env.NODE_ENV == 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const middleware = [thunkMiddleware,routerReducers];


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let configureStore = (initialState) => createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware))
);

export default configureStore;
