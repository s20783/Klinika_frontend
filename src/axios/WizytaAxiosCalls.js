import api from "./Api";

export function getWizytaList() {
    return api.get(`/Wizyta`);
}

export function getKlientWizytaListForDetails(Id){
    return api.get(`/Wizyta/${Id}`);
}

export function getPacjentWizytaList(Id) {
    return api.get(`/Wizyta/pacjent/${Id}`);
}

export function getKlientWizytaList() {
    return api.get(`/Wizyta/moje_wizyty`);
}

export function getWizytaDetails(Id){
    return api.get(`/Wizyta/details/${Id}`);
}

export async function umowWizyte(data){
    const dataString = JSON.stringify(data)
    await api.post('/Wizyta/umowWizyte', dataString);
}
export async function updateWizyta(idWizyta, data){
    const dataString = JSON.stringify(data)
    await api.put(`/Wizyta/${idWizyta}`, dataString);
}