import axios from "axios";

const instance = axios.create({
    baseURL: 'https://klinika-petmedapi.azurewebsites.net/api'
    //baseURL: 'http://localhost:36989/api'
});

instance.interceptors.request.use(
    async config => {
        config.headers = {
            'Content-Type': 'application/json'
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });

export default instance;