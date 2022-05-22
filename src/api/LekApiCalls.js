import {getCurrentUser} from "../components/other/authHelper";
const lekURL = 'http://localhost:36989/api/Lek';

export function getLekList(){
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
    const promise = fetch(lekURL, options);
    return promise;
}

export function getLekDetailsList(Id){
    const url = `${lekURL}/${Id}`;
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