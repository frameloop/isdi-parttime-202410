import 'dotenv/config'
import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        try {
            console.log('🔍 trying to authenticate user', 'quique', 'A3x9zLp8Q1')

            authenticateUser('quique', 'A3x9zLp8Q1')
                .then(userId => console.log('✅ user authenticated', userId))
                .catch(error => console.log('❌ error in authenticateUser (internal catch):', error))
        } catch (error) {
            console.log('❌ error in autheticateUser (try/catch):', error)
        }
    })
    .catch(error => console.log('❌ error connecting to MongoDB:', error))