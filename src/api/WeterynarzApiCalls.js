import {getCurrentUser} from "../components/other/authHelper";

const baseURL = 'http://localhost:36989/api/Weterynarz'

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
    const promise = fetch(baseURL, options);
    return promise;
}