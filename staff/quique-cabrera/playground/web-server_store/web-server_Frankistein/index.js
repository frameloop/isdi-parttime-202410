const express = require('express');
const getPosts = require('./logic/getPosts');
const createPost = require('./logic/createPost');
const deletePost = require('./logic/deletePost');
const logic = require('./logic/index');

const server = express();
const PORT = 8080;

// Middleware para manejar datos de formularios
server.use(express.urlencoded({ extended: true }));

// Página de Login
server.get('/login', (req, res) => {
    if (logic.isUserLoggedIn()) {
        res.redirect('/');
        return;
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
`);
});

// Manejo del Login
server.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        logic.loginUser(username, password);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Página Principal (Home)
server.get('/', (req, res) => {
    if (!logic.isUserLoggedIn()) {
        res.redirect('/login');
        return;
    }

    let name;
    try {
        name = logic.getUserName();
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }

    let postsHTML = '';
    try {
        const posts = getPosts();
        postsHTML = posts.map(post => `
            <article>
                <h3>${post.author.username}</h3>

                <img src="${post.image}" alt="Post image">

                <p>${post.text}</p>

                <time datetime="${post.date}">
                    ${new Date(post.date).toLocaleString()}
                </time>

                ${post.own ? `
                <form action="/deletepost" method="post">
                    <input type="hidden" name="postId" value="${post.id}">
                    <button type="submit">x</button>
                </form>` : ''}

            </article>
        `).join('');
    } catch (error) {
        res.status(400).send(error.message);
        return;
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

        <button type="button" onclick="window.location.href='/createpost'">+</button>

        <section>
            ${postsHTML}
        </section>
    </body>
</html>
`);
});

// Logout
server.post('/logout', (req, res) => {
    try {
        logic.logoutUser();
        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Página de Creación de Posts
server.get('/createpost', (req, res) => {
    if (!logic.isUserLoggedIn()) {
        res.redirect('/login');
        return;
    }

    res.send(`<section>
        <h3>Create Post</h3>
        <form action="/createpost" method="post">

            <label for="image">Image</label>
            <input id="image" name="image" type="url" required>

            <label for="text">Text</label>
            <input id="text" name="text" type="text" required>

            <button type="submit">Create</button>
        </form>
    </section>`);
});

server.post('/createpost', (req, res) => {
    const { image, text } = req.body;

    try {
        createPost(image, text);
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Borrar un Post
server.post('/deletepost', (req, res) => {
    const { postId } = req.body;

    try {
        deletePost(postId);
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Página de Registro
server.get('/register', (req, res) => {
    if (logic.isUserLoggedIn()) {
        res.redirect('/');
        return;
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
            <input id="name" name="name" type="text" required>

            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" required>

            <label for="username">Username</label>
            <input id="username" name="username" type="text" required>

            <label for="password">Password</label>
            <input id="password" name="password" type="password" required>

            <button type="submit">Register</button>
        </form>
        <a href="/login">Login</a>
    </body>
</html>
`);
});

server.post('/register', (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        logic.registerUser(name, email, username, password);
        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Inicia el servidor
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
