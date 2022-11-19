import {getCurrentUser} from "../components/other/authHelper";

const lekURL = 'http://localhost:36989/api/LekWMagazynie';


export function getLekMagazyn(Id) {
    const url = `${lekURL}/${Id}`;
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

export function addLekMagazyn(IdLek, lek) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${lekURL}/${IdLek}`
    const lekString = JSON.stringify(lek)
    console.log(lekString)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: lekString
    }
    return fetch(url, options);
}

export function updateLekMagazyn(lek, Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${lekURL}/${Id}`
    const lekString = JSON.stringify(lek)
    console.log(lekString)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: lekString
    }
    return fetch(url, options);
}
export function deleteLekMagazyn(Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${lekURL}/${Id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options)
}
