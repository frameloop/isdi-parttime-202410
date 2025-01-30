import validate from './helper/validate.js'
import { User, Post } from '../data/models.js'

const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('user not found')

            const post = new Post({ author: user._id, image, text })

            return post.save()
        })
        .then(post => { })
}

export default createPost