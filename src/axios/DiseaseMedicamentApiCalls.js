import api from "./AuthApi";
import axios from "axios";

export async function addDiseaseMedicament(IdChoroba, IdLek, source) {
    await api.post(`/DiseaseMedicament/${IdChoroba}/${IdLek}`, {
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
    await api.delete(`/DiseaseMedicament/${IdChoroba}/${IdLek}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}