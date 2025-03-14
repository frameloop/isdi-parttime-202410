import mongoose from 'mongoose';

const { Schema, model, Types: { ObjectId } } = mongoose;

// 🔹 Esquema de usuario
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // ⛒️ Evita que la contraseña se incluya en las consultas
    role: { type: String, required: true, enum: ['customer', 'photographer', 'administrator'] }
});

// 🔹 Esquema de servicio
const serviceSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});

// 🔹 Esquema de sesión (fotógrafo + cliente)
const sessionSchema = new Schema({
    date: { type: Date, required: true },
    photographer: { type: ObjectId, ref: 'Photographer', required: true },
    customer: { type: ObjectId, ref: 'Customer', required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    type: { type: String, required: true }
});

// 🔹 Esquema de cliente (customer) con sesiones
const customerSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    address: { type: String, required: true, unique: true },
    services: [serviceSchema],
    sessions: [{ type: ObjectId, ref: 'Session' }]
});

// 🔹 Esquema de fotógrafo (photographer) con disponibilidad y sesiones
const photographerSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    coverage_area: { type: String, required: true }, // 🔴 REQUERIDO
    sessions: [{ type: ObjectId, ref: 'Session' }]
});

// 🔹 Esquema de disponibilidad corregido
const availabilitySchema = new Schema({
    photographer: { type: ObjectId, ref: 'Photographer', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // 🕒 Guarda la hora en formato "HH:mm"
    endTime: { type: String, required: true }, // 🕒 Guarda la hora en formato "HH:mm"
    available: { type: Boolean, default: true }
}, { timestamps: true });

// 🔹 Agregar índice único para evitar duplicados en el mismo horario
availabilitySchema.index(
    { photographer: 1, date: 1, startTime: 1, endTime: 1 },
    { unique: true }
);

// 📄 Modelos de MongoDB
const User = model('User', userSchema);
const Customer = model('Customer', customerSchema);
const Photographer = model('Photographer', photographerSchema);
const Service = model('Service', serviceSchema);
const Session = model('Session', sessionSchema);
const Availability = model('Availability', availabilitySchema);

// 📤 Exportamos los modelos
export { User, Customer, Photographer, Service, Session, Availability };
