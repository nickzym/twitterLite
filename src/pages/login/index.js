import React from 'react';
import loginPage from './components/loginPage';

const loginRouter = {
    path: '/login',
    exact: true,
    component: loginPage,
    thunk: () => {} 
}

export default loginRouter;
