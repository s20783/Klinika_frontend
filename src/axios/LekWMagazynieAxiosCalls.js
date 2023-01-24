import api from "./Api";
import axios from "axios";

const lekURL = 'http://localhost:36989/api/LekWMagazynie';


export function getLekMagazyn(Id,source) {
    return api.get(`/LekWMagazynie/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addLekMagazyn(IdLek, lek,source) {
    const lekString = JSON.stringify(lek)
    await api.post(`/LekWMagazynie/${IdLek}`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateLekMagazyn(lek, Id,source) {
    const lekString = JSON.stringify(lek)
    await api.put(`/LekWMagazynie/${Id}`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteLekMagazyn(Id,source) {
    await api.delete(`/LekWMagazynie/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
