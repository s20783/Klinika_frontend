import api from "./AuthApi";
import axios from "axios";

export function getMedicamentWarehouse(Id, source) {
    return api.get(`/LekWMagazynie/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addMedicamentWarehouse(IdLek, data, source) {
    const dataString = JSON.stringify(data)
    await api.post(`/LekWMagazynie/${IdLek}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateMedicamentWarehouse(data, Id, source) {
    const dataString = JSON.stringify(data)
    await api.put(`/LekWMagazynie/${Id}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteMedicamentWarehouse(Id, source) {
    await api.delete(`/LekWMagazynie/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
