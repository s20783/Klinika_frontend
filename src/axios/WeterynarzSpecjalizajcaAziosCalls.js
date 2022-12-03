import api from "./Api";

export function getWeterynarzSpecjalizacjaList(Id) {
    return api.get(`/WeterynarzSpecjalizacja/${Id}`);

}
export async function addWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz) {
    await api.post(`/WeterynarzSpecjalizacja/${idSpecjalizacja}/${idWeterynarz}`);
}

export async function deleteWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz) {
    await api.delete(`/WeterynarzSpecjalizacja/${idSpecjalizacja}/${idWeterynarz}`);
}