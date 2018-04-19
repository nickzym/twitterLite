import { ADD_COOKIE, REMOVE_COOKIE } from "../constants";

export const addCookie = cookie => ({
    type: ADD_COOKIE,
    cookie
});

export const removeCookie = () => ({
    type: REMOVE_COOKIE
});
