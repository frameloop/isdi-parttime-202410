import { expect } from 'chai'
// Ajustar la ruta según la nueva ubicación de logoutUser y tokenBlacklist
// Asumiendo que tokenBlacklist está ahora en logic/auth/authUtils.js
import logoutUser from '../logic/auth/logoutUser.js' // Ruta ejemplo, ajustar!
import { isTokenBlacklisted } from '../logic/auth/authUtils.js' // Ruta ejemplo, ajustar!

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