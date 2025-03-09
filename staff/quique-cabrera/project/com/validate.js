import errors from './errors/index.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-z0-9_-]{1,30}$/
const PASSWORD_REGEX = /^((?!.*[\s])(?=.*[a-zA-Z0-9])(?=.*\d).{8,15})/
const URL_REGEX = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/

const validate = {
    username(username) {
        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (!USERNAME_REGEX.test(username)) throw new ValidationError('invalid username syntax')
    },

    password(password) {
        if (typeof password !== 'string') throw new ValidationError('invalid password type')
        if (!PASSWORD_REGEX.test(password)) throw new ValidationError('Password incorrecto')
        if (!(password)) throw new ValidationError('invalid password')

    },

    name(name) {
        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 1) throw new ValidationError('invalid name length')
    },

    email(email) {
        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (!EMAIL_REGEX.test(email)) new ValidationError('invalid email syntax')
    },

    id(id, explain = 'id') {
        if (typeof id !== 'string') throw new ValidationError(`invalid ${explain} type`)
        if (id.length < 10) throw new ValidationError(`invalid ${explain} length`)
    },

    image(image) {
        if (typeof image !== 'string') throw new ValidationError('invalid image type')
        if (!URL_REGEX.test(image)) throw new ValidationError('invalid image syntax')
    },

    text(text) {
        if (typeof text !== 'string') throw new ValidationError('invalid text type')
    },

    phone(phone) {
        if (typeof phone !== 'string') throw new ValidationError('invalid phone type')
        if (!PHONE_REGEX.test(phone)) throw new ValidationError('invalid phone syntax')
    }
}

export default validate