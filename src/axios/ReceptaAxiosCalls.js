import api from "./AuthApi";
import axios from "axios";

export function getReceptaDetails(Id,source) {
    return api.get(`/Recepta/details/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addRecepta(Id, zalecenia,source) {
    await api.post(`/Recepta?ID_Wizyta=${Id}&Zalecenia=${zalecenia}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateRecepta(Id, zalecenia,source) {
    await api.put(`/Recepta/${Id}?Zalecenia=${zalecenia}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteRecepta(Id,source) {
    await api.delete(`/Recepta/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

//ReceptaLeki
export function getReceptaLeki(Id,source) {
    return api.get(`/ReceptaLek/${Id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function addReceptaLek(idRecepta, idLek, ilosc,source) {
    await api.post(`/ReceptaLek?ID_Recepta=${idRecepta}&ID_Lek=${idLek}&Ilosc=${ilosc}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}
export async function deleteReceptaLek(idRecepta, idLek,source) {
    await api.delete(`/ReceptaLek/${idRecepta}/${idLek}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

//kontoRecepta
export function getMojeRecepty(source) {
    return api.get(`/Recepta/moje_recepty`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}