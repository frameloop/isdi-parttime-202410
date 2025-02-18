import 'dotenv/config'
import { expect } from 'chai'

import mongoose from 'mongoose'
import { User } from '../data/models.js'

import registerUser from './registerUser.js'

import { errors } from 'com'
const { DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () => {
        return registerUser('Apu Nahasapeemapetilon', 'apu@Nahasapeemapetilon.es', 'apunaha', '123123123')
            .then(result => {
                expect(result).to.be.undefined

                return User.findOne()
            })
            .then(user => {
                expect(user.name).to.equal('Apu Nahasapeemapetilon')
                expect(user.email).to.equal('apu@Nahasapeemapetilon.es')
                expect(user.username).to.equal('apunaha')
                expect(user.password).to.equal('123123123')
            })
    })

    it('fails on existing user', () => {
        let catchedError

        return User.create({ name: 'Ned Flanders', email: 'ned@flanders.es', username: 'flanders', password: '12341234' })
            .then(() => registerUser('Ned Flanders', 'ned@flanders.es', 'flanders', '12341234'))
            .catch(error => catchedError = error)
            .then(() => {
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('user already exists')
            })
    })
    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})

