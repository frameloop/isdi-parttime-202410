import mongoose, from 'mongoose'
import registerUser from './registerUser.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            registerUser('Troy McClure', 'troy@mcclure.es', 'troymcclure', '346734567')
                .then(result => console.log('user registered', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
