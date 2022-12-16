import api from "./Api";

export function getLekWizytaList(Id){
    return api.get(`/WizytaLek/${Id}`);
}
export async function addLekWizyta(idWizyta, idLek, ilosc){
    await api.post(`/WizytaLek/${idWizyta}/${idLek}?Ilosc=${ilosc}`);
}
export async function deleteLekWizyta(idWizyta, idLek){
     await api.delete(`/WizytaLek/${idWizyta}/${idLek}`);
}