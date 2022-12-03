import {getCurrentUser} from "../components/other/authHelper";

const chorobaLekURL = 'http://localhost:36989/api/ChorobaLek';



export function addChorobaLek(IdChoroba, IdLek) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${chorobaLekURL}/${IdChoroba}/${IdLek}`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options);
}
export function deleteChorobaLek(IdChoroba, IdLek) {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const url = `${chorobaLekURL}/${IdChoroba}/${IdLek}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(url, options);
}