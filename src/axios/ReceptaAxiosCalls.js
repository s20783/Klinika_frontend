import api from "./Api";

export function getReceptaDetails(Id) {
    return api.get(`/Recepta/details/${Id}`);
}
export async function addRecepta(Id, zalecenia) {
    await api.post(`/Recepta?ID_Wizyta=${Id}&Zalecenia=${zalecenia}`)
}

export async function updateRecepta(Id, zalecenia) {
    await api.put(`/Recepta/${Id}?Zalecenia=${zalecenia}`)
}
export async function deleteRecepta(Id) {
    await api.delete(`/Recepta/${Id}`)
}

//ReceptaLeki

export function getReceptaLeki(Id) {
    return api.get(`/ReceptaLek/${Id}`);
}
export async function addReceptaLek(idRecepta, idLek, ilosc) {
    await api.post(`/ReceptaLek?ID_Recepta=${idRecepta}&ID_Lek=${idLek}&Ilosc=${ilosc}`)
}
export async function deleteReceptaLek(idRecepta, idLek) {
    await api.delete(`/ReceptaLek/${idRecepta}/${idLek}`)
}

//kontoRecepta
export function getMojeRecepty(Id) {
    return api.get(`/Recepta/moje_recepty`);
}