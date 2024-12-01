const fs = require('fs')
const path = require('path')
const sessionStorage = require('../data/sessionStorage')

const getPosts = () => {

    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/posts.json')));

    posts.forEach(post => {
        const authorId = post.author

        const user = users.find(user => user.id === authorId)

        const username = user.username

        post.author = {
            id: authorId,
            username: username
        }

        post.own = authorId === sessionStorage.userId
    })

    return posts.reverse()
}

module.exports = getPosts