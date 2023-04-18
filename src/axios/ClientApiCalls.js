import authApi from "./AuthApi";
import axios from "axios";
import api from "./Api";

export function getAllClients(source) {
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

export function getClientList(searchWord, page, source) {
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

export function getClientDetails(Id, source) {
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

export async function addClient(klient, source) {
    const clientString = JSON.stringify(klient)
    await authApi.post('/Klient/Klinika', clientString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}

export async function registerClient(user, source) {
    const userString = JSON.stringify(user)
    await api.post('/Klient', userString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function deleteClientAccount(source) {
    return authApi.delete(`/Klient`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}

export function deleteClientAccountByAdmin(id, source){
    return authApi.delete(`/Klient/admin/${id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}