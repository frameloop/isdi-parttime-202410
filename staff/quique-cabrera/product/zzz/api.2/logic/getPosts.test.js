import mongoose from 'mongoose'
import getPosts from './getPosts.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            getPosts('6792aa6fd75b767a552e2dc3')
                .then(posts => console.log('post gotten', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

