import {getCurrentUser} from "../components/helpers/authHelper";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://klinika-petmedapi.azurewebsites.net/api'
    //baseURL: 'http://localhost:36989/api'
});

instance.interceptors.request.use(
    async config => {
        const user = getCurrentUser()
        let token
        if (user && user.Token) {
            token = user.Token
        }
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });

instance.interceptors.response.use(resp => resp, async error => {
    const originalConfig = error.config;
    if(error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true
            const user = getCurrentUser()

            var refreshToken = {
                RefreshToken: user.RefreshToken
            }

            const response = await instance.post('/Konto/refresh', JSON.stringify(refreshToken));
            console.log(response)
            if (response.status === 200) {
                user.Token = response.data['accessToken']
                localStorage.setItem("user", JSON.stringify(user))
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data['accessToken'];

                return instance(error.config);
            }
        }
    await Promise.reject(error);
    }
});

export default instance;