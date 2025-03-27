import 'dotenv/config'
import mongoose from 'mongoose'
import registerUser from './registerUser.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(async () => {
        console.log('✅ Conectado a MongoDB')

        const baseUser = {
            name: 'Test User',
            email: `testuser_${Date.now()}@example.com`,
            phone: '600123456',
            username: `testuser_${Date.now()}`,
            password: 'TestPassword123!',
            role: 'photographer',
            coverage: '08001'
        }

        try {
            console.log('🔍 Probando registro de usuario fotográfo válido')
            const user = await registerUser(
                baseUser.name,
                baseUser.email,
                baseUser.phone,
                baseUser.username,
                baseUser.password,
                baseUser.role,
                baseUser.coverage
            )

            if (user && user._id) {
                console.log('✅ Usuario registrado correctamente:', user._id.toString())
            } else {
                console.error('❌ Error: usuario no fue retornado correctamente')
            }

        } catch (error) {
            console.error('❌ Error durante el test:', error.message)
        } finally {
            mongoose.disconnect().then(() => console.log('👋 Desconectado de MongoDB'))
        }
    })
    .catch(error => console.error('❌ Error conectando a MongoDB:', error))
