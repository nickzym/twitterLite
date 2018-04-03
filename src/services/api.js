import axios from "axios";

// return a new promise
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        // const config = method === 'post' ? { headers: {'Content-Type': 'multipart/form-data'} } : {};
        return axios[method](path, data)
        .then(res => {
            if(res.data.error) {
                return reject(res.data.error);
            } else {
                return resolve(res.data);
            }
        })
        .catch(err => {
            return reject(err.response.data.error);
        });
    });
}
