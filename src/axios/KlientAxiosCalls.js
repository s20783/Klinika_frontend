import api from "./Api";

export function getKlientListAxios() {
    return api.get('/Klient');
}