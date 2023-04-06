import api from "./AuthApi";
import axios from "axios";

export function getWeterynarzList(searchWord, page, source) {
    return api.get(`/Weterynarz?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getWeterynarzDetails(Id,source) {
    return  api.get(`/Weterynarz/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addWeterynarz(weterynarz,source) {
    const weterynarzString = JSON.stringify(weterynarz)
    return await api.post('/Weterynarz', weterynarzString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateWeterynarz(weterynarz, idWeterynarz,source) {
    const weterynarzString = JSON.stringify(weterynarz)
    await api.put(`/Weterynarz/${idWeterynarz}`, weterynarzString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteWeterynarz(idWeterynarz,source) {
    await api.delete(`/Weterynarz/${idWeterynarz}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}