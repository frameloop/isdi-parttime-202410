import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import getUserName from './getUserName.js'
import { User } from '../data/models.js'

import { errors } from 'com'
const { SystemError, NotFoundError } = errors

describe('getUserName', () => {
    let userId

    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(async () => {
        await User.deleteMany()

        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            phone: '123456789',
            username: 'testuser',
            password: 'password123',
            role: 'customer'
        })

        userId = user._id.toString()
    })

    it('✅ devuelve el nombre del usuario si el ID es válido', async () => {
        const name = await getUserName(userId)
        expect(name).to.equal('Test User')
    })

    it('❌ lanza NotFoundError si el usuario no existe', async () => {
        const fakeId = new mongoose.Types.ObjectId().toString()
        await User.deleteMany()

        try {
            await getUserName(fakeId)
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('❌ lanza SystemError si ocurre un fallo inesperado', async () => {
        const originalFindById = User.findById
        User.findById = () => { throw new Error('fallo inesperado') }

        try {
            await getUserName(userId)
            throw new Error('No se lanzó el error esperado')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
            expect(error.message).to.equal('fallo inesperado')
        } finally {
            User.findById = originalFindById
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
