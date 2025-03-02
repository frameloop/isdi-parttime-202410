import 'dotenv/config'
import { expect } from 'chai'

import mongoose from 'mongoose'
import { User } from '../data/models.js'

import getUserName from './getUserName.js'

import { errors } from 'com'
const { NotFoundError } = errors

const { Types: { ObjectId } } = mongoose

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return User.create({ name: 'Hommer Simpson', email: 'homer@simpson.es', username: 'homer', password: '123123123' })
            .then(user => getUserName(user._id.toString()))
            .then(name => expect(name).to.equal('Hommer Simpson'))
    })

    it('fails on wrong user id', () => {
        let catchedError

        return User.create({ name: 'Hommer Simpson', email: 'homer@simpson.es', username: 'homer', password: '123123123' })
            .then(user => getUserName(new ObjectId().toString()))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})