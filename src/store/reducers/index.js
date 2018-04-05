import { combineReducers } from 'redux';
import {HomeReducer} from '../../pages/home/reducer';
import currentUser from './currentUser';
import errors from './errors';
import twittes from './twittes';
import { routerReducer } from 'react-router-redux';
// 这里这个Reducer名称对应到全局state的命名空间（如 state.HomeReducer)
export default combineReducers({
  router:routerReducer,
  currentUser,
  errors,
  twittes
})
