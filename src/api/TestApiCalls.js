import {getCurrentUser} from "../components/other/authHelper";

const testURL = 'http://localhost:36989/api/Test/abc'

export function postTestApi() {
    const user = getCurrentUser()
    let token
    if (user && user.Token) {
        token = user.Token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(testURL, options);
}