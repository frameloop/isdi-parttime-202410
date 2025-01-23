import validate from './helper/validate.js'
import { User } from '../data/models.js'

const authenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username, password })
        .then(user => {
            if (!user) throw new Error('wrong credentials')

            return user._id.toString()
        })
}

export default authenticateUser