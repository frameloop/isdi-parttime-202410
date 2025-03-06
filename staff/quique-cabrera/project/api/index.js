import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import { usersRouter } from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const connectToDb = () =>
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('✅ DB connected'))
        .catch(error => console.error('❌ Error connecting to DB:', error));

const startApi = () => {
    const api = express();

    api.use(cors());
    api.use(express.json());  // 💡 <--- 🔥 ESTO ES CLAVE PARA PODER LEER req.body

    api.get('/', (req, res) => res.send('Hello, APIO!'));

    api.use('/users', usersRouter);

    api.use(errorHandler);

    api.listen(process.env.PORT, () => console.log(`🚀 API running on port ${process.env.PORT}`));
};

connectToDb().then(startApi).catch(error => console.error('❌ API startup error:', error));
