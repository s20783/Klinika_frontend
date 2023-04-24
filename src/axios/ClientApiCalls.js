import authApi from "./AuthApi";
import axios from "axios";
import api from "./Api";

export function getAllClients(source) {
    return authApi.get(`/Client/all`, {
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
    return authApi.get(`/Client?search=${searchWord}&page=${page}`, {
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
    return authApi.get(`/Client/${Id}`,{
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
    await authApi.post('/Client/Klinika', clientString,{
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
    await api.post('/Client', userString, {
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
    return authApi.delete(`/Client`,{
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
    return authApi.delete(`/Client/admin/${id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}