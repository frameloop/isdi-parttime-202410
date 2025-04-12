import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import getUserName from './getUserName.js'
import { User } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

describe('getUserName', () => {
    let userId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => {
        return User.deleteMany()
            .then(() => {
                return User.create({
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '123456789',
                    username: 'testuser',
                    password: 'password123',
                    role: 'customer'
                })
            })
            .then(user => {
                userId = user._id.toString()
            })
    })

    it('✅ devuelve el nombre del usuario si el ID es válido', () => {
        return getUserName(userId)
            .then(name => {
                expect(name).to.equal('Test User')
            })
    })

    it('❌ lanza NotFoundError si el usuario no existe', () => {
        const fakeId = new mongoose.Types.ObjectId().toString()

        return User.deleteMany()
            .then(() => getUserName(fakeId))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    after(() => {
        return User.deleteMany().then(() => mongoose.disconnect())
    })
})
