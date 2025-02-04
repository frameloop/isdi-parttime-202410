import mongoose from 'mongoose'
import deletePost from './deletePost.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            deletePost('6792aa6fd75b767a552e2dc3', '6792aa6fd75b767a552e2dc6')
                .then(result => console.log('post deleted', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))