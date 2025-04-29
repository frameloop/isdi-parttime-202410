import { expect } from 'chai'
import jwt from 'jsonwebtoken'
import generateToken from './generateToken.js'

describe('generateToken', () => {
    const JWT_SECRET = process.env.JWT_SECRET || 'testsecret'

    it('should generate a valid JWT token as string', () => {
        const payload = { userId: '123', role: 'photographer' }
        const token = generateToken(payload)

        expect(token).to.be.a('string')
    })

    it('should decode the token with correct payload', () => {
        const payload = { userId: '456', role: 'customer' }
        const token = generateToken(payload)

        const decoded = jwt.verify(token, JWT_SECRET)

        expect(decoded).to.include(payload)
    })

    it('should include an expiration of approximately 1 hour', () => {
        const nowInSeconds = Math.floor(Date.now() / 1000)
        const token = generateToken({ userId: '789' })
        const decoded = jwt.verify(token, JWT_SECRET)

        const expiresIn = decoded.exp - decoded.iat
        expect(expiresIn).to.be.within(3595, 3605) // margen de error de ±5 segundos
    })
})
