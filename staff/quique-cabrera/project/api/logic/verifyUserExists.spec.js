import { expect } from 'chai'
import mongoose from 'mongoose'
import { User } from '../data/models.js'
import verifyUserExists from './verifyUserExists.js'

describe('verifyUserExists', () => {
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


    after(() => mongoose.disconnect())
})
