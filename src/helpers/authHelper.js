export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function getImie() {
    const user = getCurrentUser()
    if (user) {
        return user.Imie
    } else {
        return undefined
    }
}

export function getId() {
    const user = getCurrentUser()
    let token = user.Token
    if (user) {
        return JSON.parse(atob(token.split('.')[1])).idUser
    } else {
        return undefined
    }
}

export function isAuthenticated() {
    const user = getCurrentUser()
    return !!user;
}

export function isClient() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'user';

    } else {
        return false
    }
}

export function isVet() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'Weterynarz';

    } else {
        return false
    }
}

export function isAdmin() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'Admin';
    } else {
        return false
    }
}