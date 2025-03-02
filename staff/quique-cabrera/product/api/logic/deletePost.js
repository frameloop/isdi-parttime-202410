import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

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

            if (post.author.toString() !== userId) throw new OwnershipError('user is not author of post')

            return Post.deleteOne({ _id: post._id })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default deletePost 