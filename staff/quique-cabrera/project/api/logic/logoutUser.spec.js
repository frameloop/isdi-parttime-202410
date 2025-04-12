import { expect } from 'chai'
import logoutUser from './logoutUser.js'
import { isTokenBlacklisted } from './tokenBlacklist.js'

describe('logoutUser', () => {

    it('✅ añade el token a la blacklist', () => {
        const token = 'token-prueba'

        logoutUser(token)

        const isBlacklisted = isTokenBlacklisted(token)
        expect(isBlacklisted).to.be.true
    })

    it('❌ lanza error si no se proporciona token', () => {
        expect(() => logoutUser()).to.throw(Error, 'No token provided')
    })

})
