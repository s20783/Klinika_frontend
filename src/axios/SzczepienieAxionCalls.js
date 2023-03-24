import api from "./AuthApi";
import axios from "axios";

export function getSzczepienieList(id,source) {
    return api.get(`/Szczepienie/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getSzczepienieDetails(Id,source) {
    return api.get(`/Szczepienie/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addSzczepienie(szczepienie,source) {
    const szczepienieString = JSON.stringify(szczepienie)
    await api.post(`/Szczepienie`, szczepienieString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateSzczepienie(szczepienie, id,source) {
    const szczepienieString = JSON.stringify(szczepienie)
    await api.put(`/Szczepienie/${id}`, szczepienieString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteSzczepienie(Id,source) {
    await api.delete(`/Szczepienie/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}