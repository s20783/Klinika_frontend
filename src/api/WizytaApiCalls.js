import {getCurrentUser} from "../components/other/authHelper";

const wizytaURL = 'http://localhost:36989/api/Wizyta/moje_wizyty'

export function getVisitList(){
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
    const promise = fetch(wizytaURL, options);
    return promise;
}