import 'dotenv/config'
import { expect } from 'chai'

import mongoose from 'mongoose'
import { User, Post } from '../data/models.js'

import getPosts from './getPosts.js'

import { errors } from 'com'
const { NotFoundError } = errors

const { Types: { ObjectId } } = mongoose

describe('getPosts', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and posts', () => {
        const user1 = new User({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })
        const user2 = new User({ name: 'Hommer Simpson', email: 'homer@simpson.es', username: 'homer', password: '123123123' })
        const post1 = new Post({ author: user1._id, image: 'https://image.com/1', text: 'hello post 1', likes: [user1._id, user2._id] })
        const post2 = new Post({ author: user2._id, image: 'https://image.com/2', text: 'hello post 2' })
        const post3 = new Post({ author: user1._id, image: 'https://image.com/3', text: 'hello post 3', likes: [user1._id] })

        return Promise.all([
            user1.save(),
            user2.save(),
            post1.save(),
            post2.save(),
            post3.save()
        ])
            .then(([user1, user2, post1, post2, post3]) => {
                return getPosts(user1.id)
                    .then(posts => {
                        expect(posts).to.have.lengthOf(3)

                        const post1b = posts.find(post => post.id === post1.id)
                        expect(post1b.author.id).to.equal(user1.id)
                        expect(post1b.author.username).to.equal(user1.username)
                        expect(post1b.image).to.equal(post1.image)
                        expect(post1b.text).to.equal(post1.text)
                        expect(post1b.own).to.be.true
                        expect(post1b.liked).to.be.true
                        expect(post1b.likes).to.equal(2)

                        const post2b = posts.find(post => post.id === post2.id)
                        expect(post2b.author.id).to.equal(user2.id)
                        expect(post2b.author.username).to.equal(user2.username)
                        expect(post2b.image).to.equal(post2.image)
                        expect(post2b.text).to.equal(post2.text)
                        expect(post2b.own).to.be.false
                        expect(post2b.liked).to.be.false
                        expect(post2b.likes).to.equal(0)

                        const post3b = posts.find(post => post.id === post3.id)
                        expect(post3b.author.id).to.equal(user1.id)
                        expect(post3b.author.username).to.equal(user1.username)
                        expect(post3b.image).to.equal(post3.image)
                        expect(post3b.text).to.equal(post3.text)
                        expect(post3b.own).to.be.true
                        expect(post3b.liked).to.be.true
                        expect(post3b.likes).to.equal(1)
                    })
            })
    })

    it('fails on non-existing user', () => {
        let catchedError

        const user1 = new User({ name: 'Troy McClure', email: 'troy@mcclure.es', username: 'troymcclure', password: '346734567' })
        const user2 = new User({ name: 'Hommer Simpson', email: 'homer@simpson.es', username: 'homer', password: '123123123' })
        const post1 = new Post({ author: user1._id, image: 'https://image.com/1', text: 'hello post 1', likes: [user1._id, user2._id] })
        const post2 = new Post({ author: user2._id, image: 'https://image.com/2', text: 'hello post 2' })
        const post3 = new Post({ author: user1._id, image: 'https://image.com/3', text: 'hello post 3', likes: [user1._id] })

        return Promise.all([
            user1.save(),
            user2.save(),
            post1.save(),
            post2.save(),
            post3.save()
        ])
            .then(([user1, user2, post1, post2, post3]) => getPosts(new ObjectId().toString()))
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