import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const toggleLikePost = (userId, postId) => {
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

            const { likes } = post

            const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return post.save()
        })
        .then(result => { })
}

export default toggleLikePost 