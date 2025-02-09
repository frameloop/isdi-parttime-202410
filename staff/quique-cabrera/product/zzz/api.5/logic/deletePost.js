import validate from './helper/validate.js'
import { User, Post } from '../data/models.js'
import errors from './errors/index.js'

const { SystemError, NotFoundError } = errors

const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError('post not found')

            return Post.deleteOne({ _id: post._id })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default deletePost 