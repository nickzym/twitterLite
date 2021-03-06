import axios from "axios";

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
// return a new promise
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        // const config = method === 'post' ? { headers: {'Content-Type': 'multipart/form-data'} } : {};
        axios[method](path, data)
        .then(res => {
            if(res.data.error) {
                reject(res.data.error);
            } else {
                resolve(res.data);
            }
        })
        .catch(err => {
            reject(err.response.data.error);
        });
    });
}
