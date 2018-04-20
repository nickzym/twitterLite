import React from 'react';
import { Provider } from 'react-redux';
import Routers from './router/index';
import Loadable from 'react-loadable';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import { addCookie } from '../store/actions/cookie';
import jwtDecode from 'jwt-decode';

const createApp=({store,history,modules})=>{
    console.log(process.env.NODE_ENV==='production',process.env.NODE_ENV)
    const persistor = persistStore(store);
    // const cookie = document.cookie;
    // console.log(cookie);
    const cookie = store.getState().cookie;
    console.log(cookie);
    if(cookie) {
        setAuthorizationToken(cookie);
        // prevent someone from manually tempering with the key of jwtToken in localStorage
        try {
            store.dispatch(addCookie(cookie));
            store.dispatch(setCurrentUser(jwtDecode(cookie)));
        } catch (err) {
            persistor.purge();
            store.dispatch(setCurrentUser({}));
        }
    } else {
        persistor.purge();
        store.dispatch(setCurrentUser({}));
    }

    if(process.env.NODE_ENV==='production'){
        return (
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Routers history={history} />
                    </PersistGate>
                </Provider>
            </Loadable.Capture>
        )

    } else {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routers history={history} />
            </PersistGate>
        </Provider>
    )
  }
}

export default createApp;
