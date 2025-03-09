import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env
import mongoose from 'mongoose'; // Importa Mongoose para manejar la conexión con la base de datos
import express from 'express'; // Importa Express para crear el servidor
import cors from 'cors'; // Middleware para permitir peticiones de otros dominios

// Importa las rutas de usuarios y sesiones
import { usersRouter, sessionsRouter } from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js'; // Middleware para manejar errores

// 📌 Función para conectar a la base de datos MongoDB
const connectToDb = () => {
    console.log(`📡 Intentando conectar a la base de datos con URL: ${process.env.MONGO_URL || 'URL no definida'}`);
    return mongoose.connect(process.env.MONGO_URL) // Se conecta a la URL de la base de datos
        .then(() => {
            console.log('✅ Base de datos conectada exitosamente');
            return console.log('📊 Estado de la conexión:', mongoose.connection.readyState);
        }) // Mensaje si la conexión es exitosa y estado de la conexión
        .catch(error => {
            console.error('❌ Error al conectar a la base de datos:', error);
            console.log(`❌ Detalle del error: ${error.message}`);
            throw error; // Re-lanza el error para que el catch externo lo maneje
        }); // Captura errores
};

// 📌 Función para iniciar la API
const startApi = () => {
    console.log("🚧 Iniciando configuración de la API");
    const api = express(); // Crea la aplicación Express

    console.log("🔓 Habilitando CORS para peticiones externas");
    api.use(cors()); // 🔓 Habilita CORS para permitir peticiones externas
    console.log("💡 Configurando middleware para recibir JSON en req.body");
    api.use(express.json()); // 💡 Permite recibir JSON en el `req.body`

    // Ruta principal de prueba
    console.log("📍 Configurando ruta principal de prueba");
    api.get('/', (req, res) => {
        console.log("🌐 Solicitud recibida en la ruta principal '/'");
        res.send('Hello, APIO!');
    });

    // 📌 Monta las rutas en la API
    console.log("📍 Montando rutas de usuarios");
    api.use('/users', usersRouter); // Rutas de usuarios
    console.log("✅ Rutas de usuarios montadas en /users");

    console.log("📍 Montando rutas de sesiones");
    api.use('/sessions', sessionsRouter); // Rutas de sesiones
    console.log("✅ Rutas de sesiones montadas en /sessions");

    console.log("🔧 Configurando middleware de manejo de errores");
    api.use(errorHandler); // Middleware para manejar errores
    console.log("✅ Middleware de manejo de errores configurado");

    // Inicia el servidor en el puerto definido en `.env`
    console.log(`🚀 Iniciando servidor en el puerto ${process.env.PORT || 'Puerto no definido'}`);
    api.listen(process.env.PORT, () => {
        console.log(`✅ Servidor iniciado exitosamente en el puerto ${process.env.PORT}`);
    });
};

// 📌 Inicia la conexión a la base de datos y luego arranca el servidor
console.log("📍 Iniciando secuencia de arranque de la aplicación");
connectToDb()
    .then(startApi) // Si la conexión a la base de datos es correcta, arranca la API
    .catch(error => {
        console.error('❌ Error al iniciar la API:', error);
        console.log(`❌ Detalle del error: ${error.message}`);
    }); // Captura errores si falla