import { expect } from 'chai'
import authenticateUser from './authenticateUser.js'
import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'

describe('authenticateUser', () => {
    let user

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10)
        user = await User.create({
            username: 'testuser',
            password: hashedPassword,
            name: 'Test User',
            email: 'test@example.com',
            role: 'customer'
        })
    })

    afterEach(async () => {
        await User.deleteMany({})
    })

    it('should authenticate user with correct credentials', async () => {
        const result = await authenticateUser('testuser', 'password123')

        expect(result).to.exist
        expect(result._id).to.equal(user._id.toString())
        expect(result.username).to.equal('testuser')
        expect(result.name).to.equal('Test User')
        expect(result.email).to.equal('test@example.com')
        expect(result.role).to.equal('customer')
    })

    it('should throw error with incorrect password', async () => {
        try {
            await authenticateUser('testuser', 'wrongpassword')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error.message).to.equal('Credenciales incorrectas')
        }
    })

    it('should throw error with non-existent username', async () => {
        try {
            await authenticateUser('nonexistent', 'password123')
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error.message).to.equal('Credenciales incorrectas')
        }
    })
}) 