import api from "./AuthApi";
import axios from "axios";

export function getVisitList(searchWord, page, source) {
    return api.get(`/Visit?search=${searchWord}&page=${page}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getClientVisitListForDetails(id, source) {
    return api.get(`/Visit/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getPatientVisitList(id, source) {
    return api.get(`/Visit/pacjent/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getClientVisitList(source) {
    return api.get(`/Visit/moje_wizyty`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getVisitDetails(id, source) {
    return api.get(`/Visit/details/${id}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function createVisit(data, source) {
    const dataString = JSON.stringify(data)
    await api.post('/Visit/umowWizyte', dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function updateVisit(idVisit, data, source) {
    const dataString = JSON.stringify(data)
    await api.put(`/Visit/${idVisit}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function rescheduleVisit(idVisit, data, source) {
    const dataString = JSON.stringify(data)
    await api.put(`/Visit/przeloz/${idVisit}`, dataString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            console.log(thrown)
            throw new Error(thrown)
        }
    })
}

export function cancelVisit(idVisit, idClient, source) {
    return api.delete(`/Visit/${idVisit}?ID_klient=${idClient}`, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}