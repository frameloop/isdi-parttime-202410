import errors from './errors/index.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Lista de contraseñas prohibidas (ejemplo, puedes cargar más desde un archivo o API)
const PASSWORD_COMMON = ["12345678", "Password2025", "Pikachu1996", "Doraemon1982"]

const USERNAME_REGEX = /^[a-z0-9_-]{1,30}$/

// Expresión regular que comprueba:
// - Al menos 8 caracteres
// - Al menos una mayúscula
// - Al menos un carácter especial
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

const validate = {
    username(username) {
        if (typeof username !== 'string') throw new ValidationError('invalid username type')
        if (!USERNAME_REGEX.test(username)) throw new ValidationError('invalid username syntax')
    }
    password(password, username) {
        if (typeof password !== 'string') throw new ValidationError('invalid password type');
        if (!PASSWORD_REGEX.test(password)) throw new ValidationError('password must be at least 8 characters, with one uppercase and one special character')
        if (PASSWORD_COMMON.includes(password.toLowerCase())) throw new ValidationError('password is too common')
        if (username && typeof username === 'string' && password.toLowerCase().includes(username.toLowerCase())) throw new ValidationError('password cannot contain username')
    },

    name(name) {
        if (typeof name !== 'string') throw new ValidationError('invalid name type')
        if (name.length < 5) throw new ValidationError('invalid name length')
    },

    email(email) {
        if (typeof email !== 'string') throw new ValidationError('invalid email type')
        if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email syntax')
    },

    id(id, explain = 'id') {
        if (typeof id !== 'string') throw new ValidationError(`invalid ${explain} type`)
        if (id.length < 10) throw new ValidationError(`invalid ${explain} length`)
    }
}

export default validate


