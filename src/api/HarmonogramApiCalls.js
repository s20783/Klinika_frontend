import {getCurrentUser} from "../components/other/authHelper";

const harmonogramURL = 'http://localhost:36989/api/Harmonogram';

export function getHarmonogramWizyta(Date) {
    const url = `${harmonogramURL}?date=${Date}`;
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


export function getHarmonogramVet(idVet, Date) {
    const url = `${harmonogramURL}/klinika/${idVet}?Date=${Date}`;
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

export function getHarmonogram(Date) {
    const url = `${harmonogramURL}/klinika?date=${Date}`;
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