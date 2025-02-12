import mongoose from 'mongoose'
import toggleLikePost from './toggleLikePost.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            toggleLikePost('6792aa6fd75b767a552e2dc3', '67acbffa616b23bae1303e17')
                .then(result => console.log('post like toggled', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))