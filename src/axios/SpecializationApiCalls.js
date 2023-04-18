import api from "./AuthApi";
import axios from "axios";

export function getSpecializationList(searchWord, page, source) {
    return api.get(`/Specjalizacja?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getAllSpecializations(source) {
    return api.get(`/Specjalizacja/all`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getSpecializationDetails(id, source) {
    return api.get(`/Specjalizacja/details/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addSpecialization(data, source) {
    const specializationString = JSON.stringify(data)
    await api.post(`/Specjalizacja`, specializationString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateSpecialization(data, id, source) {
    const specializationString = JSON.stringify(data)
    await api.put(`/Specjalizacja/${id}`, specializationString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteSpecialization(id, source) {
    await api.delete(`/Specjalizacja/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}