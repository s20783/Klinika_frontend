import api from "./AuthApi";
import axios from "axios";

export function getVisitServiceList(id, source) {
    return api.get(`/WizytaUsluga/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVisitService(idVisit, idService, source) {
    await api.post(`/WizytaUsluga/${idVisit}/${idService}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function acceptVisitServices(idVisit, source) {
    await api.put(`/WizytaUsluga/accept/${idVisit}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVisitService(idVisit, idService, source) {
    await api.delete(`/WizytaUsluga/${idVisit}/${idService}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}