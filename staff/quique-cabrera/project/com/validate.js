import { ValidationError } from './errors/index.js'

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
        if (!PASSWORD_REGEX.test(password)) throw new ValidationError('invalid password syntax')
    },

    email(email) {
        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email syntax')
    },

    phone(phone) {
        if (typeof phone !== 'string') throw new ValidationError('invalid phone type')
        if (!PHONE_REGEX.test(phone)) throw new ValidationError('invalid phone syntax')
    },

    url(url) {
        if (typeof url !== 'string') throw new ValidationError('invalid URL type')
        if (!URL_REGEX.test(url)) throw new ValidationError('invalid URL syntax')
    },

    text(text, explain = 'text') {
        if (typeof text !== 'string') throw new ValidationError(`invalid ${explain} type`)
        if (!text.trim().length) throw new ValidationError(`empty ${explain}`)
    },

    id(id, explain = 'id') {
        if (!id) throw new ValidationError(`${explain} not found`)
        if (typeof id !== 'string') throw new ValidationError(`invalid ${explain} type`)
        if (id.trim().length === 0) throw new ValidationError(`empty ${explain}`)
    },

    number(number, explain = 'number') {
        if (typeof number !== 'number') throw new ValidationError(`invalid ${explain} type`)
    },

    boolean(boolean, explain = 'boolean') {
        if (typeof boolean !== 'boolean') throw new ValidationError(`invalid ${explain} type`)
    },

    array(array, explain = 'array') {
        if (!Array.isArray(array)) throw new ValidationError(`invalid ${explain} type`)
    },

    object(object, explain = 'object') {
        if (typeof object !== 'object') throw new ValidationError(`invalid ${explain} type`)
        if (object === null) throw new ValidationError(`null ${explain}`)
    },

    date(date, explain = 'date') {
        if (!(date instanceof Date)) throw new ValidationError(`invalid ${explain} type`)
        if (isNaN(date.getTime())) throw new ValidationError(`invalid ${explain} value`)
    }
}

export default validate