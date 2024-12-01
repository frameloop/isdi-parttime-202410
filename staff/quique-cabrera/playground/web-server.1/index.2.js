const express = require('express')

const server =express()

const PORT = 8080

server.get('/Hellokitty', (req,res)=>res.send('Hello Kitty'))

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

server.get('/login', (req,res)=>{
    res.send(`<doctype html>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h2>Login</h2>

        <form action="/login" method="post">
            <label for="username">Username</label>
            <input id="username" name="username" type="text">

            <label for="password">Password</label>
            <input id="passwor"d" name="password" type="password">

            <button type="submit">Login</button>
        </form>
    </body>
</html> 
`)
})

server.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    const { username, password } = req.body

   res.send(`MotherFucker ${username} / ${password}`)
})

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))