import 'dotenv/config'
import { expect } from 'chai'

import mongoose from 'mongoose'
import { User } from '../data/models.js'

import authenticateUser from './authenticateUser.js'

import { errors } from 'com'
const { CredentialsError } = errors

import bcrypt from 'bcryptjs'

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return bcrypt.hash('346734567', 10)
            .then(hash => User.create({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: hash }))
            .then(() => authenticateUser('troymcclure', '346734567'))
            .then(userId => {
                expect(userId).to.be.a.string

                return User.findById(userId)
            })
            .then(user => {
                expect(user.username).to.equal('troymcclure')

                return bcrypt.compare('346734567', user.password)
            })
            .then(match => expect(match).to.be.true)
    })

    it('fails on wrong username', () => {
        let catchedError

        return bcrypt.hash('123123123', 10)
            .then(hash => User.create({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: hash }))
            .then(() => authenticateUser('pepitogrill', '346734567'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    it('fails on wrong password', () => {
        let catchedError

        return bcrypt.hash('123123123', 10)
            .then(hash => User.create({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: hash }))
            .then(() => authenticateUser('troymcclure', '12312312'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).instanceOf(CredentialsError)
                expect(catchedError.message).to.equal('wrong credentials')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})