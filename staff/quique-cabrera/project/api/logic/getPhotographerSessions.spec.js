import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { Session, Photographer, User, Customer } from '../data/models.js'
import getPhotographerSessions from './getPhotographerSessions.js'

describe('getPhotographerSessions', () => {
    let photographerId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(async () => {
        await Promise.all([
            Session.deleteMany(),
            Photographer.deleteMany(),
            Customer.deleteMany(),
            User.deleteMany()
        ])

        const userPhotographer = await User.create({
            name: 'Fotógrafo Test',
            email: 'fotografo@test.com',
            phone: '600000001',
            username: 'fototest',
            password: 'hashedpass',
            role: 'photographer'
        })

        const photographer = await Photographer.create({
            user: userPhotographer._id,
            coverage_area: 'Barcelona'
        })

        photographerId = photographer._id

        const userCustomer = await User.create({
            name: 'Cliente Test',
            email: 'cliente@test.com',
            phone: '600000002',
            username: 'clientetest',
            password: 'hashedpass',
            role: 'customer'
        })

        const customer = await Customer.create({
            user: userCustomer._id,
            address: 'Calle Prueba 123'
        })

        await Session.create({
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

    it('✅ devuelve las sesiones del fotógrafo con el cliente populado', async () => {
        const sessions = await getPhotographerSessions(photographerId)

        expect(sessions).to.be.an('array')
        expect(sessions.length).to.be.greaterThan(0)

        const session = sessions[0]
        expect(session).to.have.property('photographer')
        expect(session).to.have.property('customer')
        expect(session.customer).to.be.an('object')
        expect(session.customer.name).to.equal('Cliente Test')
    })

    it('❌ devuelve array vacío si no hay sesiones para el fotógrafo', async () => {
        await Session.deleteMany()
        const sessions = await getPhotographerSessions(photographerId)
        expect(sessions).to.be.an('array').that.is.empty
    })

    it('❌ lanza error si el ID del fotógrafo es inválido', async () => {
        try {
            await getPhotographerSessions('not-a-valid-id')
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error.message).to.include('Cast to ObjectId failed')
        }
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