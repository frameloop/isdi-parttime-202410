import { User, Photographer } from '../../data/models.js'
import { validate, SystemError, DuplicityError } from 'com'
import { handleAuthError, createAuthResponse } from './authUtils.js' // Import centralized utils
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const VALID_ROLES = ['photographer', 'customer']

const registerUserLogic = async (name, username, email, password, phone, role, coverage_area, bio = '', portfolio = []) => {
    // Validaciones básicas
    validate.text(name, 'name')
    if (name.length < 2 || name.length > 50) {
        throw new SystemError('Name must be between 2 and 50 characters')
    }

    validate.text(username, 'username')
    validate.username(username)

    validate.text(email, 'email')
    validate.email(email)

    validate.text(password, 'password')
    validate.password(password)

    validate.text(phone, 'phone')
    validate.phone(phone)

    validate.text(role, 'role')
    if (!VALID_ROLES.includes(role)) {
        throw new SystemError(`Role must be one of: ${VALID_ROLES.join(', ')}`)
    }

    if (role === 'photographer') {
        validate.text(coverage_area, 'coverage area')
        if (bio) validate.text(bio, 'bio')
        if (portfolio && !Array.isArray(portfolio)) {
            throw new SystemError('Portfolio must be an array of URLs')
        }
        if (portfolio) {
            portfolio.forEach((url, index) => {
                validate.text(url, `portfolio URL at index ${index}`)
                validate.url(url)
            })
        }
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new DuplicityError('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const userData = {
            name,
            username,
            email,
            password: hashedPassword,
            phone,
            role,
            createdAt: new Date()
        }

        if (role === 'photographer') {
            userData.bio = bio
            userData.portfolio = portfolio
        }

        const user = await User.create(userData)

        // Si es fotógrafo, crear entrada en la colección de fotógrafos
        if (role === 'photographer') {
            await Photographer.create({
                user: user._id,
                coverage_area,
                sessions: []
            })
        }

        return {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            coverage_area: coverage_area,
            bio: user.bio,
            portfolio: user.portfolio,
            createdAt: user.createdAt
        }

    } catch (error) {
        return handleAuthError(error)
    }
}

export default registerUserLogic 