import 'dotenv/config'
import { expect } from 'chai'

import mongoose from 'mongoose'
import { User, Post } from '../data/models.js'

import createPost from './createPost.js'

import { errors } from 'com'
const { NotFoundError } = errors

const { Types: { ObjectId } } = mongoose

describe('createPost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () => {
        return User.create({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })
            .then(user => {
                return createPost(user._id.toString(), 'https://static.wikia.nocookie.net/lossimpson/images/b/bd/Homer_Simpson.png/revision/latest?cb=20100522180809&path-prefix=es', 'hello you')
                    .then(result => {
                        expect(result).to.be.undefined

                        return Post.findOne()
                    })
                    .then(post => {
                        expect(post.author.toString()).to.equal(user._id.toString())
                        expect(post.image).to.equal('https://static.wikia.nocookie.net/lossimpson/images/b/bd/Homer_Simpson.png/revision/latest?cb=20100522180809&path-prefix=es')
                        expect(post.text).to.equal('hello you')
                    })
            })
    })

    it('fails on wrong user id', () => {
        let catchedError

        return User.create({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })
            .then(user => createPost(new ObjectId().toString(), 'https://static.wikia.nocookie.net/lossimpson/images/b/bd/Homer_Simpson.png/revision/latest?cb=20100522180809&path-prefix=es', 'hello you'))
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('user not found')
            })
    })

    // ...

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})