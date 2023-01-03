import api from "./Api";
import axios from "axios";
const harmonogramURL = 'http://localhost:36989/api/Harmonogram';

export function getHarmonogramWizyta(Date,source) {
    return api.get(`${harmonogramURL}?date=${Date}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getHarmonogramVet(idVet, Date,source) {
    return api.get(`${harmonogramURL}/klinika/${idVet}?Date=${Date}`, {
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
    return api.get(`${harmonogramURL}/klinika?date=${Date}`, {
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

    await api.post(`${harmonogramURL}/auto`, {
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
   await api.put(`${harmonogramURL}/auto` , {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}