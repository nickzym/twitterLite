import React from 'react';
import NewpostPage from './components/newpostPage';

const newpostRouter = {
    path: '/newpost',
    exact: true,
    component: NewpostPage,
    thunk: () => {}
}

export default newpostRouter;
