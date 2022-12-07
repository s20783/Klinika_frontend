import api from "./Api";

export function getWeterynarzList() {
    return api.get('/Weterynarz');
}
export function getWeterynarzDetails(Id) {
    return  api.get(`/Weterynarz/${Id}`);
}
export async function addWeterynarz(weterynarz) {
    const weterynarzString = JSON.stringify(weterynarz)
    return await api.post('/Weterynarz', weterynarzString);
}

export async function updateWeterynarz(weterynarz, idWeterynarz) {
    const weterynarzString = JSON.stringify(weterynarz)
    await api.put(`/Weterynarz/${idWeterynarz}`, weterynarzString);
}

export async function deleteWeterynarz(idWeterynarz) {
    await api.delete(`/Weterynarz/${idWeterynarz}`);
}