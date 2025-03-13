import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import { usersRouter, sessionsRouter } from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const connectToDb = () => {
    console.log(`Intentando conectar a la base de datos con URL: ${process.env.MONGO_URL || 'URL no definida'}`);
    return mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Base de datos conectada exitosamente');
            console.log('Estado de la conexión:', mongoose.connection.readyState);
        })
        .catch(error => {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        });
};

const startApi = () => {
    console.log("Iniciando configuración de la API");
    const api = express();

    api.use(cors());
    api.use(express.json());

    api.get('/', (req, res) => {
        console.log("Solicitud recibida en la ruta principal '/'");
        res.send('Hello, APIO!');
    });

    api.use('/users', usersRouter);
    api.use('/sessions', sessionsRouter);
    api.use(errorHandler);

    console.log(`Iniciando servidor en el puerto ${process.env.PORT || 'Puerto no definido'}`);
    api.listen(process.env.PORT, () => {
        console.log(`Servidor iniciado exitosamente en el puerto ${process.env.PORT}`);
    });
};

console.log("Iniciando secuencia de arranque de la aplicación");
connectToDb()
    .then(startApi)
    .catch(error => {
        console.error('Error al iniciar la API:', error);
    });
