import api from "./Api";
import axios from "axios";

export function getSpecjalizacjaList(source) {
    return api.get('/Specjalizacja', {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getSpecjalizacjaDetails(Id,source) {
    return api.get(`/Specjalizacja/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addSpecjalizacja(specjalizacja,source) {
    const specjalizacjaString = JSON.stringify(specjalizacja)
    await api.post(`/Specjalizacja`, specjalizacjaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateSpecjalizacja(specjalizacja, Id,source) {
    const specjalizacjaString = JSON.stringify(specjalizacja)
    await api.put(`/Specjalizacja/${Id}`, specjalizacjaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteSpecjalizacja(Id,source) {
    await api.delete(`/Specjalizacja/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}