import api from "./Api";

export function getSzczepionkaList() {
    return api.get('/Szczepionka');
}

export function getSzczepionkaDetails(Id) {
    return api.get(`/Szczepionka/details/${Id}`);
}

export async function addSzczepionka(szczepionka) {
    const szczepionkaString = JSON.stringify(szczepionka)
    await api.post(`/Szczepionka`, szczepionkaString)
}

export async function updateSzczepionka(szczepionka, Id) {
    const szczepionkaString = JSON.stringify(szczepionka)
    await api.put(`/Szczepionka/${Id}`, szczepionkaString)
}

export async function deleteSzczepionka(Id) {
    await api.delete(`/Szczepionka/${Id}`);
}