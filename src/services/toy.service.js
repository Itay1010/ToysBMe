
import { utilService } from './util.service.js'
import { httpService } from "./http.service.js";
// import { userService } from './user.service.js'

const ENDPOINT = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

async function query(filterBy) {
    const filterParams = new URLSearchParams(filterBy)
    const toys = await httpService.get(ENDPOINT, filterParams)
    return toys
}

async function getById(toyId) {
    const toy = await httpService.get(ENDPOINT + toyId)
    return toy
}

async function remove(toyId) {
    const res = await httpService.delete(ENDPOINT + toyId)
    return res
}

async function save(toy) {
    if (toy._id) {
        const res = await httpService.put(ENDPOINT + toy._id, toy)
        return res
    } else {
        // when switching to backend - remove the next line
        const res = await httpService.post(ENDPOINT, toy)
        return res.data
    }
}

function getEmptyToy() {
    return {
        name: 'Playstation',
        price: 1000,
        labels: ['video games', 'battery powered'],
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

 // toy.reviews = [
            //     {
            //         _id: utilService.makeId(),
            //         title: 'Best toy ever!',
            //         description: `I bought this for my daughter and she loved it.`,
            //         creator: { username: `Monica R.` }
            //     },
            //     {
            //         _id: utilService.makeId(),
            //         title: 'Not so good',
            //         description: `broke after two weeks`,
            //         creator: { username: `Rachel` }
            //     }
            // ]

