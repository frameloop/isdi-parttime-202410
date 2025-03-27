import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'

import { Session, Customer, Photographer, User } from '../data/models.js'
import getCustomerSessions from './getCustomerSessions.js'

describe('getCustomerSessions', () => {
    let customerId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))


    beforeEach(() => {
        return Promise.all([
            Session.deleteMany(),
            Customer.deleteMany(),
            Photographer.deleteMany(),
            User.deleteMany()
        ])
            .then(() => {
                return User.create({
                    name: 'Cliente Test',
                    email: 'cliente@test.com',
                    phone: '600000000',
                    username: 'clienteuser',
                    password: 'hashedpassword',
                    role: 'customer'
                })
            })
            .then(userCustomer => {
                return Customer.create({
                    user: userCustomer._id,
                    address: 'Calle Falsa 123'
                }).then(customer => {
                    customerId = customer._id
                    return User.create({
                        name: 'Fotógrafo Test',
                        email: 'fotografo@test.com',
                        phone: '699999999',
                        username: 'fotografouser',
                        password: 'hashedpassword',
                        role: 'photographer'
                    })
                })
            })
            .then(userPhotographer => {
                return Photographer.create({
                    user: userPhotographer._id,
                    coverage_area: '08001'
                }).then(photographer => {
                    return Session.create({
                        customer: customerId,
                        photographer: photographer._id,
                        date: new Date(),
                        type: 'express',
                        services: ['Tour'],
                        address: {
                            type: 'Calle',
                            street: 'Principal 456',
                            postalCode: '08001',
                            city: 'Barcelona',
                            province: 'Barcelona'
                        }
                    })
                })
            })
    })

    it('✅ devuelve las sesiones del cliente con fotógrafo populado', () => {
        return getCustomerSessions(customerId)
            .then(sessions => {
                expect(sessions).to.be.an('array')
                expect(sessions).to.have.lengthOf(1)

                const session = sessions[0]
                expect(session).to.have.property('photographer')
                expect(session.photographer).to.be.an('object')
                expect(session.photographer.name).to.equal('Fotógrafo Test')
            })
    })

    after(() => {
        return Promise.all([
            Session.deleteMany(),
            Customer.deleteMany(),
            Photographer.deleteMany(),
            User.deleteMany()
        ]).then(() => mongoose.disconnect())
    })
})
