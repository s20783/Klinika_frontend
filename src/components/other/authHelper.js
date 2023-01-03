export function getCurrentUser() {
    //console.log(localStorage.getItem('user'))
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

//
// export function getNazwisko(){
//     const user = getCurrentUser()
//     if(user){
//         return user.Nazwisko
//     } else {
//         return undefined
//     }
// }

export function isAuthenticated() {
    const user = getCurrentUser()
    return !!user;
}

export function isKlient() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'user';

    } else {
        return false
    }
}

export function isWeterynarz() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'weterynarz';

    } else {
        return false
    }
}

// export function isAuthenticated2(id) {
//     const user = getCurrentUser()
//     if(!user) {
//         return false
//     }else if(user.Rola === 'Admin'){
//         return true
//     } else if(user.id == id) {
//         return true
//     }
// }

export function isAdmin() {
    const user = getCurrentUser()
    if (user) {
        return user.Rola === 'admin';
    } else {
        return false
    }
}