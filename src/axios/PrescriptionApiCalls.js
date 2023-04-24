import api from "./AuthApi";
import axios from "axios";

export function getPrescriptionDetails(Id, source) {
    return api.get(`/Prescription/details/${Id}`, {
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
    await api.post(`/Prescription?ID_Wizyta=${Id}&Zalecenia=${zalecenia}`, {
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
    await api.put(`/Prescription/${Id}?Zalecenia=${zalecenia}`, {
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
    await api.delete(`/Prescription/${Id}`, {
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
    return api.get(`/PrescriptionMedicament/${Id}`, {
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
    await api.post(`/PrescriptionMedicament?ID_Recepta=${idRecepta}&ID_Lek=${idLek}&Ilosc=${ilosc}`, {
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
    await api.delete(`/PrescriptionMedicament/${idRecepta}/${idLek}`, {
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
    return api.get(`/Prescription/moje_recepty`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}