import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_TWITTES, REMOVE_TWITTE } from '../constants';

export const loadTwittes = twittes => ({
    type: LOAD_TWITTES,
    twittes
});

export const fetchTwittes = (start, num) => dispatch => {
    return new Promise((resolve, rejectd) => {
        return apiCall('get', `/api/twitte/getAllTwittes?start=${start}&num=${num}`)
        .then(res => {
            dispatch(loadTwittes(res));
            resolve(res);
        })
        .catch(err => {
            addError(err.message);
        })
    })
}

export const postTwitte = twitte => dispatch => {
    return apiCall('post', '/api/twitte/create', twitte)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}
