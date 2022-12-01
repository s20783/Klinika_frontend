import api from "./Api";

export function getKlientList() {
    return api.get('/Klient');
}

export function getKlientDetails(Id) {
    return api.get(`/Klient/${Id}`);
}