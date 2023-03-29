import api from "./AuthApi";
import axios from "axios";

export function getPacjentList(searchWord, page, source) {
    return api.get(`/Pacjent?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getPacjentDetails(Id,source) {
    return api.get(`/Pacjent/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientPacjentList(Id,source) {
    return api.get(`/Pacjent/klient/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientPacjentList2(source) {
    return api.get(`/Pacjent/klient`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addPacjent(patient,source) {
    const patientString = JSON.stringify(patient)
    await api.post('/Pacjent', patientString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}

export async function updatePacjent(patient, idPacjent,source) {
    const patientString = JSON.stringify(patient)
    await api.put(`/Pacjent/${idPacjent}`, patientString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deletePacjent(idPacjent,source) {
    await api.delete(`/Pacjent/${idPacjent}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}