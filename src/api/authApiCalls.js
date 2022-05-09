const baseURL = 'http://localhost:36989/api/Test'

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