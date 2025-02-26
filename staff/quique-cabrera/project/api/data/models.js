import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'photographer', 'administrator']
    }
})

const service = Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
})

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
    services: [service]
})



const User = model('User', user)
const Customer = model('Customer', customer)
const Service = model('Service', service)

export {
    User,
    Customer,
    Service
}