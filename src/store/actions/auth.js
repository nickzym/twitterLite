import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../constants";
import { addError, removeError } from "./errors";
// an action module
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

// dispatch method to dispatch action to reducer
export const authUser = (type, userData) => dispatch => {
    return new Promise((resolve, reject) => {
        return apiCall("post", `/api/user/${type}`, userData)
        .then(({token, ...user}) => {
            localStorage.setItem("jwtToken", token);
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
