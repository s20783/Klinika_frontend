import api from "./Api";

export function getUslugaList() {
    return api.get('/Usluga');
}
export function getUslugaWizytaList(id) {
    return api.get(`/Usluga/${id}`);
}
export function getUslugaDetails(Id) {
    return api.get(`/Usluga/details/${Id}`);
}

export async function addUsluga(usluga) {
    const uslugaString = JSON.stringify(usluga)
    await api.post('/Usluga', uslugaString);
}

export async function updateUsluga(usluga, Id) {
    const uslugaString = JSON.stringify(usluga)
    await api.put(`/Usluga/${Id}`, uslugaString);
}

export async function deleteUsluga(Id) {
    await api.delete(`/Usluga/${Id}`);
}