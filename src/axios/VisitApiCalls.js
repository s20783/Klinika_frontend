import api from "./AuthApi";
import axios from "axios";

export function getWizytaList(searchWord, page, source) {
    return api.get(`/Wizyta?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientWizytaListForDetails(Id,source){
    return api.get(`/Wizyta/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getPacjentWizytaList(Id,source) {
    return api.get(`/Wizyta/pacjent/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientWizytaList(source) {
    return api.get(`/Wizyta/moje_wizyty`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getWizytaDetails(Id,source){
    return api.get(`/Wizyta/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function umowWizyte(data,source){
    const dataString = JSON.stringify(data)
    await api.post('/Wizyta/umowWizyte', dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function updateWizyta(idWizyta, data, source){
    const dataString = JSON.stringify(data)
    await api.put(`/Wizyta/${idWizyta}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function przelozWizyte(idWizyta, data, source){
   const dataString = JSON.stringify(data)
    await api.put(`/Wizyta/przeloz/${idWizyta}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            console.log(thrown)
            throw new Error(thrown)
        }
    })
}
export function odwolajWizyte(IdWizyta,idOsoba, source){
    return api.delete(`/Wizyta/${IdWizyta}?ID_klient=${idOsoba}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}