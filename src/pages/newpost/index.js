import React from 'react';
import newpostPage from './components/newpostPage';

const newpostRouter = {
    path: '/newpost',
    exact: true,
    component: newpostPage,
    thunk: () => {}
}

export default newpostRouter;
