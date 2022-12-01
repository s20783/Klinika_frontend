import api from "./Api";

export function getKlientWizytaListForDetails(Id){
    return api.get(`/Wizyta/${Id}`);
}