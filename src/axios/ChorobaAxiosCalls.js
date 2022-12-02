import api from "./Api";

export function getChorobaList() {
    return api.get('/Choroba');
}

export function getChorobaDetails(Id) {
    return api.get(`/Choroba/${Id}`);
}

export async function addChoroba(choroba) {
    const chorobaString = JSON.stringify(choroba)
    await api.post(`/Choroba`, chorobaString)
}

export async function updateChoroba(choroba, Id) {
    const chorobaString = JSON.stringify(choroba)
    await api.put(`/Choroba/${Id}`, chorobaString)
}

export async function deleteChoroba(Id) {
    await api.delete(`/Choroba/${Id}`);
}