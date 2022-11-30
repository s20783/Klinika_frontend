import api from "./Api";

export function getPacjentListAxios() {
    return api.get('/Pacjent');
}

export function getPacjentDetailsAxios(Id) {
    return api.get(`/Pacjent/details/${Id}`);
}