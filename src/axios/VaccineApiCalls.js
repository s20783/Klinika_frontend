import api from "./AuthApi";
import axios from "axios";

export function getVaccineList(searchWord, page, source) {
    return api.get(`/Szczepionka?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getAllVaccines(source) {
    return api.get(`/Szczepionka/all`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getVaccineDetails(id, source) {
    return api.get(`/Szczepionka/details/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addVaccine(data, source) {
    const szczepionkaString = JSON.stringify(data)
    await api.post(`/Szczepionka`, szczepionkaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateVaccine(data, id, source) {
    const szczepionkaString = JSON.stringify(data)
    await api.put(`/Szczepionka/${id}`, szczepionkaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteVaccine(id, source) {
    await api.delete(`/Szczepionka/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}