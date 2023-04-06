import authApi from "./AuthApi";
import axios from "axios";
import api from "./Api";

export function getAllKlientList(source) {
    return authApi.get(`/Klient/all`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientList(searchWord, page, source) {
    return authApi.get(`/Klient?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientDetails(Id, source) {
    return authApi.get(`/Klient/${Id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}

export async function addKlient(klient,source) {
    const klientString = JSON.stringify(klient)
    await authApi.post('/Klient/Klinika', klientString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}

export async function registerCall(user,source) {
    const userString = JSON.stringify(user)
    await api.post('/Klient', userString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            console.log(thrown.response.data)
            throw new Error(thrown.response.data)
        }
    })
}

export function deleteKlientKonto(source) {
    return authApi.delete(`/Klient`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
        console.log(thrown.response.data)
            throw new Error(thrown.response.data.message)
        }
    });
}

export function deleteKlientKontoByAdmin(id,source){
    return authApi.delete(`/Klient/admin/${id}`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            console.log(thrown.response.data)
            throw new Error(thrown.response.data.message)
        }
    });
}