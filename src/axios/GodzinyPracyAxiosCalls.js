import api from "./Api";
import axios from "axios";

export function getGodzinyPracyList(id,source) {
    return api.get(`/GodzinyPracy/list/${id}`, {
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
    return api.get(`/GodzinyPracy/moje_godziny`, {
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
    await api.post(`/GodzinyPracy/${idVet}`, patientString, {
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
    await api.post(`/GodzinyPracy/default/${idVet}`, {
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
    await api.put(`/GodzinyPracy/${idVet}`, patientString, {
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
    await api.delete(`/GodzinyPracy/${id}?dzien=${dzien}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
