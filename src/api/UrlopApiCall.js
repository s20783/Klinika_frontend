import {getCurrentUser} from "../components/other/authHelper";

const urlopURL = 'http://localhost:36989/api/Urlop';

export function getUrlopList(id) {
    const url = `${urlopURL}/${id}`;
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
export function getUrlopDetails(id) {
    const url = `${urlopURL}/details/${id}`;
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
export function getKontoUrlopList() {
    const url = `${urlopURL}/moje_urlopy`;
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


export function addUrlop( dane) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${urlopURL}`
    const urlopString = JSON.stringify(dane)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: urlopString
    }
    return fetch(url, options);
}

export function editUrlop(idUrlop, dane) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${urlopURL}/${idUrlop}`
    const urlopString = JSON.stringify(dane)

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: urlopString
    }
    return fetch(url, options);
}

export function deleteUrlop(id) {
    const url = `${urlopURL}/${id}`;
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options);
}
