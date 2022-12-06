import api from "./Api";


export async function addChorobaLek(IdChoroba, IdLek) {
    await api.post(`/ChorobaLek/${IdChoroba}/${IdLek}`);
}

export async function deleteChorobaLek(IdChoroba, IdLek) {
    await api.delete(`/ChorobaLek/${IdChoroba}/${IdLek}`);
}