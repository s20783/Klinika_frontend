import {getCurrentUser} from "../components/other/authHelper";

const weterynarzURL = 'http://localhost:36989/api/Weterynarz'

export function getWeterynarzList(){
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
    const promise = fetch(weterynarzURL, options);
    return promise;
}
export function getWeterynarzDetails(Id){
    const url = `${weterynarzURL}/${Id}`;
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
export function addWeterynarz(weterynarz) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${weterynarzURL}`
    const weterynarzString = JSON.stringify(weterynarz)
    console.log(weterynarzString)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: weterynarzString
        }
    return fetch(url, options);
}
export function updateWeterynarz(weterynarz, Id) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${weterynarzURL}/${Id}`
    const weterynarzString = JSON.stringify(weterynarz)
    console.log(weterynarzString)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: weterynarzString
        }
    return fetch(url, options);
}

export function deleteWeterynarz(Id){
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${weterynarzURL}/${Id}`
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url,options)
}