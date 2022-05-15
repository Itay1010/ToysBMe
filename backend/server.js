const express = require('express')
// const cookieParser = require('cookie-parser')

const toyService = require('./services/toy.service.js')
const userService = require('./services/user.service.js')
const app = express()

// Config the Express App
app.use(express.static('public'))
// app.use(cookieParser())
app.use(express.json())

app.get('/api/toy', (req, res) => {
    toyService.query(req.body)
        .then((toys) => {
            res.send(toys)
        }).catch((err) => {
            console.error('something went wrong', err)
        })
})

app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.getById(toyId)
        .then(toy => res.send(toy))
        .catch(err => {
            console.log('error')
            res.status(404).send(err)
        })
})

app.delete('/api/toy/:toyId', (req, res) => {
    toyService.removeToy(req.params.toyId)
        .then(toys => res.send(toys))
        .catch(err => res.status(404).end())
})

app.post('/api/toy', (req, res) => {
    toyService.save(req.body)
        .then(toy => res.send(toy))
})

app.put('/api/toy/:toyId', (req, res) => {
    toyService.save(req.body)
        .then(toy => res.send(toy))
})

app.listen(3030)
console.log('Server is ready at 3030')