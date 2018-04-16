import React from 'react';
import TwitteInfoPage from './components/twitteInfoPage';

const twitteInfoRouter = {
    path: '/twitte_info',
    exact: true,
    component: TwitteInfoPage,
    thunk: () => {}
}

export default twitteInfoRouter;
