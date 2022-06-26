import {getCurrentUser} from "../components/other/authHelper";

const wizytaURL = 'http://localhost:36989/api/Wizyta/moje_wizyty'
const postWizytaURL = 'http://localhost:36989/api/Wizyta'

export function getVisitList() {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(wizytaURL, options);
    return promise;
}

export function postWizyta(idHarmonogram, idPacjent, notatka) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${postWizytaURL}?ID_Harmonogram=${idHarmonogram}&ID_Pacjent=${idPacjent}&Notatka=${notatka}`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options);
}
