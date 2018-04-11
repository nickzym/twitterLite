import React from 'react';
import profilePage from './components/profilePage';

const profileRouter = {
    path: '/profile',
    exact: true,
    component: profilePage,
    thunk: () => {}
}

export default profileRouter;
