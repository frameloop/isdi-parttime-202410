import mongoose from 'mongoose'
import createPost from './createPost.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            createPost('6792aa6fd75b767a552e2dc3©', 'https://i.pinimg.com/736x/d0/5b/5d/d05b5d3e9ce095549369b4fd1f8eabe4.jpg', 'I can Sing!')
                .then(result => console.log('post created', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))