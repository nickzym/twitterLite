import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableTimeline = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ "./containers/timelineContainer.js"),
  loading: Loading
});

const timelineRouter = {
  path: "/timeline",
  component: LoadableTimeline,
  thunk: () => {}
};

export default timelineRouter;
