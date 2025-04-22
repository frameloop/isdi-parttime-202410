import { expect } from 'chai'
import registerUser from './registerUser.js'
import { User } from '../../data/models.js'
import { DuplicityError } from 'com'

describe('registerUser', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('should register a new user successfully', async () => {
        const userData = {
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
            email: 'test@example.com'
        }

        const result = await registerUser(
            userData.username,
            userData.password,
            userData.name,
            userData.email
        )

        expect(result).to.exist
        expect(result.username).to.equal(userData.username)
        expect(result.name).to.equal(userData.name)
        expect(result.email).to.equal(userData.email)
        expect(result.role).to.equal('customer')

        const user = await User.findById(result._id)
        expect(user).to.exist
        expect(user.username).to.equal(userData.username)
    })

    it('should throw error when username already exists', async () => {
        const userData = {
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
            email: 'test@example.com'
        }

        await registerUser(
            userData.username,
            userData.password,
            userData.name,
            userData.email
        )

        try {
            await registerUser(
                userData.username,
                'anotherpassword',
                'Another User',
                'another@example.com'
            )
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('El usuario ya existe')
        }
    })
}) 