import api from "./AuthApi";
import axios from "axios";

export function getChorobaWizytaList(Id,source){
    return api.get(`/WizytaChoroba/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addChorobaWizyta(idWizyta, idChoroba,source){
    await api.post(`/WizytaChoroba/${idWizyta}/${idChoroba}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteChorobaWizyta(idWizyta, idChoroba,source){
    await api.delete(`/WizytaChoroba/${idWizyta}/${idChoroba}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}