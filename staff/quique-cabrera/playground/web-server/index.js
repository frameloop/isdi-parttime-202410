const express = require('express')

const server = express()

const logic = require('./logic/index')
const { parseCookies } = require('./util/index')

const PORT = 8080

server.get('/helloworld', (req, res) => {
    res.send('Hello, from Server!')
})

server.get('/login', (req, res) => {
    const cookies = parseCookies(req.headers.cookie)

    const { userId } = cookies

    if (userId) {
        res.redirect('/')

        return
    }

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
            <input id="password" name="password" type="password">

            <button type="submit">Login</button>
        </form>

        <a href="/register">Register</a>
    </body>
</html>
`)
})

server.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        res.setHeader('Set-Cookie', `userId=${userId}`)

        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

server.get('/', (req, res) => {
    const cookies = parseCookies(req.headers.cookie)

    const { userId } = cookies

    if (!userId) {
        res.redirect('/login')

        return
    }

    let name

    try {
        name = logic.getUserName(userId)
    } catch (error) {
        res.status(400).send(error.message)

        return
    }

    res.send(`<doctype html>
<html>
    <head>
        <title>Home</title>
    </head>
    <body>
        <h2>Home</h2>

        <p>Hello, ${name}!</p>

        <form action="/logout" method="post">
            <button type="submit">Logout</button>
        </form>
    </body>
</html>
`)
})

server.post('/logout', (req, res) => {
    const cookies = parseCookies(req.headers.cookie)

    const { userId } = cookies

    res.setHeader('Set-Cookie', `userId=${userId}; Max-Age=0`)

    res.redirect('/login')
})

server.get('/register', (req, res) => {
    const cookies = parseCookies(req.headers.cookies)

    const { userId } = cookies

    if (userId) {
        res.redirect('/')

        return
    }

    res.send(`<doctype html>
<html>
    <head>
        <title>Register</title>
    </head>
    <body>
        <h2>Register</h2>

        <form action="/register" method="post">
            <label for="name">Name</label>
            <input id="name" name="name" type="text">

            <label for="email">E-mail</label>
            <input id="email" name="email" type="email">

            <label for="username">Username</label>
            <input id="username" name="username" type="text">

            <label for="password">Password</label>
            <input id="password" name="password" type="password">

            <button type="submit">Register</button>
        </form>

        <a href="/login">Login</a>
    </body>
</html>
`)
})

server.post('/register', express.urlencoded({ extended: true }), (req, res) => {
    const { name, email, username, password } = req.body

    try {
        logic.registerUser(name, email, username, password)

        res.redirect('/login')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


server.listen(PORT, () => console.log(`server listening on port ${PORT}`))