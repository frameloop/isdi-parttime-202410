import db from '../data/db.js'
import uuid from '../data/uuid.js'
import validate from './helper/validate.js'

const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
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

    db.posts = posts
}

export default createPost