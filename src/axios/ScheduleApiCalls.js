import api from "./AuthApi";
import axios from "axios";

export function getHarmonogramWizyta(Date, source) {
    return api.get(`/Harmonogram?date=${Date}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getHarmonogramVet(idVet, Date, source) {
    return api.get(`/Harmonogram/klinika/${idVet}?Date=${Date}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getHarmonogram(Date, source) {
    return api.get(`/Harmonogram/klinika?date=${Date}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addHarmonogram(source) {
    await api.post(`/Harmonogram/auto`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateHarmonogram(source) {
    await api.put(`/Harmonogram/auto`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}