import { expect } from 'chai'
import { blacklistToken, isTokenBlacklisted, cleanBlacklist } from './tokenBlacklist.js'

describe('Token Blacklist Logic', () => {
    const validToken = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })) + '.signature'
    const expiredToken = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 10 })) + '.signature'

    it('should add a token to the blacklist and detect it', () => {
        blacklistToken(validToken)

        const result = isTokenBlacklisted(validToken)
        expect(result).to.be.true
    })

    it('should return false for token not in blacklist', () => {
        const notListed = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 7200 })) + '.sig'
        const result = isTokenBlacklisted(notListed)
        expect(result).to.be.false
    })

    it('should throw error if token is invalid or empty (add)', () => {
        expect(() => blacklistToken(null)).to.throw('Token inválido')
        expect(() => blacklistToken(123)).to.throw('Token inválido')
    })

    it('should throw error if token is invalid or empty (check)', () => {
        expect(() => isTokenBlacklisted(undefined)).to.throw('Token inválido')
        expect(() => isTokenBlacklisted({})).to.throw('Token inválido')
    })

    it('should clean expired tokens from the blacklist', () => {
        blacklistToken(expiredToken)

        // Confirm that expired token is present
        expect(isTokenBlacklisted(expiredToken)).to.be.true

        // Now clean the list
        cleanBlacklist()

        // Should be gone
        expect(isTokenBlacklisted(expiredToken)).to.be.false
    })
})
