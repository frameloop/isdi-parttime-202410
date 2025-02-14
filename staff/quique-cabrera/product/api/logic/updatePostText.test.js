import mongoose from 'mongoose'
import updatePostText from './updatePostText.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            updatePostText('6792aa6fd75b767a552e2dc3', '67acbffa616b23bae1303e17', 'mola')
                .then(result => console.log('post text update', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))