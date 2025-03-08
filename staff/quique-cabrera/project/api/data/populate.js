import 'dotenv/config'; // Carga variables de entorno
import fs from 'fs'; // Módulo para leer archivos JSON
import mongoose from 'mongoose'; // ORM para MongoDB
import bcrypt from 'bcryptjs'; // Para encriptar contraseñas
import { User, Customer, Photographer, Service, Session } from './models.js'; // Importa modelos

const SALT_ROUNDS = 10; // Número de rondas para el hash de contraseñas

// Conexión a la base de datos y limpieza previa
mongoose.connect(process.env.MONGO_URL)
    .then(() => mongoose.connection.dropDatabase()) // Elimina la BD antes de poblarla
    .then(() => {
        console.log('🗄️ Database cleared, starting population...');

        // Leer archivos JSON con datos de usuarios
        const customersJson = fs.readFileSync('./data/customers.json', 'utf8');
        const customers = JSON.parse(customersJson);

        const photographersJson = fs.readFileSync('./data/photographers.json', 'utf8');
        const photographers = JSON.parse(photographersJson);

        const administratorsJson = fs.readFileSync('./data/administrators.json', 'utf8');
        const administrators = JSON.parse(administratorsJson);

        // Procesar clientes
        const customerPromises = customers.map(customer => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS) // Hash de contraseña predeterminada
                .then(hashedPassword => {
                    return User.findOne({ email: customer.email }) // Evitar duplicados en User
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`⚠️ Customer ${customer.name} already exists, skipping...`);
                                return null;
                            }

                            const user = new User({
                                name: customer.name,
                                email: customer.email,
                                phone: customer.phone,
                                username: customer.name.replace(/.*\((\d+)\).*/, '$1'), // Extrae ID como username
                                password: hashedPassword,
                                role: 'customer'
                            });

                            return user.save();
                        });
                })
                .then(user => {
                    if (!user) return null; // Si el usuario ya existía, no crea cliente

                    return Customer.findOne({ address: customer.address }) // Evitar direcciones duplicadas
                        .then(existingCustomer => {
                            if (existingCustomer) {
                                console.log(`⚠️ Address ${customer.address} already exists, skipping...`);
                                return null;
                            }

                            const newCustomer = new Customer({
                                user: user._id,
                                address: customer.address,
                                services: customer.tours.map(tour => new Service({
                                    name: tour.type,
                                    quantity: tour.value
                                })),
                                sessions: [] // Inicialmente sin sesiones asignadas
                            });

                            return newCustomer.save()
                                .catch(err => {
                                    if (err.code === 11000) {
                                        console.warn(`⚠️ Duplicate entry for address ${customer.address}, skipping...`);
                                        return null;
                                    } else {
                                        throw err;
                                    }
                                });
                        });
                })
                .then(result => {
                    if (result) console.log(`✅ Customer ${customer.name} saved.`);
                })
                .catch(error => console.error('❌ Error saving customer:', error));
        });

        // Procesar fotógrafos
        const photographerPromises = photographers.map(photographer => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS) // Hash de contraseña predeterminada
                .then(hashedPassword => {
                    return User.findOne({ email: photographer.email }) // Evitar duplicados en User
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`⚠️ Photographer ${photographer.name} already exists, skipping...`);
                                return null;
                            }

                            const user = new User({
                                name: photographer.name,
                                email: photographer.email,
                                phone: photographer.phone,
                                username: photographer.username,
                                password: hashedPassword,
                                role: 'photographer'
                            });

                            return user.save();
                        });
                })
                .then(user => {
                    if (!user) return null;

                    const newPhotographer = new Photographer({
                        user: user._id,
                        coverage_area: 'Barcelona',
                        availability: [
                            { day: 'monday', slots: ['09:00-12:00', '14:00-18:00'] },
                            { day: 'tuesday', slots: ['10:00-13:00', '15:00-19:00'] }
                        ],
                        sessions: [] // Se inicializa correctamente
                    });

                    return newPhotographer.save();
                })

                .then(result => {
                    if (result) console.log(`📸 Photographer ${photographer.name} saved.`);
                })
                .catch(error => console.error('❌ Error saving photographer:', error));
        });

        // Procesar administradores
        const administratorPromises = administrators.map(administrator => {
            return bcrypt.hash('A3x9zLp8Q1', SALT_ROUNDS) // Hash de contraseña predeterminada
                .then(hashedPassword => {
                    return User.findOne({ email: administrator.email }) // Evitar duplicados en User
                        .then(existingUser => {
                            if (existingUser) {
                                console.log(`⚠️ Administrator ${administrator.name} already exists, skipping...`);
                                return null;
                            }

                            const user = new User({
                                name: administrator.name,
                                email: administrator.email,
                                phone: administrator.phone,
                                username: administrator.username,
                                password: hashedPassword,
                                role: 'administrator'
                            });

                            return user.save();
                        });
                })
                .then(result => {
                    if (result) console.log(`👨‍💼 Administrator ${administrator.name} saved.`);
                })
                .catch(error => console.error('❌ Error saving administrator:', error));
        });

        // Ejecutar todas las promesas
        return Promise.all([...customerPromises, ...photographerPromises, ...administratorPromises]);
    })
    .then(() => console.log('✅ Data inserted successfully.'))
    .catch(error => console.error('❌ Error inserting data:', error))
    .finally(() => {
        mongoose.disconnect(); // Desconectar de la base de datos
        console.log('🔌 Disconnected from database.');
    });
