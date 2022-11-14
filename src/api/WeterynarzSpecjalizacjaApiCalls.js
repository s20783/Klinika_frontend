import {getCurrentUser} from "../components/other/authHelper";

const weterynarzSpecjalizajcaURL = 'http://localhost:36989/api/WeterynarzSpecjalizacja';

export function getWeterynarzSpecjalizacjaList(Id) {
    const url = `${weterynarzSpecjalizajcaURL}/${Id}`;
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

export function addWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz) {
    const url = `${weterynarzSpecjalizajcaURL}/${idSpecjalizacja}/${idWeterynarz}`;
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options);
}

export function deleteWeterynarzSpecjalizacja(idSpecjalizacja, idWeterynarz) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${weterynarzSpecjalizajcaURL}/${idSpecjalizacja}/${idWeterynarz}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options)
}