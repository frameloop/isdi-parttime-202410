import { expect } from 'chai'
import verifyUserExists from './verifyUserExists.js'
import { User } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('verifyUserExists', () => {
    let user

    beforeEach(async () => {
        user = await User.create({
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'customer'
        })
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    it('should verify existing user', async () => {
        const result = await verifyUserExists('testuser')

        expect(result).to.exist
        expect(result._id).to.equal(user._id.toString())
        expect(result.username).to.equal('testuser')
        expect(result.name).to.equal('Test User')
        expect(result.role).to.equal('customer')
    })

    it('should throw error when user not found', async () => {
        try {
            await verifyUserExists('nonexistent')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Usuario no encontrado')
        }
    })
}) 