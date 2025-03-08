import 'dotenv/config';
import mongoose from 'mongoose';
import verifyUserExists from './verifyUserExists.js';

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => {
        console.log('✅ MongoDB connection OK');

        const usernameToCheck = 'cristina'; // Puedes cambiarlo por el username que quieras probar

        try {
            console.log('🔍 Checking if user exists:', usernameToCheck);

            verifyUserExists(usernameToCheck)
                .then(result => console.log('✅ User exists:', result))
                .catch(error => console.log('❌ Error in verifyUserExists (internal catch):', error));
        } catch (error) {
            console.log('❌ Error in verifyUserExists (try/catch):', error);
        }
    })
    .catch(error => console.log('❌ Error connecting to MongoDB:', error));
