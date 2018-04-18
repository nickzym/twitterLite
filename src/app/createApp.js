import React from 'react';
import {Provider} from 'react-redux';
import Routers from './router/index';
import Loadable from 'react-loadable';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const createApp=({store,history,modules})=>{
  console.log(process.env.NODE_ENV==='production',process.env.NODE_ENV)
  const persistor = persistStore(store);
  // if(localStorage.jwtToken) {
  //     setAuthorizationToken(localStorage.jwtToken);
  //     // prevent someone from manually tempering with the ky of jwtToken in localStorage
  //     try {
  //         store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  //     } catch (err) {
  //         store.dispatch(setCurrentUser({}));
  //     }
  // }
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

  }else{
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
