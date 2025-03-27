
import 'dotenv/config'
import mongoose from 'mongoose'
import getCustomerSessions from './getCustomerSessions.js'

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK')

        try {
            const customerId = '67e1c5ff39720b4275879a38' //_ID_CUSTOMER
            console.log('🔍 trying to get sessions for customer', customerId)

            getCustomerSessions(customerId)
                .then(sessions => {
                    console.log('✅ sessions retrieved:')
                    console.log(sessions)
                })
                .catch(error => console.log('❌ error in getCustomerSessions (internal catch):', error))
        } catch (error) {
            console.log('❌ error in getCustomerSessions (try/catch):', error)
        }
    })
    .catch(error => console.log('❌ error connecting to MongoDB:', error))
