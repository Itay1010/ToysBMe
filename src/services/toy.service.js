
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

function query(filterBy) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY, filterBy)
}
function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId).then((toy) => {
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
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Talking Doll', price: 168, labels: ["Doll", "Battery Powered", "Baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))

// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Baseball Bat', price: 200, labels: ["Doll", "Battery Powered", "Baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))

// storageService.post(STORAGE_KEY,
//     { _id: utilService.makeId(), name: 'Funko Pop', price: 168, labels: ["Doll", "Battery Powered", "Baby"], createdAt: Date.now(), inStock: true })
//     .then(x => console.log(x))


