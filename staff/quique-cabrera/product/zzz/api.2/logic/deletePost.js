import validate from './helper/validate.js'
import { User, Post } from '../data/models.js'

const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('user not found')

            return Post.findById(postId)
        })
        .then(post => {
            if (!post) throw new Error('post not found')

            return Post.deleteOne({ _id: post._id })
        })
        .then(result => { })
}

export default deletePost 