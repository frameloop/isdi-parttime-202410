import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../data/models.js'
import verifyUserExists from '../logic/verifyUserExists.js'
import errors from 'com'

const { CredentialsError, SystemError } = errors

describe('🔍 verifyUserExists', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('✅ devuelve true si el usuario existe', () => {
        return new User({
            name: 'Test User',
            email: 'test@example.com',
            phone: '600000000',
            username: 'testuser',
            password: 'hashed123',
            role: 'customer'
        }).save()
            .then(user => {
                return verifyUserExists('testuser')
                    .then(result => {
                        expect(result).to.be.an('object')
                        expect(result.success).to.be.true
                        expect(result.name).to.equal(user.name)
                        expect(result.email).to.equal(user.email)
                    })
            })
    })

    it('❌ lanza CredentialsError si el usuario no existe', () => {
        return verifyUserExists('nonexistent')
            .then(() => {
                throw new Error('Debía lanzar CredentialsError')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('❌ lanza SystemError si el username es inválido', () => {
        return verifyUserExists('')
            .then(() => {
                throw new Error('Debía lanzar SystemError')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
            })
    })

    after(() => mongoose.disconnect())
})
