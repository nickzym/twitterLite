import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_TWITTES, REMOVE_TWITTE } from '../constants';

export const loadTwittes = twittes => ({
    type: LOAD_TWITTES,
    twittes
});

export const removeTwitte = twittes => ({
    type: REMOVE_TWITTE,
    twittes
});

const filterTwitte = (twittes, twitte) => {
    return twittes.filter((value) => {
        return value._id !== twitte._id
    });
}

export const fetchTwittes = (start, num, currentTwittes) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall('get', `/api/twitte/getAllTwittes?start=${start}&num=${num}`)
        .then(res => {
            const allTwittes = currentTwittes ? currentTwittes : [];
            dispatch(loadTwittes(allTwittes.concat(res)));
            resolve(res);
        })
        .catch(err => {
            dispatch(addError(err.message));
            reject(err);
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

export const deleteTwitte = (twitte_id, userId, currentTwittes) => dispatch => {
    return apiCall('delete', `/api/twitte/delete?twitte_id=${twitte_id}&author=${userId}`)
    .then(res => {
        const leftTwittes = filterTwitte(currentTwittes, res);
        dispatch(removeTwitte(leftTwittes));
    })
    .catch(err => {
        dispatch(addError(err.message));
        console.log(err);
    })
}
