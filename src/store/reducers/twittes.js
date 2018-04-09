import { LOAD_TWITTES, REMOVE_TWITTE, COMMENT_TWITTE } from '../constants';

const twittes = (state = [], action) => {
    switch (action.type) {
        case LOAD_TWITTES:
            return [...action.twittes];
            break;
        case REMOVE_TWITTE:
            return [...action.twittes];
            break;
        case COMMENT_TWITTE:
            return [...action.twittes];
        default:
            return state;
    }
}

export default twittes;
