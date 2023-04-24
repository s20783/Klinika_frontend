import authApi from "./AuthApi";
import api from "./Api";
import axios from "axios";

export async function loginCall(user,source) {
    const userString = JSON.stringify(user)
    return api.post('/Account/login', userString,{
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

export function getAccountData(source) {
    return authApi.get('/Account',{
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
    await authApi.put('/Account/password', userString,{
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

export async function changeAccountInfo(user, source) {
    const userString = JSON.stringify(user)
    return await authApi.put('/Account', userString,{
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