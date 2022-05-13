export function getCurrentUser(){
    // console.log(JSON.parse(localStorage.getItem('user')))
    return JSON.parse(localStorage.getItem('user'));
}

export function getImie(){
    const user = getCurrentUser()
    if(user){
        return user.Imie
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
    if(user) {
        return true
    } else {
        return false
    }
}

export function isKlient() {
    const user = getCurrentUser()
    if(user) {
        if(user.Rola === 'user'){
            return true;
        }
        return false;
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
    if(user) {
        if(user.Rola === 'admin') {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}