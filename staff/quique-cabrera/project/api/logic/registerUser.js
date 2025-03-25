import { User, Photographer } from '../data/models.js'
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs'

const { DuplicityError, SystemError } = errors

const registerUser = async (name, email, phone, username, password, role, coverage) => {
    try {
        // Validaciones de entrada
        validate.name(name)
        validate.email(email)
        validate.phone(phone)
        validate.username(username)
        validate.password(password)

        if (!['customer', 'photographer', 'administrator'].includes(role)) {
            throw new SystemError('Rol de usuario no válido')
        }

        if (role === 'photographer' && !coverage) {
            throw new SystemError('El área de cobertura es requerida para fotógrafos')
        }

        // Verificamos que no exista el usuario
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existingUser) {
            throw new DuplicityError('El usuario ya está registrado')
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creamos el usuario
        const user = await new User({
            name,
            email,
            phone,
            username,
            password: hashedPassword,
            role
        }).save()

        // Si es fotógrafo, creamos el perfil adicional
        if (role === 'photographer') {
            const alreadyHasPhotographer = await Photographer.findOne({ user: user._id })
            if (!alreadyHasPhotographer) {
                await new Photographer({
                    user: user._id,
                    coverage_area: coverage,
                    sessions: []
                }).save()
            }
        }

        // Retornamos el usuario creado
        return user

    } catch (error) {
        if (error instanceof DuplicityError || error instanceof SystemError) {
            throw error
        }

        throw new SystemError(error.message)
    }
}

export default registerUser
