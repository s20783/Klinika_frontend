import api from "./Api";
import axios from "axios";

export async function loginCall(user) {
    const userString = JSON.stringify(user)
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:36989/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await axiosInstance.post('/Konto/login', userString);
}

export function getKontoData(source) {
    return api.get('/Konto',{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function changePassword(user) {
    const userString = JSON.stringify(user)
    await api.put('/Konto/password', userString);
}

export async function changeDaneKonta(user) {
    const userString = JSON.stringify(user)
    return await api.put('/Konto', userString);
}