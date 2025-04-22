import { expect } from 'chai'
import getCustomerSessions from './getCustomerSessions.js'
import { Session, User, Photographer } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('getCustomerSessions', () => {
    let customer, photographer, session

    beforeEach(async () => {
        // Crear usuario cliente
        customer = await User.create({
            username: 'testcustomer',
            password: 'password123',
            name: 'Test Customer',
            email: 'customer@example.com',
            role: 'customer'
        })

        // Crear usuario fotógrafo
        const photographerUser = await User.create({
            username: 'testphotographer',
            password: 'password123',
            name: 'Test Photographer',
            email: 'photographer@example.com',
            role: 'photographer'
        })

        // Crear perfil de fotógrafo
        photographer = await Photographer.create({
            user: photographerUser._id,
            name: 'Test Photographer'
        })

        // Crear sesión
        session = await Session.create({
            customer: customer._id,
            photographer: photographer._id,
            date: new Date(),
            duration: 60,
            status: 'pending'
        })
    })

    afterEach(async () => {
        await Session.deleteMany({})
        await User.deleteMany({})
        await Photographer.deleteMany({})
    })

    it('should get customer sessions', async () => {
        const sessions = await getCustomerSessions(customer._id.toString())

        expect(sessions).to.be.an('array')
        expect(sessions).to.have.lengthOf(1)
        expect(sessions[0]._id).to.equal(session._id.toString())
        expect(sessions[0].photographer._id).to.equal(photographer._id.toString())
        expect(sessions[0].photographer.name).to.equal('Test Photographer')
        expect(sessions[0].duration).to.equal(60)
        expect(sessions[0].status).to.equal('pending')
    })

    it('should throw error when customer has no sessions', async () => {
        await Session.deleteMany({})

        try {
            await getCustomerSessions(customer._id.toString())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('No se encontraron sesiones para este cliente')
        }
    })
}) 