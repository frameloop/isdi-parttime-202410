const express = require('express')

const server = express()

const PORT = 8080

server.get('/helloworld', (req, res) => res.send('Hello, World!'))

server.get('/hello', (req, res) => {
    const to = req.query.to

    res.send(`Hello, ${to}!`)
})

// http://localhost:8080/salute?type=Bye&to=Peter
server.get('/salute', (req, res) => {
    const type = req.query.type || 'Hello'
    const to = req.query.to

    res.send(`${type}, ${to}!`)
})

server.get('/add/:a/:b', (req, res) => {
    const a = req.params.a
    const b = req.params.b

    const result = Number(a) + Number(b)

    res.send(`result = ${result}`)
})

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))