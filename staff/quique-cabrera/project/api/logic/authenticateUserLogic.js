import logic from '../logic/index.js'

export default async function authenticateUserLogic(username, password) {
    if (!username || !password) {
        throw new Error('MissingCredentials')
    }

    const user = await logic.authenticateUser(username, password)

    if (!user) {
        throw new Error('UserNotFound')
    }

    return user
}
