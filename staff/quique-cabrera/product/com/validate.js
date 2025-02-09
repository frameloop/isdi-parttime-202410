import errors from './errors/index.js'

const { ValidationError } = errors

const validate = {
    username(username) {
        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (username.length < 4) throw new ValidationError('invalid username length')
    },

    password(password) {
        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (password.length < 8) throw new ValidationError('invalid password length')
    },

    name(name) {
        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')
    },

    email(email) {
        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (email.length < 6) throw new ValidationError('invalid email length')
    },

    id(id, explain = 'id') {
        if (typeof id !== 'string') throw new ValidationError(`invalid ${explain} type`)
        if (id.length < 10) throw new ValidationError(`invalid ${explain} length`)
    },

    image(image) {
        if (typeof image !== 'string') throw new ValidationError('invalid image type')
    },

    text(text) {
        if (typeof text !== 'string') throw new ValidationError('invalid text type')
    }
}

export default validate