import { User } from '../../data/models.js'
import { validate, SystemError, NotFoundError } from 'com'

const updatePhotographerLogic = async (photographerId, name, email, password, phone, location, description, portfolio, price, availability) => {
    try {
        validate.id(photographerId)
        validate.text(name)
        validate.email(email)
        validate.password(password)
        validate.text(phone)
        validate.text(location)
        validate.text(description)
        validate.text(portfolio)
        validate.number(price)
        validate.text(availability)

        const photographer = await User.findById(photographerId)

        if (!photographer) {
            throw new NotFoundError('Fotógrafo no encontrado')
        }

        if (photographer.role !== 'photographer') {
            throw new NotFoundError('El usuario no es un fotógrafo')
        }

        photographer.name = name
        photographer.email = email
        photographer.password = password
        photographer.phone = phone
        photographer.location = location
        photographer.description = description
        photographer.portfolio = portfolio
        photographer.price = price
        photographer.availability = availability

        await photographer.save()

        return {
            id: photographer._id,
            name: photographer.name,
            email: photographer.email,
            phone: photographer.phone,
            location: photographer.location,
            description: photographer.description,
            portfolio: photographer.portfolio,
            price: photographer.price,
            availability: photographer.availability
        }
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}

export default updatePhotographerLogic 