import api from "./AuthApi";
import axios from "axios";

export async function addDiseaseMedicament(IdChoroba, IdLek, source) {
    await api.post(`/ChorobaLek/${IdChoroba}/${IdLek}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteDiseaseMedicament(IdChoroba, IdLek, source) {
    await api.delete(`/ChorobaLek/${IdChoroba}/${IdLek}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}