import mongoose from 'mongoose'
import getUserName from './getUserName.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            getUserName('6792aa6fd75b767a552e2dc3')
                .then(name => console.log('user name gotten', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
