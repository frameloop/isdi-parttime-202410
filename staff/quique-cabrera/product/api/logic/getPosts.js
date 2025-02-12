import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getPosts = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find().populate('author', 'username').sort('-date').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        delete post.__v

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        post.own = userId === post.author.id

                        post.liked = post.likes.some(userObjectId => userObjectId.toString() === userId)
                        post.likes = post.likes.length
                    })
                    return posts
                })
        })
}

export default getPosts