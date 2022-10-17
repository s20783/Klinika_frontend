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

export function postWizyta(data) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const dataString = JSON.stringify(data)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: dataString
    }
    return fetch(postWizytaURL, options);
}