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