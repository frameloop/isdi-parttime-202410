import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'

import { Session, Customer, Photographer, User } from '../data/models.js'
import getCustomerSessions from './getCustomerSessions.js'

// 🧪 Test suite
describe('getCustomerSessions', () => {
    let customerId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(async () => {
        await Promise.all([
            Session.deleteMany(),
            Customer.deleteMany(),
            Photographer.deleteMany(),
            User.deleteMany()
        ])

        const userCustomer = await User.create({
            name: 'Cliente Test',
            email: 'cliente@test.com',
            phone: '600000000',
            username: 'clienteuser',
            password: 'hashedpassword',
            role: 'customer'
        })

        const customer = await Customer.create({
            user: userCustomer._id,
            address: 'Calle Falsa 123'
        })

        customerId = customer._id

        const userPhotographer = await User.create({
            name: 'Fotógrafo Test',
            email: 'fotografo@test.com',
            phone: '699999999',
            username: 'fotografouser',
            password: 'hashedpassword',
            role: 'photographer'
        })

        const photographer = await Photographer.create({
            user: userPhotographer._id,
            coverage_area: '08001'
        })

        await Session.create({
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

    it('✅ devuelve las sesiones del cliente con fotógrafo populado', async () => {
        const sessions = await getCustomerSessions(customerId)

        expect(sessions).to.be.an('array')
        expect(sessions).to.have.lengthOf(1)

        const session = sessions[0]
        expect(session).to.have.property('photographer')
        expect(session.photographer).to.be.an('object')
        expect(session.photographer.name).to.equal('Fotógrafo Test')
    })

    it('❌ devuelve un array vacío si el cliente no tiene sesiones', async () => {
        const otherUser = await User.create({
            name: 'Cliente Sin Sesiones',
            email: 'nuevo@test.com',
            phone: '600000001',
            username: 'newuser',
            password: '123456',
            role: 'customer'
        })

        const otherCustomer = await Customer.create({
            user: otherUser._id,
            address: 'Otra calle 999'
        })

        const sessions = await getCustomerSessions(otherCustomer._id)
        expect(sessions).to.be.an('array').that.is.empty
    })

    it('❌ lanza error si el ID no es válido', async () => {
        try {
            await getCustomerSessions('ID_INVÁLIDO')
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.include('Cast to ObjectId')
        }
    })

    after(() => mongoose.disconnect())
})
