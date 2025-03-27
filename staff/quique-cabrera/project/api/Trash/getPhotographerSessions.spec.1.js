import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { Session, Photographer, User, Customer } from '../data/models.js'
import getPhotographerSessions from '../logic/getPhotographerSessions.js'

describe('📸 getPhotographerSessions', () => {
    let photographerId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => {
        return Promise.all([
            Session.deleteMany(),
            Photographer.deleteMany(),
            Customer.deleteMany(),
            User.deleteMany()
        ])
            .then(() => {
                return User.create({
                    name: 'Fotógrafo Test',
                    email: 'fotografo@test.com',
                    phone: '600000001',
                    username: 'fototest',
                    password: 'hashedpass',
                    role: 'photographer'
                })
            })
            .then(userPhotographer => {
                return Photographer.create({
                    user: userPhotographer._id,
                    coverage_area: 'Barcelona'
                }).then(photographer => {
                    photographerId = photographer._id

                    return User.create({
                        name: 'Cliente Test',
                        email: 'cliente@test.com',
                        phone: '600000002',
                        username: 'clientetest',
                        password: 'hashedpass',
                        role: 'customer'
                    })
                })
            })
            .then(userCustomer => {
                return Customer.create({
                    user: userCustomer._id,
                    address: 'Calle Prueba 123'
                })
            })
            .then(customer => {
                return Session.create({
                    photographer: photographerId,
                    customer: customer._id,
                    date: new Date(),
                    type: 'express',
                    address: {
                        type: 'Calle',
                        street: 'Test 123',
                        city: 'BCN',
                        postalCode: '08001',
                        province: 'Barcelona'
                    },
                    services: ['Foto']
                })
            })
    })

    it('✅ devuelve las sesiones del fotógrafo con el cliente populado', () => {
        return getPhotographerSessions(photographerId)
            .then(sessions => {
                expect(sessions).to.be.an('array')
                expect(sessions.length).to.be.greaterThan(0)

                const session = sessions[0]
                expect(session).to.have.property('photographer')
                expect(session).to.have.property('customer')
                expect(session.customer).to.be.an('object')
                expect(session.customer.name).to.equal('Cliente Test')
            })
    })

    after(() => {
        return Promise.all([
            Session.deleteMany(),
            Photographer.deleteMany(),
            Customer.deleteMany(),
            User.deleteMany()
        ]).then(() => mongoose.disconnect())
    })
})
