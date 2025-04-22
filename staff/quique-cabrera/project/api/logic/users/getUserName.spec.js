import { expect } from 'chai'
import getUserName from './getUserName.js'
import { User } from '../../data/models.js'
import { NotFoundError } from 'com'

describe('getUserName', () => {
    let user

    beforeEach(async () => {
        user = await User.create({
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'customer'
        })
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    it('should get user name by id', async () => {
        const name = await getUserName(user._id.toString())
        expect(name).to.equal('Test User')
    })

    it('should throw error when user not found', async () => {
        try {
            await getUserName('nonexistentid')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Usuario no encontrado')
        }
    })
}) 