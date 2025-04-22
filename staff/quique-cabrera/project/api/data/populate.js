import 'dotenv/config';
import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Customer, Photographer, Service, Session, Availability } from './models.js';

const SALT_ROUNDS = 10;

mongoose.connect(process.env.MONGO_URL)
    // .then(() => mongoose.connection.dropDatabase())
    .then(() => {
        console.log('Database cleared, starting population...');

        const customers = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
        const photographers = JSON.parse(fs.readFileSync('./data/photographers.json', 'utf8'));
        const administrators = JSON.parse(fs.readFileSync('./data/administrators.json', 'utf8'));

        // 📌 Poblar Clientes
        const customerPromises = customers.map(customer => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    return User.findOne({ email: customer.email })
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`Customer ${customer.name} already exists, skipping...`);
                                return null;
                            }

                            return new User({
                                name: customer.name,
                                email: customer.email,
                                phone: customer.phone,
                                username: customer.name.replace(/.*\((\d+)\).*/, '$1'),
                                password: hashedPassword,
                                role: 'customer'
                            }).save();
                        });
                })
                .then(user => {
                    if (!user) return null;

                    return new Customer({
                        user: user._id,
                        address: customer.address,
                        services: customer.tours.map(tour => new Service({
                            name: tour.type,
                            quantity: tour.value
                        })),
                        sessions: []
                    }).save();
                })
                .then(result => {
                    if (result) console.log(`Customer ${customer.name} saved.`);
                })
                .catch(error => console.error('Error saving customer:', error));
        });

        // 📌 Poblar Fotógrafos y Disponibilidad
        const photographerPromises = photographers.map(photographerData => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    return User.findOne({ email: photographerData.email })
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`Photographer ${photographerData.name} already exists, skipping...`);
                                return null;
                            }

                            // Crea el objeto User
                            const newUser = new User({
                                name: photographerData.name,
                                email: photographerData.email,
                                phone: photographerData.phone,
                                username: photographerData.username,
                                password: hashedPassword,
                                role: 'photographer'
                            });

                            // Guarda el usuario SIN photographerId inicialmente
                            return newUser.save();
                        });
                })
                // Este .then recibe el usuario recién guardado
                .then(async user => { // <-- Hacer la función async para poder usar await
                    if (!user) return null; // Si el usuario no se guardó (p.ej., ya existía), salir

                    // Si es un fotógrafo, AÑADIR el photographerId actualizando el documento
                    if (user.role === 'photographer') {
                        try {
                            await User.updateOne({ _id: user._id }, { $set: { photographerId: user._id } });
                            // Opcional: console.log(`PhotographerId set for ${user.name}`);
                        } catch (updateError) {
                            console.error(`Failed to set photographerId for ${user.name}:`, updateError);
                            // Podríamos querer manejar este error de forma más robusta
                            // Por ahora, continuamos para crear el documento Photographer
                        }
                    }

                    // Crear el documento Photographer asociado (usando el user._id original)
                    const photographerDoc = await new Photographer({
                        user: user._id,
                        coverage_area: 'Barcelona',
                        sessions: []
                    }).save();

                    // Pasar el documento PHOTOGRAPHER al siguiente .then
                    // También pasamos el objeto user original por si es necesario en el futuro
                    return { photographerDoc, user };
                })
                // Este .then recibe el objeto { photographerDoc, user }
                .then(async ({ photographerDoc, user }) => { // Desestructurar el objeto
                    if (!photographerDoc) return null;

                    // Renombrar la variable para claridad, usamos photographerDoc de ahora en adelante
                    const photographer = photographerDoc;
                    const photographerDataFromJSON = photographers.find(p => p.email === user.email); // Necesitamos los datos originales del JSON para la disponibilidad

                    if (!photographerDataFromJSON) {
                        console.error(`Could not find original JSON data for ${user.name}`);
                        return null;
                    }

                    // 📌 Verificar si el JSON tiene disponibilidad
                    if (!photographerDataFromJSON.availability || !Array.isArray(photographerDataFromJSON.availability)) {
                        console.log(`No availability data found for ${user.name}, skipping...`);
                        return null;
                    }

                    // 📌 Crear disponibilidad en `Availability` usando photographer._id
                    await Promise.all( // Usar await aquí también
                        photographerDataFromJSON.availability.map(slot => {
                            const date = new Date(slot.date);
                            const [startHours, startMinutes] = slot.startTime.split(':');
                            const [endHours, endMinutes] = slot.endTime.split(':');

                            const startDate = new Date(date);
                            startDate.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);

                            const endDate = new Date(date);
                            endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

                            return new Availability({
                                photographer: photographer.user, // Usar photographer.user que es el ObjectId correcto
                                date: date,
                                startDate: startDate,
                                endDate: endDate,
                                available: true
                            }).save();
                        })
                    );
                    // Devolver algo para el log final, quizás el nombre
                    return user.name;
                })
                .then(photographerName => {
                    if (photographerName) console.log(`Photographer ${photographerName} and availability saved.`);
                })
                .catch(error => console.error('Error saving photographer:', error));
        });

        // 📌 Poblar Administradores
        const administratorPromises = administrators.map(administrator => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS)
                .then(hashedPassword => {
                    return User.findOne({ email: administrator.email })
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`Administrator ${administrator.name} already exists, skipping...`);
                                return null;
                            }

                            return new User({
                                name: administrator.name,
                                email: administrator.email,
                                phone: administrator.phone,
                                username: administrator.username,
                                password: hashedPassword,
                                role: 'administrator'
                            }).save();
                        });
                })
                .then(result => {
                    if (result) console.log(`Administrator ${administrator.name} saved.`);
                })
                .catch(error => console.error('Error saving administrator:', error));
        });

        return Promise.all([...customerPromises, ...photographerPromises, ...administratorPromises]);
    })
    .then(() => console.log('Data inserted successfully.'))
    .catch(error => console.error('Error inserting data:', error))
    .finally(() => {
        mongoose.disconnect();
        console.log('Disconnected from database.');
    });
