import api from "./Api";
import axios from "axios";


export function getKlientList(source) {
    return api.get('/Klient', {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getKlientDetails(Id, source) {
    return api.get(`/Klient/${Id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}
export async function addKlient(klient,source) {
    const klientString = JSON.stringify(klient)
    await api.post('/Klient/Klinika', klientString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}

export async function registerCall(user,source) {
    const userString = JSON.stringify(user)
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:36989/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await axiosInstance.post('/Klient', userString, {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }else {
            console.log(thrown.response.data)
            throw new Error(thrown.response.data)
        }
    })
}
export function deleteKlientKonto(source) {
    return api.delete(`/Klient`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    });
}