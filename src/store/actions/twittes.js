import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_TWITTES, REMOVE_TWITTE, COMMENT_TWITTE } from '../constants';

export const loadTwittes = twittes => ({
    type: LOAD_TWITTES,
    twittes
});

export const removeTwitte = twittes => ({
    type: REMOVE_TWITTE,
    twittes
});

export const updateTwitte = twittes => ({
    type: COMMENT_TWITTE,
    twittes
})

const filterTwitte = (twittes, twitte) => {
    return twittes.filter((value) => {
        return value._id !== twitte._id
    });
}

const updateTwittes = (twittes, twitte) => {
    for (var i = 0; i < twittes.length; i++) {
        if (twittes[i]._id === twitte._id) {
            twittes[i] = twitte;
            break;
        }
    }
}

let storeTwittes = [];

export const fetchTwittes = (start, num, currentTwittes) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall('get', `/api/twitte/getAllTwittes?start=${start}&num=${num}`)
        .then(res => {
            const allTwittes = currentTwittes ? currentTwittes : [];
            storeTwittes = allTwittes;
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
        storeTwittes = allTwittes;
        dispatch(removeTwitte(leftTwittes));
    })
    .catch(err => {
        dispatch(addError(err.message));
        console.log(err);
    })
}

export const commentTwitte = (comment, currentTwittes) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall('post', '/api/twitte/comment', comment)
        .then(res => {
            updateTwittes(currentTwittes, res);
            storeTwittes = currentTwittes
            dispatch(updateTwitte(currentTwittes));
            resolve(res);
        })
        .catch(err => {
            console.log(err);
        })
    })
}

export const commentSingleTwitte = comment => {
    return new Promise((resolve, reject) => {
        return apiCall('post', '/api/twitte/comment', comment)
        .then(res => {
            updateTwittes(storeTwittes, res);
            resolve(res);
        })
        .catch(err => {
            console.log(err);
        })
    })
}
