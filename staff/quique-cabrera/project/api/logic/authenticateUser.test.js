import 'dotenv/config'
import mongoose from 'mongoose'
import authenticateUser from '../logic/authenticateUser.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        try {
            const username = 'quique'
            const password = 'A3x9zLp8Q1'

            console.log('🔍 trying to authenticate user', username)

            authenticateUser(username, password)
                .then(user => {
                    console.log('✅ user authenticated')
                    console.log(user)
                    process.exit(0)
                })
                .catch(error => {
                    console.error('❌ error in authenticateUser (internal catch):', error)
                    process.exit(1)
                })
        } catch (error) {
            console.error('❌ error in authenticateUser (try/catch):', error)
            process.exit(1)
        }
    })
    .catch(error => {
        console.error('❌ error connecting to MongoDB:', error)
        process.exit(1)
    })
