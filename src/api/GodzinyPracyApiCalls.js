import {getCurrentUser} from "../components/other/authHelper";

const godzinyPracyURL = 'http://localhost:36989/api/GodzinyPracy';

export function getGodzinyPracyList(id) {
    const url = `${godzinyPracyURL}/${id}`;
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

export function addGodzinyPracy(idVet, dane) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${godzinyPracyURL}/${idVet}`
    const godzinyPracyString = JSON.stringify(dane)
    console.log(godzinyPracyString + "add")
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: godzinyPracyString
    }
    return fetch(url, options);
}

export function editGodzinyPracy(idVet, dane) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${godzinyPracyURL}/${idVet}`
    const godzinyPracyString = JSON.stringify(dane)
    console.log(godzinyPracyString + "edit")
    console.log(url)

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: godzinyPracyString
    }
    return fetch(url, options);
}

export function deleteGodzinyPracy(id, dzien) {
    const url = `${godzinyPracyURL}/${id}?dzien=${dzien}`;
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
