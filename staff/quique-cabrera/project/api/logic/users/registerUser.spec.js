import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import registerUser from './registerUser.js'
import { User } from '../../data/models.js'
import { DuplicityError, SystemError } from 'com'

describe('registerUser', () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should register a user successfully with valid data', async () => {
        const result = await registerUser(
            'newuser',
            'StrongPass123!',
            'Nuevo Usuario',
            'nuevo@correo.com',
            '+34666000123'
        )

        expect(result).to.have.property('id')
        expect(result.username).to.equal('newuser')
        expect(result.name).to.equal('Nuevo Usuario')
        expect(result.email).to.equal('nuevo@correo.com')
        expect(result.phone).to.equal('+34666000123')
        expect(result.role).to.equal('customer')

        const userInDb = await User.findOne({ username: 'newuser' }).select('+password')
        const isMatch = await bcrypt.compare('StrongPass123!', userInDb.password)
        expect(isMatch).to.be.true
    })

    it('should throw DuplicityError if username or email already exists', async () => {
        await registerUser(
            'repeateduser',
            'Pass123!',
            'Usuario Uno',
            'repeated@correo.com',
            '+34666000999'
        )

        try {
            await registerUser(
                'repeateduser',
                'OtraPass123!',
                'Usuario Dos',
                'repeated@correo.com',
                '+34666000888'
            )
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('El usuario ya existe')
        }
    })

    it('should throw SystemError if validation fails (invalid email)', async () => {
        try {
            await registerUser(
                'bademailuser',
                'ValidPass123!',
                'Nombre Malo',
                'no-es-email',
                '+34666111222'
            )
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(SystemError)
            expect(error.message).to.match(/email/i)
        }
    })
})
