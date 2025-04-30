import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import loginUserLogic from './loginUserLogic.js'
import { User, Photographer } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

before(() => {
    // Guardar los originales
    console._log = console.log;
    console._warn = console.warn;
    console._error = console.error;
    // Silenciar todos
    console.log = () => { };
    console.warn = () => { };
    console.error = () => { };
});

after(() => {
    // Restaurar los originales
    console.log = console._log;
    console.warn = console._warn;
    console.error = console._error;
});

describe('loginUserLogic', () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
        await Photographer.deleteMany({})
    })

    after(async () => {
        await mongoose.connection.close()
    })

    it('should authenticate a valid user and return token and user data', async () => {
        const hashedPassword = await bcrypt.hash('securePass123!', 10)
        const user = await User.create({
            username: 'validuser',
            name: 'Valid User',
            email: 'valid@example.com',
            password: hashedPassword,
            phone: '+34666000111',
            role: 'customer'
        })

        const result = await loginUserLogic('validuser', 'securePass123!')

        expect(result).to.include.keys('token', 'name', 'role', 'userId')
        expect(result.name).to.equal(user.name)
        expect(result.role).to.equal(user.role)
        expect(result.userId).to.equal(user._id.toString())

        const decoded = jwt.verify(result.token, process.env.JWT_SECRET)
        expect(decoded.sub).to.equal(user._id.toString())
        expect(decoded.role).to.equal(user.role)
    })

    it('should include photographerId if user is photographer', async () => {
        const hashedPassword = await bcrypt.hash('photoPass!', 10)
        const user = await User.create({
            username: 'photouser',
            name: 'Photo Pro',
            email: 'photo@example.com',
            password: hashedPassword,
            phone: '+34666000999',
            role: 'photographer'
        })

        const photographer = await Photographer.create({
            user: user._id,
            coverage_area: 'Madrid',
            sessions: []
        })

        const result = await loginUserLogic('photouser', 'photoPass!')
        expect(result.photographerId).to.equal(photographer._id.toString())
    })

    it('should return error object if user is not found', async () => {
        const result = await loginUserLogic('nonexistent', 'anyPassword')

        expect(result).to.have.property('error')
        expect(result.error.error).to.equal('NotFoundError')
        expect(result.status).to.equal(404)
    })

    it('should return error object if password is incorrect', async () => {
        const hashedPassword = await bcrypt.hash('rightPassword', 10)
        await User.create({
            username: 'wrongpass',
            name: 'Wrong Pass',
            email: 'wrong@pass.com',
            password: hashedPassword,
            phone: '+34666111111',
            role: 'customer'
        })

        const result = await loginUserLogic('wrongpass', 'wrongPassword')

        expect(result).to.have.property('error')
        expect(result.error.error).to.equal('CredentialsError')
        expect(result.status).to.equal(401)
    })

    it('should return error object if JWT secret is not configured', async () => {
        const hashedPassword = await bcrypt.hash('noSecretPass', 10)
        await User.create({
            username: 'nosecret',
            name: 'No Secret',
            email: 'nosecret@example.com',
            password: hashedPassword,
            phone: '+34666111222',
            role: 'customer'
        })

        const oldSecret = process.env.JWT_SECRET
        delete process.env.JWT_SECRET

        const result = await loginUserLogic('nosecret', 'noSecretPass')
        expect(result.error.error).to.equal('SystemError')
        expect(result.error.message).to.equal('JWT Secret is not configured')

        // restaurar variable de entorno
        process.env.JWT_SECRET = oldSecret
    })
})
