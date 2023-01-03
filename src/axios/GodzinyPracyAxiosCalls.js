import api from "./Api";
import axios from "axios";

const godzinyPracyURL = 'http://localhost:36989/api/GodzinyPracy';

export function getGodzinyPracyList(id,source) {
    return api.get(`${godzinyPracyURL}/list/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}

export function getKontoGodzinyPracyList(source) {
    return api.get(`${godzinyPracyURL}/moje_godziny`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addGodzinyPracy(idVet, dane,source) {
    const patientString = JSON.stringify(dane)
    await api.post(`${godzinyPracyURL}/${idVet}`, patientString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addDomyslneGodzinyPracy(idVet, source) {
    await api.post(`${godzinyPracyURL}/default/${idVet}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function editGodzinyPracy(idVet, dane,source) {
    const patientString = JSON.stringify(dane)
    await api.put(`${godzinyPracyURL}/${idVet}`, patientString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteGodzinyPracy(id, dzien,source ) {
    await api.delete(`${godzinyPracyURL}/${id}?dzien=${dzien}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
