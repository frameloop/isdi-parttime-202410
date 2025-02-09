import validate from './helper/validate.js'
import { User } from '../data/models.js'
import errors from './errors/index.js'

const { SystemError, NotFoundError } = errors


const getUserName = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.name
        })
}

export default getUserName