import api from "./AuthApi";
import axios from "axios";

export function getUslugaList(source) {
    return api.get('/Usluga', {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getUslugaWizytaList(id,source) {
    return api.get(`/Usluga/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getUslugaDetails(Id,source) {
    return api.get(`/Usluga/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getUslugiPacjenta(Id,source) {
    return api.get(`/Usluga/pacjent/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addUsluga(usluga,source) {
    const uslugaString = JSON.stringify(usluga)
    await api.post('/Usluga', uslugaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateUsluga(usluga, Id,source) {
    const uslugaString = JSON.stringify(usluga)
    await api.put(`/Usluga/${Id}`, uslugaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteUsluga(Id,source) {
    await api.delete(`/Usluga/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}