import api from "./Api";


export async function addChorobaLek(IdChoroba, IdLek) {
    await api.post(`/WeterynarzSpecjalizacja/${IdChoroba}/${IdLek}`);
}

export async function deleteChorobaLek(IdChoroba, IdLek) {
    await api.delete(`/WeterynarzSpecjalizacja/${IdChoroba}/${IdLek}`);
}