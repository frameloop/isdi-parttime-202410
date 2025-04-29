import { expect } from 'chai'
import {
    handleAuthError,
    blacklistToken,
    isTokenBlacklisted,
    createAuthResponse
} from './authUtils.js'
import {
    SystemError,
    NotFoundError,
    CredentialsError,
    DuplicityError
} from 'com'

describe('authUtils', () => {

    describe('handleAuthError', () => {
        it('should handle NotFoundError with status 404', () => {
            const error = new NotFoundError('User not found')
            const result = handleAuthError(error)

            expect(result).to.deep.equal({
                error: { error: 'NotFoundError', message: 'User not found' },
                status: 404
            })
        })

        it('should handle CredentialsError with status 401', () => {
            const error = new CredentialsError('Invalid credentials')
            const result = handleAuthError(error)

            expect(result).to.deep.equal({
                error: { error: 'CredentialsError', message: 'Invalid credentials' },
                status: 401
            })
        })

        it('should handle DuplicityError with status 409', () => {
            const error = new DuplicityError('Email already exists')
            const result = handleAuthError(error)

            expect(result).to.deep.equal({
                error: { error: 'DuplicityError', message: 'Email already exists' },
                status: 409
            })
        })

        it('should handle SystemError with status 500 and custom message', () => {
            const error = new SystemError('Unexpected failure')
            const result = handleAuthError(error)

            expect(result).to.deep.equal({
                error: { error: 'SystemError', message: 'Unexpected failure' },
                status: 500
            })
        })

        it('should handle generic Error with default status and message', () => {
            const error = new Error('Some generic error')
            const result = handleAuthError(error)

            expect(result).to.deep.equal({
                error: { error: 'Error', message: 'Some generic error' },
                status: 500
            })
        })
    })

    describe('token blacklist', () => {
        it('should blacklist a token and detect it as blacklisted', () => {
            const token = 'abc123'
            blacklistToken(token)

            const isBlacklisted = isTokenBlacklisted(token)
            expect(isBlacklisted).to.be.true
        })

        it('should return false for non-blacklisted token', () => {
            const token = 'nonblacklisted'
            const result = isTokenBlacklisted(token)

            expect(result).to.be.false
        })
    })

    describe('createAuthResponse', () => {
        it('should create auth response without photographerId', () => {
            const user = {
                name: 'Alice',
                role: 'customer',
                _id: '1234567890abcdef'
            }
            const token = 'mocktoken123'

            const result = createAuthResponse(user, token)
            expect(result).to.deep.equal({
                token: 'mocktoken123',
                name: 'Alice',
                role: 'customer',
                userId: '1234567890abcdef'
            })
        })

        it('should create auth response with photographerId', () => {
            const user = {
                name: 'Bob',
                role: 'photographer',
                _id: 'abcdef1234567890'
            }
            const token = 'phototoken456'
            const photographerId = 'photo9999'

            const result = createAuthResponse(user, token, photographerId)
            expect(result).to.deep.equal({
                token: 'phototoken456',
                name: 'Bob',
                role: 'photographer',
                userId: 'abcdef1234567890',
                photographerId: 'photo9999'
            })
        })
    })
})
