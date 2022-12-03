import api from "./Api";

const godzinyPracyURL = 'http://localhost:36989/api/GodzinyPracy';

export function getGodzinyPracyList(id) {
    return api.get(`${godzinyPracyURL}/list/${id}`);

}

export function getKontoGodzinyPracyList() {
    return api.get(`${godzinyPracyURL}/moje_godziny`);
}

export async function addGodzinyPracy(idVet, dane) {
    const patientString = JSON.stringify(dane)
    await api.post(`${godzinyPracyURL}/${idVet}`, patientString);
}

export async function addDomyslneGodzinyPracy(idVet) {
    await api.post(`${godzinyPracyURL}/default/${idVet}`);
}

export async function editGodzinyPracy(idVet, dane) {
    const patientString = JSON.stringify(dane)
    await api.put(`${godzinyPracyURL}/${idVet}`, patientString);
}

export async function deleteGodzinyPracy(id, dzien) {
    await api.delete(`${godzinyPracyURL}/${id}?dzien=${dzien}`);
}
