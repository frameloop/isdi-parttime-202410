import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import getUserName from './getUserName.js'
import { User } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('getUserName', () => {
    let user

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})

        // Creamos un usuario real
        user = await User.create({
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'customer',
            phone: '123456789'
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    it('should return user name for a valid user ID', async () => {
        const name = await getUserName(user._id.toString())

        expect(name).to.be.a('string')
        expect(name).to.equal('Test User')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        const fakeUserId = new mongoose.Types.ObjectId().toString()

        try {
            await getUserName(fakeUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Usuario no encontrado')
        }
    })
})
