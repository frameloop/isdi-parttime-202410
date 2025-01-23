import mongoose from "mongoose"
import { User, Post } from './models.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        const troy = new User({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })

        const post = new Post({ author: troy._id, image: 'https://i.pinimg.com/474x/cf/7f/04/cf7f0476bdbebb748e7dd8eb96d4d06e.jpg', text: 'Tal vez me recuerden en peliculas como...' })

        const post2 = new Post({ author: troy._id, image: 'https://i.pinimg.com/474x/cd/08/c6/cd08c6be5e373857c8532d3c5130b981.jpg', text: 'Soy Troy McClure!' })

        const post3 = new Post({ author: troy._id, image: 'https://i.pinimg.com/736x/b8/83/f4/b883f47754b8ab9a6e420ccea97aeccb.jpg', text: 'Out of Me!' })

        return Promise.all([troy.save(), post.save(), post2.save(), post3.save()])
    })
    .then(([troy, post, post2, post3]) => {
        console.log('user saved', troy._id)
        console.log('post saved', post._id)
        console.log('post2 saved', post2._id)
        console.log('post3 saved', post3._id)
    })
    .catch(error => console.error(error))