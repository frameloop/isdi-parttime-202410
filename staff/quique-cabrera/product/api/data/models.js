import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        require: true
    },
    image: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }]

})

const User = model('User', user)
const Post = model('Post', post)

export {
    User,
    Post
}