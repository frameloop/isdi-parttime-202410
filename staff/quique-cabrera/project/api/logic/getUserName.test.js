import 'dotenv/config'
import mongoose from 'mongoose'
import getUserName from './getUserName.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(async () => {
        console.log('✅ Conexión a MongoDB establecida')

        try {
            const userId = '67c616197eb207912174d5da'
            console.log('🔍 Buscando nombre de usuario con ID:', userId)

            const name = await getUserName(userId)
            console.log('✅ Nombre de usuario:', name)
        } catch (error) {
            console.error('❌ Error al obtener el nombre de usuario:', error)
        } finally {
            mongoose.disconnect()
        }
    })
    .catch(error => console.error('❌ Error conectando a MongoDB:', error))