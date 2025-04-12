import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'

import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'

import { errors } from 'com'
const { SystemError } = errors

import authenticateUser from './authenticateUser.js'

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('✅ autentica correctamente un usuario existente', () => {
        return bcrypt.hash('TestPass123!', 10)
            .then(hash => User.create({
                name: 'Zoe Tester',
                email: 'zoe@test.com',
                phone: '600000000',
                username: 'zoetester',
                password: hash,
                role: 'customer'
            }))
            .then(() => authenticateUser('zoetester', 'TestPass123!'))
            .then(user => {
                expect(user).to.include.all.keys('_id', 'username', 'name', 'email', 'role')
                expect(user.username).to.equal('zoetester')
            })
    })

    it('❌ lanza SystemError si falta username', () => {
        let error

        return authenticateUser('', 'loquesea')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
            })
    })

    it('❌ lanza SystemError si falta password', () => {
        let error

        return authenticateUser('zoetester', '')
            .catch(err => error = err)
            .finally(() => {
                expect(error).to.be.instanceOf(SystemError)
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
