import { blacklistToken } from './tokenBlacklist.js'

const logoutUser = (token) => {
    if (!token) {
        console.warn('[Logout] No token provided')
        throw new Error('No token provided')
    }

    console.log(`[Logout] Blacklisting token: ${token}`)
    blacklistToken(token)
    console.log('[Logout] Logout complete')
}

export default logoutUser
