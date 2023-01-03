import api from "./Api";
import axios from "axios";

export function getSzczepionkaList(source) {
    return api.get('/Szczepionka', {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getSzczepionkaDetails(Id,source) {
    return api.get(`/Szczepionka/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addSzczepionka(szczepionka,source) {
    const szczepionkaString = JSON.stringify(szczepionka)
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

export async function updateSzczepionka(szczepionka, Id,source) {
    const szczepionkaString = JSON.stringify(szczepionka)
    await api.put(`/Szczepionka/${Id}`, szczepionkaString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function deleteSzczepionka(Id,source) {
    await api.delete(`/Szczepionka/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}