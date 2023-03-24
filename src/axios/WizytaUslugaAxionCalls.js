import api from "./AuthApi";
import axios from "axios";

export function getUslugaWizytaList(Id,source){
    return api.get(`/WizytaUsluga/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addUslugaWizyta(idWizyta, idUsluga,source){
    await api.post(`/WizytaUsluga/${idWizyta}/${idUsluga}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function acceptUslugaWizyta(idWizyta,source){
    await api.put(`/WizytaUsluga/accept/${idWizyta}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteUslugaWizyta(idWizyta, idUsluga,source){
    await api.delete(`/WizytaUsluga/${idWizyta}/${idUsluga}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}