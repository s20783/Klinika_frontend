import api from "./AuthApi";
import axios from "axios";

export function getPrescriptionDetails(Id, source) {
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

export async function addPrescription(Id, zalecenia, source) {
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

export async function updatePrescription(Id, zalecenia, source) {
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

export async function deletePrescription(Id, source) {
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
export function getPrescriptionMedicaments(Id, source) {
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

export async function addPrescriptionMedicament(idRecepta, idLek, ilosc, source) {
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

export async function deletePrescriptionMedicament(idRecepta, idLek, source) {
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

export function getClientPrescriptions(source) {
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