import api from "./AuthApi";
import axios from "axios";

export function getVisitServiceList(id, source) {
    return api.get(`/VisitService/${id}`, {
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
    await api.post(`/VisitService/${idVisit}/${idService}`, {
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
    await api.put(`/VisitService/accept/${idVisit}`, {
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
    await api.delete(`/VisitService/${idVisit}/${idService}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}