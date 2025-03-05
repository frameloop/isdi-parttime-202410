import 'dotenv/config'
import mongoose from 'mongoose'
import getUserName from './getUserName.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        try {
            getUserName('67c75664ed13a555987cf1ee')
                .then(name => console.log('user name gotten', name))
                .catch(error => console.log('❌ error in registerUser (internal catch):', error))
        } catch (error) {
            console.log('❌ error in registerteUser (try/catch):', error)
        }
    })
    .catch(error => console.log('❌ error connecting to MongoDB:', error))