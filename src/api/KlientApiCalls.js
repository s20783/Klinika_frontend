import {getCurrentUser} from "../components/other/authHelper";

const baseURL = 'http://localhost:36989/api/Klient'

export function registerCall(user) {
    const url = `${baseURL}`
    const userString = JSON.stringify(user)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userString
    }
    return fetch(url, options);
}

export function getKlientList(){
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
    const promise = fetch(baseURL, options);
    return promise;
}

export function getKlientDetails(Id){
    const url = `${baseURL}/${Id}`;
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