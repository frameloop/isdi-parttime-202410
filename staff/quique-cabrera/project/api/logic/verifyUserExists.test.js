import 'dotenv/config'
import mongoose from 'mongoose'
import verifyUserExists from './verifyUserExists.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ Conexión a MongoDB establecida')

        const testUsername = 'quique' // ← Cambia este por uno real en tu base de datos

        console.log(`🔍 Verificando existencia del usuario: ${testUsername}`)

        verifyUserExists(testUsername)
            .then(result => {
                console.log('✅ Usuario verificado correctamente:', result)
            })
            .catch(error => {
                console.error('❌ Error en verifyUserExists:', error)
            })
    })
    .catch(error => {
        console.error('❌ Error conectando a MongoDB:', error)
    })
