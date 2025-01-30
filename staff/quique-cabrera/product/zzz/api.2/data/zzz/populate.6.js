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
    }
})

const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        const troy = new User({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })
        const post = new Post({ author: troy._id, image: 'https://i.pinimg.com/474x/cf/7f/04/cf7f0476bdbebb748e7dd8eb96d4d06e.jpg', text: 'Hola Mundo' })

        return Promise.all([troy.save(), post.save()])
    })
    .then((results) => {
        const troy = results[0]
        const post = results[1]

        console.log('user saved', troy._id)
        console.log('post saved', post._id)
    })
    .catch(error => console.error(error))