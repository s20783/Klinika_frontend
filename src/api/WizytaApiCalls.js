import {getCurrentUser} from "../components/other/authHelper";

const wizytaURL = 'http://localhost:36989/api/Wizyta'

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
    return fetch(wizytaURL, options);
}

export function postWizyta(data) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const dataString = JSON.stringify(data)
    const url = `${wizytaURL}/umowWizyte`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: dataString
    }
    return fetch(url, options);
}

export function getPacjentVisitList(Id) {
    const user = getCurrentUser()
    let token
    const url = `${wizytaURL}/pacjent/${Id}`;

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
    return fetch(url, options);
}

export function getClientVisitListForDetails(id){
    const user = getCurrentUser()
    let token
    const url = `${wizytaURL}/${id}`;

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
    return fetch(url, options);
}
export function getClientVisitList() {
    const user = getCurrentUser()
    let token
    const url = `${wizytaURL}/moje_wizyty`;

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
    return fetch(url, options);
}

export function deleteWizyta(Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${wizytaURL}/${Id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options)
}

export function getWizytaDetails(Id) {
    const url = `${wizytaURL}/details/${Id}`;
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
    return fetch(url, options);
}


