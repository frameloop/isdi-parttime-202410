import 'dotenv/config'
import mongoose from 'mongoose'
import registerUser from './registerUser.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        try {
            console.log('🔍 trying to register user', 'Explosivos ACME', 'acme@explosivos.es', '555555555', 'acme', 'A3x9zLp8Q1', 'administrator')

            registerUser('Explosivos ACME', 'acme@explosivos.es', '555555555', 'acme', 'A3x9zLp8Q1', 'administrator')
                .then(resul => console.log('✅ user registered', resul))
                .catch(error => console.log('❌ error in registerUser (internal catch):', error))
        } catch (error) {
            console.log('❌ error in registerteUser (try/catch):', error)
        }
    })
    .catch(error => console.log('❌ error connecting to MongoDB:', error))