import api from "./Api";
import axios from "axios";

export async function loginCall(user,source) {
    const userString = JSON.stringify(user)
    const axiosInstance = axios.create({
        baseURL: 'https://petmedapi.azurewebsites.net/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return axiosInstance.post('/Konto/login', userString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            throw new Error(thrown.response.data.message)
        }
    })
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

export async function changePassword(user,source) {
    const userString = JSON.stringify(user)
    await api.put('/Konto/password', userString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            throw new Error(thrown.response.data.message)
        }
    })
}

export async function changeDaneKonta(user, source) {
    const userString = JSON.stringify(user)
    return await api.put('/Konto', userString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            throw new Error(thrown.response.data.message)
        }
    })
}