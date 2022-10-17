import {getCurrentUser} from "../components/other/authHelper";
const pacjentURL = 'http://localhost:36989/api/Pacjent';


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
    const url = `${pacjentURL}/klient`;
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
export function addPacjent(patient) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${pacjentURL}`
    const patientString = JSON.stringify(patient)
    console.log(patientString)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
            },
            body: patientString
        }
    return fetch(url, options);
}