import React from 'react';
import signupPage from './components/signupPage';

const signupRouter = {
    path: '/signup',
    exact: true,
    component: signupPage,
    thunk: () => {}
}

export default signupRouter;
