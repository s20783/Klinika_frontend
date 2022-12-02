import api from "./Api";

export function getUrlopList(Id) {
    return api.get(`/Urlop/${Id}`);
}

export function getUrlopDetails(Id) {
    return api.get(`/Urlop/details/${Id}`);
}

export function getKontoUrlopList() {
    return api.get(`/Urlop/moje_urlopy`);
}

export async function addUrlop(urlop) {
    const urlopString = JSON.stringify(urlop)
    await api.post(`/Urlop`, urlopString)
}

export async function editUrlop(urlop, Id) {
    const urlopString = JSON.stringify(urlop)
    await api.put(`/Urlop/${Id}`, urlopString)
}

export async function deleteUrlop(Id) {
    await api.delete(`/Urlop/${Id}`);
}