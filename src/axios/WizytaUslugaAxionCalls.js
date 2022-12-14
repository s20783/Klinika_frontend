import api from "./Api";

export function getUslugaWizytaList(Id){
    return api.get(`/WizytaUsluga/${Id}`);
}
export async function addUslugaWizyta(idWizyta, idUsluga){
    await api.post(`/WizytaUsluga/${idWizyta}/${idUsluga}`);
}
export async function deleteUslugaWizyta(idWizyta, idUsluga){
   // await api.delete(`/WizytaUsluga/${idWizyta}/${idUsluga}`);
}