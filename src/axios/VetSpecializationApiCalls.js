import api from "./AuthApi";
import axios from "axios";

export function getVetSpecializationList(id, source) {
    return api.get(`/VetSpecialization/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVetSpecialization(idSpecjalizacja, idWeterynarz, source) {
    await api.post(`/VetSpecialization/${idSpecjalizacja}/${idWeterynarz}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVetSpecialization(idSpecjalizacja, idWeterynarz, source) {
    await api.delete(`/VetSpecialization/${idSpecjalizacja}/${idWeterynarz}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}