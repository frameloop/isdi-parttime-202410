import validate from './helper/validate.js'
import { User, Post } from '../data/models.js'

const getPosts = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('user not found')

            return Post.find().populate('author', 'username').sort('-date').lean()
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        delete post.__v

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }
                    })
                    return posts
                })
        })
}

export default getPosts