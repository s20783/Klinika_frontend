import api from "./Api";
import axios from "axios";
const lekURL = 'http://localhost:36989/api/Lek';

export function getLekList(source) {
    return api.get(lekURL, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getOnlyLekList(source) {
    return api.get(`${lekURL}/lekOnly`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export function getLekDetails(Id,source) {
    return api.get(`${lekURL}/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addLek(lek,source) {
    const lekString = JSON.stringify(lek)
    await api.post(`${lekURL}`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateLek(lek, Id,source) {
    const lekString = JSON.stringify(lek)
    await api.put(`${lekURL}/${Id}`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteLek(Id,source) {
    await api.delete(`${lekURL}/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
