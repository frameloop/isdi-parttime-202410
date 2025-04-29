import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import authenticateUser from './authenticateUser.js'
import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'

describe('authenticateUser', () => {
    let user

    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})

        const userData = {
            username: 'testuser',
            password: await bcrypt.hash('password123', 10),
            name: 'Test User',
            email: 'test@example.com',
            role: 'customer',
        }

        const userSchemaPaths = Object.keys(User.schema.paths)

        for (const path of userSchemaPaths) {
            if (!userData[path] && User.schema.paths[path].isRequired && path !== '_id' && path !== '__v') {
                userData[path] = `dummy_${path}`
            }
        }

        user = await User.create(userData)
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should authenticate user with correct credentials', async () => {
        const result = await authenticateUser('testuser', 'password123')

        expect(result).to.exist
        expect(result._id.toString()).to.equal(user._id.toString())
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
            expect(error.message).to.be.oneOf([
                'Credenciales incorrectas',
                'invalid password syntax'
            ])
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
