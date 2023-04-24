import api from "./AuthApi";
import axios from "axios";

export function getWorkingHoursList(id, source) {
    return api.get(`/WorkingHours/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getAccountWorkingHoursList(source) {
    return api.get(`/WorkingHours/moje_godziny`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addWorkingHours(idVet, data, source) {
    const dataString = JSON.stringify(data)
    await api.post(`/WorkingHours/${idVet}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addDefaultWorkingHours(idVet, source) {
    await api.post(`/WorkingHours/default/${idVet}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function editWorkingHours(idVet, data, source) {
    const dataString = JSON.stringify(data)
    await api.put(`/WorkingHours/${idVet}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteWorkingHours(id, day, source) {
    await api.delete(`/WorkingHours/${id}?day=${day}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
