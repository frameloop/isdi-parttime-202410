
import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import verifyUserLogic from './verifyUserLogic.js'
import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import { NotFoundError } from 'com'

describe('verifyUserLogic', () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should return user name if user exists', async () => {
        const hashedPassword = await bcrypt.hash('mockpass', 10)

        await User.create({
            username: 'greetinguser',
            name: 'Saludador',
            email: 'hello@test.com',
            password: hashedPassword,
            phone: '+34123456789',
            role: 'customer'
        })

        const result = await verifyUserLogic('greetinguser')

        expect(result).to.be.an('object')
        expect(result.name).to.equal('Saludador')
        expect(result).to.not.have.property('email')
        expect(result).to.not.have.property('role')
    })

    it('should throw NotFoundError if user does not exist', async () => {
        try {
            await verifyUserLogic('nouserhere')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })

})
