import {getCurrentUser} from "../components/other/authHelper";

const harmonogramURL = 'http://localhost:36989/api/Harmonogram?date=';

export function getHarmonogram(Date) {
    const url = `${harmonogramURL}${Date}`;
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