import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../constants";
import { addError, removeError } from "./errors";
import { addCookie, removeCookie } from './cookie';

// an action module
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

// dispatch method to dispatch action to reducer
export const authUser = (type, userData) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall("post", `/api/user/${type}`, userData)
        .then(({token, ...user}) => {
            const cookie = document.cookie;
            setAuthorizationToken(cookie.split("=")[1]);
            dispatch(addCookie(cookie));
            dispatch(setCurrentUser(user));
            dispatch(removeError());
            resolve();
        })
        .catch(err => {
            dispatch(addError(err.message));
            reject();
        });
    });
}

export const logOut = () => dispatch => {
    setAuthorizationToken();
    dispatch(removeCookie());
    dispatch(setCurrentUser({}));
}
