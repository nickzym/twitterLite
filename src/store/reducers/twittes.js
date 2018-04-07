import { LOAD_TWITTES, REMOVE_TWITTE } from '../constants';

const twittes = (state = [], action) => {
    switch (action.type) {
        case LOAD_TWITTES:
            return [...action.twittes];
            break;
        case REMOVE_TWITTE:
            return [...action.twittes];
            break;
        default:
            return state;
    }
}

export default twittes;
