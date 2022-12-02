import api from "./Api";

export function getSpecjalizacjaList() {
    return api.get('/Specjalizacja');
}

export function getSpecjalizacjaDetails(Id) {
    return api.get(`/Specjalizacja/details/${Id}`);
}

export async function addSpecjalizacja(specjalizacja) {
    const specjalizacjaString = JSON.stringify(specjalizacja)
    await api.post(`/Specjalizacja`, specjalizacjaString)
}

export async function updateSpecjalizacja(specjalizacja, Id) {
    const specjalizacjaString = JSON.stringify(specjalizacja)
    await api.put(`/Specjalizacja/${Id}`, specjalizacjaString)
}

export async function deleteSpecjalizacja(Id) {
    await api.delete(`/Specjalizacja/${Id}`);
}