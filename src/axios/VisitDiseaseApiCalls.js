import api from "./AuthApi";
import axios from "axios";

export function getVisitDiseaseList(id, source){
    return api.get(`/VisitDisease/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVisitDisease(idVisit, idDisease, source){
    await api.post(`/VisitDisease/${idVisit}/${idDisease}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVisitDisease(idVisit, idDisease, source){
    await api.delete(`/VisitDisease/${idVisit}/${idDisease}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}