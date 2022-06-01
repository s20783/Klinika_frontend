import {getCurrentUser} from "../components/other/authHelper";
const pacjentURL = 'http://localhost:36989/api/Pacjent';
const klientPacjentURL = 'http://localhost:36989/api/Pacjent/klient';


export function getPacjentList(){
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
    const promise = fetch(pacjentURL, options);
    return promise;
}

export function getPacjentDetails(Id){
    const url = `${pacjentURL}/${Id}`;
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
    const promise = fetch(url, options);
    return promise;
}

export function getKlientPacjentList(){
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
    const promise = fetch(klientPacjentURL, options);
    return promise;
}