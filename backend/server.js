const express = require('express')
const toyService = require('./services/toy.service.js')
const path = require('path')
// const cookieParser = require('cookie-parser')

// const userService = require('./services/user.service.js')
const app = express()
const PORT = process.env.PORT || 3030
const cors = require('cors')

// Config the Express App
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}
// app.use(cookieParser())

app.get('/api/toy/:toyId?', (req, res) => {
    const { toyId } = req.params
    if (!toyId) {
        toyService.query(req.query)
            .then((toys) => {
                res.send(toys)
            }).catch((err) => {
                console.error('something went wrong', err)
            })

    } else {
        toyService.getById(toyId)
            .then(toy => res.send(toy))
            .catch(err => {
                console.log('error')
                res.status(404).send(err)
            })
    }
})

app.delete('/api/toy/:toyId', (req, res) => {
    toyService.removeToy(req.params.toyId)
        .then(toys => res.send(toys))
        .catch(err => res.status(404).end())
})

app.post('/api/toy/', (req, res) => {
    toyService.save(req.body)
        .then(toy => res.send(toy))
})

app.put('/api/toy/:toyId', (req, res) => {
    toyService.save(req.body)
        .then(toy => res.send(toy))
})

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'
    ))
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
});