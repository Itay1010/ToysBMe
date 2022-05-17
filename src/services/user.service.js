import Axios from 'axios'
import { showSuccessMsg, showErrorMsg, showUserMsg } from './event-bus.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY = 'loggedinUser'
const ENDPOINT = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

window.us = userService

async function login(credentials) {
    // console.log('login - credentials', {data: credentials})
    try {
        const res = await httpService.post(ENDPOINT + 'login', credentials)
        console.log('login - res', res)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res))
        showSuccessMsg(`Welcome ${res.username}`)
        return res
    } catch (error) {
        console.log(error)
        showErrorMsg('Something went wrong')
        throw error
    }
}

async function signup(userInfo) {
    const user = { ...userInfo }
    const res = await httpService.post(ENDPOINT, user)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

async function logout() {
    try {
        const res = await httpService.post(ENDPOINT + 'logout')
        sessionStorage.setItem(STORAGE_KEY, null)
        console.log('logged out', res)
        showSuccessMsg('Logged out')
        return res
    } catch (error) {
        console.log('logout - error', error)
        showErrorMsg('Something went wrong')

    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000})
// userService.login({username: 'muki', password: 'muki1'})


