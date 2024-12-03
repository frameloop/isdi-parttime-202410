const express = require('express')

const server = express()

const logic = require('../web-server.1/logic/index')
const e = require('express')

const PORT = 8080

server.get('/login', (req, res) => {
    if (logic.isUserLoggedIn()) {
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
        logic.loginUser(username, password)

        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

server.get('/', (req, res) => {
    if (!logic.isUserLoggedIn()) {
        res.redirect('/login')

        return
    }

    let name

    try {
        name = logic.getUserName()
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
           <!-- <button type="button" onclick="window.location.href='/createpost'">+</button> -->
        </form>

        <form action="/createpost" method="post">
            <button type="submit">+</button>
        </form>
        <section>
             <article>
                 <h3>Homer</h3>

                 <img src="https://upload.wikimedia.org/wikipedia/ca/0/02/Homer_Simpson_2006.png"/>

                 <p>Yuhu!</p>

                 <time datetime="2024-12-01T15:30">1 de diciembre de 2024, 15:30</time>

                <button type="submit"> x </button>
            </article>
        </section>
    </body>
</html>
`)
})

server.post('/logout', (req, res) => {
    try {
        logic.logoutUser()

        res.redirect('/login')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

server.post('/createpost', (req, res) => {
    try {
        res.redirect('/createpost')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

server.get('/createpost', (req, res) => {
    res.send(`<section>
            <h3>Create Post</h3>

            <form action="/createpost" method="post">

                <label for="image">Image</label>
                <input type="url" id="image" />

                <label for="text">Text</label>
                <input type="text" id="text" />

                <button type="submit">Create</button>
            </form>
        </section>`)
})

server.post('/createpost', express.urlencoded({ extended: true }), (req, res) => {
    const { image, text } = req.body

    try {
        logic.createPost(image, text)

        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


server.get('/register', (req, res) => {
    if (logic.isUserLoggedIn()) {
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
</html>`)
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