import mongoose from 'mongoose';

const { Schema, model, Types: { ObjectId } } = mongoose;

// Esquema de usuario
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // ⛔️ Evita que se incluya en las consultas
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'photographer', 'administrator']
    }
});

// Esquema de servicio
const service = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Esquema de sesión
const session = new Schema({
    date: {
        type: Date,
        required: true
    },
    photographer: {
        type: ObjectId,
        ref: 'Photographer',
        required: true
    },
    customer: {
        type: ObjectId,
        ref: 'Customer',
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    }
});

// Esquema de cliente con sesiones
const customer = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    services: [service],
    sessions: [{
        type: ObjectId,
        ref: 'Session'
    }]
});

// Esquema de fotógrafo con disponibilidad y sesiones
const photographer = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    coverage_area: {
        type: String,
        required: true
    },
    availability: [{
        day: {
            type: String,
            required: true
        },
        slots: [{
            type: String,
            required: true
        }]
    }],
    sessions: [{
        type: ObjectId,
        ref: 'Session'
    }]
});

// Modelos
const User = model('User', user);
const Customer = model('Customer', customer);
const Photographer = model('Photographer', photographer);
const Service = model('Service', service);
const Session = model('Session', session);

export { User, Customer, Photographer, Service, Session };
