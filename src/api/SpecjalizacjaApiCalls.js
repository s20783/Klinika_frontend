import {getCurrentUser} from "../components/other/authHelper";
const specjalizacjaURL = 'http://localhost:36989/api/Specjalizacja';

export function getSpecjalizacjaList(){
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
    const promise = fetch(specjalizacjaURL, options);
    return promise;
}

export function getSpecjalizacjaDetails(Id){
    const url = `${specjalizacjaURL}/details/${Id}`;
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

export function addSpecjalizacja(specjalizacja) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${specjalizacjaURL}`
    const specjalizacjaString = JSON.stringify(specjalizacja)
    console.log(specjalizacjaString)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: specjalizacjaString
        }
    return fetch(url, options);
}
export function updateSpecjalizacja(specjalizacja, Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${specjalizacjaURL}/${Id}`
    const specjalizacjaString = JSON.stringify(specjalizacja)
    console.log(specjalizacjaString)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: specjalizacjaString
        }
    return fetch(url, options);
}

export function deleteSpecjalizacja(Id){
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${specjalizacjaURL}/${Id}`
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url,options)
}