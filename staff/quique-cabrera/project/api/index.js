import 'dotenv/config'; // Carga las variables de entorno desde .env
import mongoose from 'mongoose'; // Importa Mongoose para manejar la base de datos
import express from 'express'; // Importa Express para crear el servidor
import cors from 'cors'; // Middleware para permitir peticiones de otros dominios

// Importa las rutas de usuarios y sesiones
import { usersRouter, sessionsRouter } from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js'; // Middleware para manejar errores

// 📌 Función para conectar a la base de datos MongoDB
const connectToDb = () =>
    mongoose.connect(process.env.MONGO_URL) // Se conecta a la URL de la BD
        .then(() => console.log('✅ DB connected')) // Mensaje si la conexión es exitosa
        .catch(error => console.error('❌ Error connecting to DB:', error)); // Captura errores

// 📌 Función para iniciar la API
const startApi = () => {
    const api = express(); // Crea la aplicación Express

    api.use(cors()); // 🔓 Habilita CORS para permitir peticiones externas
    api.use(express.json());  // 💡 Permite recibir JSON en el `req.body`

    // Ruta principal de prueba
    api.get('/', (req, res) => res.send('Hello, APIO!'));

    // 📌 Monta las rutas en la API
    api.use('/users', usersRouter); // Rutas de usuarios

    api.use('/sessions', sessionsRouter); // Rutas de sesiones

    api.use(errorHandler); // Middleware para manejar errores

    // Inicia el servidor en el puerto definido en `.env`
    api.listen(process.env.PORT, () =>
        console.log(`🚀 API running on port ${process.env.PORT}`)
    );
};

// 📌 Inicia la conexión a la BD y luego arranca el servidor
connectToDb()
    .then(startApi) // Si la conexión a la BD es correcta, arranca la API
    .catch(error => console.error('❌ API startup error:', error)); // Captura errores si falla
