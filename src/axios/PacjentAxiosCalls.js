import api from "./Api";

export function getPacjentList() {
    return api.get('/Pacjent');
}

export function getPacjentDetails(Id) {
    return api.get(`/Pacjent/details/${Id}`);
}

export function getKlientPacjentList(Id) {
    return api.get(`/Pacjent/klient/${Id}`);
}

export async function addPacjent(patient) {
    const patientString = JSON.stringify(patient)
    await api.post('/Pacjent', patientString);
}

export async function updatePacjent(patient, idPacjent) {
    const patientString = JSON.stringify(patient)
    await api.put(`/Pacjent/${idPacjent}`, patientString);
}

export async function deletePacjent(idPacjent) {
    await api.delete(`/Pacjent/${idPacjent}`);
}