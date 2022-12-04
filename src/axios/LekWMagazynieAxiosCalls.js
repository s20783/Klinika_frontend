import api from "./Api";

const lekURL = 'http://localhost:36989/api/LekWMagazynie';


export function getLekMagazyn(Id) {
    return api.get(`${lekURL}/${Id}`);
}

export async function addLekMagazyn(IdLek, lek) {
    const lekString = JSON.stringify(lek)
    await api.post(`${lekURL}/${IdLek}`, lekString)
}

export async function updateLekMagazyn(lek, Id) {
    const lekString = JSON.stringify(lek)
    await api.put(`${lekURL}/${Id}`, lekString)
}

export async function deleteLekMagazyn(Id) {
    await api.delete(`${lekURL}/${Id}`);
}
