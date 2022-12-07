import api from "./Api";

export function getSzczepienieList(id) {
    return api.get(`/Szczepienie/${id}`);
}

export function getSzczepienieDetails(Id) {
    return api.get(`/Szczepienie/details/${Id}`);
}

export async function addSzczepienie(szczepienie) {
    const szczepienieString = JSON.stringify(szczepienie)
    await api.post(`/Szczepienie`, szczepienieString)
}

export async function updateSzczepienie(szczepienie, id) {
    const szczepienieString = JSON.stringify(szczepienie)
    await api.put(`/Szczepienie/${id}`, szczepienieString)
}

export async function deleteSzczepienie(Id) {
    await api.delete(`/Szczepienie/${Id}`);
}