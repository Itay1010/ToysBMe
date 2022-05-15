const fs = require('fs')
const { promises } = require('stream')
const gToys = require('../data/toys.json')
const utilService = require('./util.service')

module.exports = {
    query,
    getById,
    removeToy,
    save
}

function query(filterBy) {
    const toys = _filterToys(gToys, filterBy)
    return Promise.resolve(toys)
}

function getById(toyId) {
    return new Promise((resolve, reject) => {
        try {
            const toy = gToys.find(toy => toy._id === toyId)
            if (!toy) throw 'toy not found'
            _addReviews(toy)
            resolve(toy)
        } catch (err) {
            console.log('error thrown')
            reject(err)
        }
    })
}

function removeToy(id) {
    const idx = gToys.findIndex(toy => toy._id === id)
    if (idx < 0) return Promise.reject('not found')
    gToys.splice(idx, 1)
    return _saveToysToFile()
}

function save(data) {
    if (data._id) {
        const idx = gToys.findIndex(toy => toy._id === data._id)
        Object.keys(data).forEach((key) => {
            gToys[idx][key] = data[key]
        })
        return _saveToysToFile()
    } else {
        console.log('creating new')
        const toy = _getEmptyToy(data.name, data.price)
        gToys.unshift(toy)
        return _saveToysToFile().then(() => toy)
    }
}

function _addReviews(toy) {
    //dummy function for testing
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
}
function _getEmptyToy(name = 'Playstation', price = 1000) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels: ['Doll', 'Battery Powered'],
        createdAt: Date.now(),
        inStock: true
    }
}

function _filterToys(toys, filterBy) {
    toys = toys.filter(toy => toy.name.toLowerCase().includes(filterBy.txt.toLowerCase()))
    if (filterBy.label.length) toys = toys.filter(toy => toy.labels.some(label => filterBy.label.indexOf(label.toLowerCase()) >= 0))
    if (filterBy.inStock !== '' && filterBy.inStock !== null) {
        toys = toys.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
    }
    return toys
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toys.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}
