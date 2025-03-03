import 'dotenv/config';
import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Customer, Service } from './models.js';

const SALT_ROUNDS = 10;

mongoose.connect(process.env.TEST_MONGO_URL)
    .then(() => mongoose.connection.dropDatabase())
    .then(() => {
        console.log('🗄️ Database cleared, starting population...');

        const customersJson = fs.readFileSync('./data/customers.json', 'utf8');
        const customers = JSON.parse(customersJson);

        const photographersJson = fs.readFileSync('./data/photographers.json', 'utf8');
        const photographers = JSON.parse(photographersJson);

        const administratorsJson = fs.readFileSync('./data/administrators.json', 'utf8');
        const administrators = JSON.parse(administratorsJson);

        // Process customers
        const customerPromises = customers.map(customer => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    const user = new User({
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        username: customer.name.replace(/.*\((\d+)\).*/, '$1'),
                        password: hashedPassword,
                        role: 'customer'
                    });

                    return user.save();
                })
                .then(user => {
                    const customer2 = new Customer({
                        user: user._id,
                        address: customer.address
                    });

                    customer.tours.forEach(tour => {
                        const service = new Service({
                            name: tour.type,
                            quantity: tour.value
                        });

                        customer2.services.push(service);
                    });

                    return customer2.save();
                })
                .then(() => console.log(`✅ Customer ${customer.name} saved.`))
                .catch(error => console.error('❌ Error saving customer:', error));
        });

        // Process photographers
        const photographerPromises = photographers.map(photographer => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    const user = new User({
                        name: photographer.name,
                        email: photographer.email,
                        phone: photographer.phone,
                        username: photographer.username,
                        password: hashedPassword,
                        role: 'photographer'
                    });

                    return user.save();
                })
                .then(() => console.log(`📸 Photographer ${photographer.name} saved.`))
                .catch(error => console.error('❌ Error saving photographer:', error));
        });

        // Process administrators
        const administratorPromises = administrators.map(administrator => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    const user = new User({
                        name: administrator.name,
                        email: administrator.email,
                        phone: administrator.phone,
                        username: administrator.username,
                        password: hashedPassword,
                        role: 'administrator'
                    });

                    return user.save();
                })
                .then(() => console.log(`👨‍💼 Administrator ${administrator.name} saved.`))
                .catch(error => console.error('❌ Error saving administrator:', error));
        });

        return Promise.all([...customerPromises, ...photographerPromises, ...administratorPromises]);
    })
    .then(() => console.log('✅ Data inserted successfully.'))
    .catch(error => console.error('❌ Error inserting data:', error))
    .finally(() => {
        mongoose.disconnect();
        console.log('🔌 Disconnected from database.');
    });
