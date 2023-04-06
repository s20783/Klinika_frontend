import api from "./AuthApi";
import axios from "axios";

export function getWeterynarzSpecjalizacjaList(Id,source) {
    return api.get(`/WeterynarzSpecjalizacja/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}
export async function addWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz,source) {
    await api.post(`/WeterynarzSpecjalizacja/${idSpecjalizacja}/${idWeterynarz}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz,source) {
    await api.delete(`/WeterynarzSpecjalizacja/${idSpecjalizacja}/${idWeterynarz}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}