import {getCurrentUser} from "../components/other/authHelper";

const chorobaURL = 'http://localhost:36989/api/Choroba';

export function getChorobaList() {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(chorobaURL, options);
}

export function getChorobaDetails(Id) {
    const url = `${chorobaURL}/${Id}`;
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options);
}

export function addChoroba(choroba) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${chorobaURL}`
    const chorobaString = JSON.stringify(choroba)
    console.log(chorobaString)
    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }, body: chorobaString
    }
    return fetch(url, options);
}

export function updateChoroba(choroba, Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${chorobaURL}/${Id}`
    const chorobaString = JSON.stringify(choroba)
    console.log(chorobaString)
    const options = {
        method: 'PUT', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }, body: chorobaString
    }
    return fetch(url, options);
}

export function deleteChoroba(Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${chorobaURL}/${Id}`
    const options = {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options)
}