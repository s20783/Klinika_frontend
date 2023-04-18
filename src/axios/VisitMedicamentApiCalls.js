import api from "./AuthApi";
import axios from "axios";

export function getVisitMedicamentList(id, source) {
    return api.get(`/WizytaLek/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVisitMedicament(idVisit, idMedicament, count, source) {
    await api.post(`/WizytaLek/${idVisit}/${idMedicament}?Ilosc=${count}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVisitMedicament(idVisit, idMedicament, source) {
    await api.delete(`/WizytaLek/${idVisit}/${idMedicament}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}