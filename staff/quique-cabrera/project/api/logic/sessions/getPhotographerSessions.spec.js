import { expect } from 'chai'
import getPhotographerSessions from './getPhotographerSessions.js'
import { Session, User, Photographer } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('getPhotographerSessions', () => {
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

    it('should get photographer sessions', async () => {
        const sessions = await getPhotographerSessions(photographer._id.toString())

        expect(sessions).to.be.an('array')
        expect(sessions).to.have.lengthOf(1)
        expect(sessions[0]._id).to.equal(session._id.toString())
        expect(sessions[0].customer._id).to.equal(customer._id.toString())
        expect(sessions[0].customer.name).to.equal('Test Customer')
        expect(sessions[0].duration).to.equal(60)
        expect(sessions[0].status).to.equal('pending')
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
}) 