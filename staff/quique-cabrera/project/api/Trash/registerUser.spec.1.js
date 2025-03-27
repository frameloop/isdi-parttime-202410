import 'dotenv/config'
import { expect } from 'chai'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { User, Photographer } from '../data/models.js'
import registerUser from '../logic/registerUser.js'

import errors from 'com'

const { DuplicityError, SystemError } = errors

describe('👤 registerUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGO_URL))

    beforeEach(() => {
        return Promise.all([
            User.deleteMany(),
            Photographer.deleteMany()
        ])
    })

    it('✅ registra un usuario customer correctamente', () => {
        return registerUser(
            'Cliente Uno',
            'cliente1@example.com',
            '666111222',
            'cliente1',
            'Secure123!',
            'customer'
        )
            .then(user => {
                expect(user).to.have.property('_id')
                expect(user.role).to.equal('customer')

                return bcrypt.compare('Secure123!', user.password)
            })
            .then(match => {
                expect(match).to.be.true
            })
    })

    it('✅ registra un fotógrafo y crea su perfil', () => {
        return registerUser(
            'Foto Uno',
            'foto@example.com',
            '666000000',
            'fotouno',
            'Secure123!',
            'photographer',
            '08001'
        )
            .then(user => {
                expect(user.role).to.equal('photographer')

                return Photographer.findOne({ user: user._id })
            })
            .then(profile => {
                expect(profile.coverage_area).to.equal('08001')
            })
    })

    it('❌ lanza DuplicityError si el email ya está registrado', () => {
        return registerUser('Cliente', 'repetido@mail.com', '600123123', 'user1', '12345678A', 'customer')
            .then(() => registerUser('Otro', 'repetido@mail.com', '600456456', 'user2', '12345678B', 'customer'))
            .then(() => {
                throw new Error('No lanzó DuplicityError')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.include('ya está registrado')
            })
    })

    it('❌ lanza SystemError si el rol es inválido', () => {
        return registerUser('Fail', 'fail@mail.com', '600999999', 'failuser', 'Fail123!', 'pirata')
            .then(() => {
                throw new Error('No lanzó SystemError por rol inválido')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.include('no válido')
            })
    })

    it('❌ lanza SystemError si falta cobertura para fotógrafo', () => {
        return registerUser('NoCover', 'nocover@mail.com', '666888999', 'nocover', 'Secure123!', 'photographer')
            .then(() => {
                throw new Error('No lanzó SystemError por falta de cobertura')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.include('cobertura')
            })
    })

    after(() => mongoose.disconnect())
})
