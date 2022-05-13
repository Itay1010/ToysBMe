import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    updateBalance
}

window.us = userService

function login(credentials) {
    return storageService.query(STORAGE_KEY).then(users => {
        const user = users.find(user => user.username === credentials.username &&
            user.password === credentials.password)
            
        if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))

        return user
    })


}
function signup(userInfo) {
    const user = {...userInfo, balance: 10000}
    return storageService.post(STORAGE_KEY, user)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}
function updateBalance(diff) {

    const user = userService.getLoggedinUser()
    user.balance += diff
    return storageService.put(STORAGE_KEY, user)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user.balance
        })
}
function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000})
// userService.login({username: 'muki', password: 'muki1'})


