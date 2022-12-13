import api from "./Api";

export function getChorobaWizytaList(Id){
    return api.get(`/WizytaChoroba/${Id}`);
}
export async function addChorobaWizyta(idWizyta, idChoroba){
    await api.post(`/WizytaChoroba/${idWizyta}/${idChoroba}`);
}
export async function deleteChorobaWizyta(idWizyta, idChoroba){
    await api.delete(`/WizytaChoroba/${idWizyta}/${idChoroba}`);
}