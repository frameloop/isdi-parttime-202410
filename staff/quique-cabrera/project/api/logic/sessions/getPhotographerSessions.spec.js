import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import getPhotographerSessions from './getPhotographerSessions.js'
import { Session, User, Photographer } from '../../data/models.js'
import { NotFoundError, SystemError } from 'com'

describe('getPhotographerSessions', () => {
    let customer, photographerUser, photographer, session

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await Session.deleteMany({})
        await User.deleteMany({})
        await Photographer.deleteMany({})

        // Crear usuario cliente
        customer = await User.create({
            username: 'testcustomer',
            password: 'password123',
            name: 'Test Customer',
            email: 'customer@example.com',
            role: 'customer',
            phone: '123456789'
        })

        // Crear usuario fotógrafo (ahora con phone ✅)
        photographerUser = await User.create({
            username: 'testphotographer',
            password: 'password123',
            name: 'Test Photographer',
            email: 'photographer@example.com',
            role: 'photographer',
            phone: '987654321' // ✅ añadido
        })

        // Crear perfil de fotógrafo
        photographer = await Photographer.create({
            user: photographerUser._id,
            coverage_area: 'Barcelona'
        })

        // Crear sesión
        session = await Session.create({
            customer: customer._id,
            photographer: photographer._id,
            type: '360',
            startDate: new Date(),
            endDate: new Date(Date.now() + 60 * 60 * 1000),
            date: new Date(),
            status: 'scheduled'
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })

    afterEach(async () => {
        await Session.deleteMany({})
        await User.deleteMany({})
        await Photographer.deleteMany({})
    })

    it('should get photographer sessions', async () => {
        const sessions = await getPhotographerSessions(photographer._id.toString())

        expect(sessions).to.be.an('array')
        expect(sessions).to.have.lengthOf(1)

        const sessionFetched = sessions[0]

        expect(sessionFetched.id.toString()).to.equal(session._id.toString())
        expect(sessionFetched.date).to.be.a('date')
        expect(sessionFetched.status).to.equal('scheduled')

        expect(sessionFetched.customer).to.be.an('object')
        expect(sessionFetched.customer.id.toString()).to.equal(customer._id.toString())
        expect(sessionFetched.customer.name).to.equal('Test Customer')
        expect(sessionFetched.customer.phone).to.equal('123456789')
    })

    it('should throw error when photographer has no sessions', async () => {
        await Session.deleteMany({})

        try {
            await getPhotographerSessions(photographer._id.toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('No se encontraron sesiones para este fotógrafo')
        }
    })

    it('should throw SystemError if an unexpected error occurs', async () => {
        // Forzamos un error inesperado pasando un tipo inválido (por ejemplo, un objeto en vez de string)
        try {
            await getPhotographerSessions({}) // Esto debería provocar un error de validación
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
        }
    })
})
