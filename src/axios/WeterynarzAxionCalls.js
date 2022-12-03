import api from "./Api";
import axios from "axios";

export function getWeterynarzList() {
    return api.get('/Weterynarz');
}
export function getWeterynarzDetails(Id) {
    return api.get(`/Weterynarz/${Id}`);
}
export async function addWeterynarz(weterynarz) {
    const patientString = JSON.stringify(weterynarz)
    await api.post('/Weterynarz', patientString);
}

export async function updateWeterynarz(weterynarz, idWeterynarz) {
    const patientString = JSON.stringify(weterynarz)
    await api.put(`/Weterynarz/${idWeterynarz}`, patientString);
}

export async function deleteWeterynarz(idWeterynarz) {
    await api.delete(`/Weterynarz/${idWeterynarz}`);
}