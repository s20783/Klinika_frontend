import api from "./Api";
const lekURL = 'http://localhost:36989/api/Lek';

export function getLekList() {
    return api.get(lekURL);
}
export function getOnlyLekList() {
    return api.get(`${lekURL}/lekOnly`);
}
export function getLekDetails(Id) {
    return api.get(`${lekURL}/${Id}`);
}

export async function addLek(lek) {
    const lekString = JSON.stringify(lek)
    await api.post(`${lekURL}`, lekString)
}

export async function updateLek(lek, Id) {
    const lekString = JSON.stringify(lek)
    await api.put(`${lekURL}/${Id}`, lekString)
}
export async function deleteLek(Id) {
    await api.delete(`${lekURL}/${Id}`);
}
