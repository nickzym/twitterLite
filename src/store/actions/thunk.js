import {getHomeInfo} from './home';
import { setAuthorizationToken, setCurrentUser } from './auth';
import jwtDecode from 'jwt-decode';

export const homeThunk = store => {
    console.log("hahah");
    if(typeof localStorage !== 'undefined' && localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken);
        // prevent someone from manually tempering with the ky of jwtToken in localStorage
        try {
            store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
        } catch (err) {
            store.dispatch(setCurrentUser({}));
        }
    }
}
