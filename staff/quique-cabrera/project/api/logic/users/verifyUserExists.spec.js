import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import verifyUserExists from './verifyUserExists.js'
import { User } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('verifyUserExists', () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should return user data if user exists', async () => {
        const createdUser = await User.create({
            username: 'existinguser',
            password: 'password123',
            name: 'Existing User',
            email: 'existing@example.com',
            role: 'customer',
            phone: '123456789'
        })

        const result = await verifyUserExists('existinguser')

        expect(result).to.exist
        expect(result._id.toString()).to.equal(createdUser._id.toString())
        expect(result.username).to.equal('existinguser')
        expect(result.name).to.equal('Existing User')
        expect(result.role).to.equal('customer')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        try {
            await verifyUserExists('nonexistentuser')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Usuario no encontrado')
        }
    })
})
