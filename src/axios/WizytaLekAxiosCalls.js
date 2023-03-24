import api from "./AuthApi";
import axios from "axios";

export function getLekWizytaList(Id,source){
    return api.get(`/WizytaLek/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addLekWizyta(idWizyta, idLek, ilosc,source){
    await api.post(`/WizytaLek/${idWizyta}/${idLek}?Ilosc=${ilosc}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteLekWizyta(idWizyta, idLek,source){
     await api.delete(`/WizytaLek/${idWizyta}/${idLek}`, {
         cancelToken: source.token
     }).then((response) => {
         return response
     }).catch(function (thrown) {
         if (axios.isCancel(thrown)) {
             console.log('Request canceled', thrown.message);
         }
     })
}