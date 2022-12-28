import api from "./Api";
import axios, { CancelToken } from "axios";

const cancelToken = CancelToken.source();

export function getKlientList() {
    return api.get('/Test/cancellation', {
        cancelToken: cancelToken.token
    })
}
export function cancelTokenFuncton() {
    cancelToken.cancel();
}
export function getKlientDetails(Id) {
    return api.get(`/Klient/${Id}`);
}
export async function addKlient(klient) {
    const klientString = JSON.stringify(klient)
    await api.post('/Klient/Klinika', klientString);
}

export async function registerCall(user) {
    const userString = JSON.stringify(user)
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:36989/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    await axiosInstance.post('/Klient', userString);
}