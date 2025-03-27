
import 'dotenv/config'
import mongoose from 'mongoose'
import getPhotographerSessions from './getPhotographerSessions.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        const photographerId = '67e1c5ff39720b4275879a3c' //_ID PHOTOGRAPHER
        console.log('🔍 trying to get sessions for photographer', photographerId)


        getPhotographerSessions(photographerId)
            .then(sessions => {
                console.log('📸 Sesiones del fotógrafo:')
                console.log(JSON.stringify(sessions, null, 2))
                process.exit(0)
            })
            .catch(error => {
                console.error('❌ Error al obtener sesiones del fotógrafo:', error)
                process.exit(1)
            })
    })
    .catch(error => {
        console.error('❌ Error al conectar a MongoDB:', error)
        process.exit(1)
    })
