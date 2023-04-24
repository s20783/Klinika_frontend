import api from "./AuthApi";
import axios from "axios";

export function getVaccinationList(id, source) {
    return api.get(`/Vaccination/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getVaccinationDetails(id, source) {
    return api.get(`/Vaccination/details/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVaccination(data, source) {
    const vaccinationString = JSON.stringify(data)
    await api.post(`/Vaccination`, vaccinationString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateVaccination(data, id, source) {
    const vaccinationString = JSON.stringify(data)
    await api.put(`/Vaccination/${id}`, vaccinationString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVaccination(id, source) {
    await api.delete(`/Vaccination/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}