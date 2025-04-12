import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../data/models.js'
import verifyUserExists from './verifyUserExists.js'

import { errors } from 'com'
const { SystemError, CredentialsError } = errors

describe('verifyUserExists', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('✅ devuelve true si el usuario existe', async () => {
        const testUser = await new User({
            name: 'Test User',
            email: 'test@example.com',
            phone: '600000000',
            username: 'testuser',
            password: 'hashed123',
            role: 'customer'
        }).save()

        const result = await verifyUserExists('testuser')

        expect(result).to.be.an('object')
        expect(result.success).to.be.true
        expect(result.name).to.equal(testUser.name)
        expect(result.email).to.equal(testUser.email)
    })

    it('❌ lanza CredentialsError si el usuario no existe', async () => {
        try {
            await verifyUserExists('nonexistentuser')
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('❌ lanza SystemError si ocurre un error inesperado', async () => {
        // Sobrescribimos temporalmente User.findOne para simular fallo
        const originalFindOne = User.findOne
        User.findOne = () => { throw new Error('fallo inesperado') }

        try {
            await verifyUserExists('testuser')
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
            expect(error.message).to.equal('fallo inesperado')
        } finally {
            User.findOne = originalFindOne // restauramos
        }
    })

    after(() => mongoose.disconnect())
})
