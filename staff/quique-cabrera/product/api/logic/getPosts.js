import db from '../data/db.js'

const getPosts = userId => {
    const { users, posts } = db

    posts.forEach(post => {
        const authorId = post.author

        const user = users.find(user => user.id === authorId)

        const username = user.username

        post.author = {
            id: authorId,
            username: username
        }

        post.own = authorId === userId
    })

    return posts.reverse()
}

export default getPosts