import {getCurrentUser} from "../components/other/authHelper";

const baseURL = 'http://localhost:36989/api/Konto'

export function loginCall(user) {
    const url = `${baseURL}/login`
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

export function refreshCall(user) {
    const url = `${baseURL}/refreshToken`
    const tokenString = JSON.stringify(user)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: tokenString
    }
    return fetch(url, options);
}

export function getKontoData(){
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
export function changePassword(user) {
    const user1 = getCurrentUser()
    const url = `${baseURL}/password/${user1.Id}`
    const userString = JSON.stringify(user)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userString
    }
    return fetch(url, options);
}