import { ADD_COOKIE, REMOVE_COOKIE } from '../constants';

export default (state = {cookie: null}, action) => {
    switch (action.type) {
        case ADD_COOKIE:
            return { ...state, cookie: action.cookie};
        case REMOVE_COOKIE:
            return { ...state, cookie: null };
        default:
            return state;
    }
}
