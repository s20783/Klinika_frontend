import {getCurrentUser} from "../components/other/authHelper";
const uslugaURL = 'http://localhost:36989/api/Usluga';

export function getUslugaList(){
    const user = getCurrentUser()
    let token
    if(user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(uslugaURL, options);
    return promise;
}

export function getUslugaDetails(Id){
    const url = `${uslugaURL}/${Id}`;
    const user = getCurrentUser()
    let token
    if(user && user.Token) {
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

export function addUsluga(usluga) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${uslugaURL}`
    const uslugaString = JSON.stringify(usluga)
    console.log(uslugaString)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: uslugaString
        }
    return fetch(url, options);
}
export function updateUsluga(usluga, Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${uslugaURL}/${Id}`
    const uslugaString = JSON.stringify(usluga)
    console.log(uslugaString)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: uslugaString
        }
    return fetch(url, options);
}

export function deleteUsluga(Id){
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${uslugaURL}/${Id}`
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url,options)
}