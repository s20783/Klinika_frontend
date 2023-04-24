import api from "./AuthApi";
import axios from "axios";

export function getMedicamentList(searchWord, page, source) {
    return api.get(`/Medicament?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getOnlyMedicamentList(source) {
    return api.get(`/Medicament/only`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getMedicamentDetails(Id, source) {
    return api.get(`/Medicament/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addMedicament(lek, source) {
    const lekString = JSON.stringify(lek)
    await api.post(`/Medicament`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateMedicament(data, Id, source) {
    const lekString = JSON.stringify(data)
    await api.put(`/Medicament/${Id}`, lekString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteMedicament(Id, source) {
    await api.delete(`/Medicament/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
