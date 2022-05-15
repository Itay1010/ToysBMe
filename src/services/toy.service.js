
import { utilService } from './util.service.js'
import axios from 'axios'
// import { userService } from './user.service.js'

const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/toy'
    : 'http://localhost:3030/api/toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

function query(filterBy) {
    const filterParams = new URLSearchParams(filterBy)
    return axios.get(BASE_URL, { params: filterParams }).then(res => res.data)
}

function getById(toyId) {
    return axios.get(BASE_URL + toyId)
        .then(({ data }) => data)
        .then((toy) => {
            toy.reviews = [
                {
                    _id: utilService.makeId(),
                    title: 'Best toy ever!',
                    description: `I bought this for my daughter and she loved it.`,
                    creator: { username: `Monica R.` }
                },
                {
                    _id: utilService.makeId(),
                    title: 'Not so good',
                    description: `broke after two weeks`,
                    creator: { username: `Rachel` }
                }
            ]
            return toy
        })
}

function remove(toyId) {
    return axios.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return axios.put(BASE_URL + toy._id, toy).then(res => res.data)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return axios.post(BASE_URL, toy).then(res => res.data)
    }
}

function getEmptyToy() {
    return {
        name: 'Playstation',
        price: 1000,
        labels: ['doll', 'battery powered'],
        createdAt: Date.now(),
        inStock: true
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Talking doll', price: 168, labels: ["doll", "battery powered", "baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))

// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Baseball Bat', price: 200, labels: ["doll", "battery powered", "baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))

// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Funko Pop', price: 168, labels: ["doll", "battery powered", "baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))


