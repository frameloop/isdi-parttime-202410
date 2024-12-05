import db from '../data/db.js'
import uuid from '../data/uuid.js'

const createPost = (image, text) => {
    if (typeof image !== 'string') throw Error('invalid image type')
    if (typeof text !== 'string') throw Error('invalid text type')

    const { posts } = db

    const post = {
        id: uuid(),
        author: userId,
        image,
        text,
        date: new Date().toISOString()
    }

    posts.push(post)

    db.posts = JSON.stringify(posts)
}

export default createPost