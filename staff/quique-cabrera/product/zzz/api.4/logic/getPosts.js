import validate from './helper/validate.js'
import { User, Post } from '../data/models.js'
import errors from './errors/index.js'

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
                    })
                    return posts
                })
        })
}

export default getPosts