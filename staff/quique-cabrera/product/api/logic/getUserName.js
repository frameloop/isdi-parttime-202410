import validate from './helper/validate.js'
import { User } from '../data/models.js'


const getUserName = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('user not found')

            return user.name
        })
}

export default getUserName