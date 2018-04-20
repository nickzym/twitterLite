import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter }  from 'react-router-redux';
import routesConfig from './routes';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

const Routers = ({history}) => (
  <ConnectedRouter history={history}>
    <div>
        <Header />
        {
            routesConfig.map(route=>(
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component}  thunk={route.thunk}  />
            ))
        }
        <Footer />
    </div>
  </ConnectedRouter>
)

export default Routers;
