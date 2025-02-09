import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const createPost = (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const post = new Post({ author: user._id, image, text })

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => { })
}

export default createPost