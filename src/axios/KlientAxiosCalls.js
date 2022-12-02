import api from "./Api";
import axios from "axios";

export function getKlientList() {
    return api.get('/Klient');
}

export function getKlientDetails(Id) {
    return api.get(`/Klient/${Id}`);
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