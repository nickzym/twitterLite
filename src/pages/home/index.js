import React from 'react';
import {homeThunk} from '../../store/actions/thunk';
import HomeContainer from './containers/homeContainer';

const HomeRouter = {
    path: '/',
    exact: true,
    component: HomeContainer,
    // thunk: homeThunk // 服务端渲染会开启并执行这个action，用于获取页面渲染所需数据
}

export default HomeRouter
