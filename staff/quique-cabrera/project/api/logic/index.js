// Autenticación
import authenticateUserLogic from './auth/authenticateUserLogic.js'
import loginUserLogic from './auth/loginUserLogic.js'
import logoutUserLogic from './auth/logoutUserLogic.js'
import registerUserLogic from './auth/registerUserLogic.js'
import recoverPasswordLogic from './auth/recoverPasswordLogic.js'
import verifyUserLogic from './auth/verifyUserLogic.js'

// Disponibilidad
import createAvailabilityLogic from './availability/createAvailabilityLogic.js'
import deleteAvailabilityLogic from './availability/deleteAvailabilityLogic.js'
import getAvailabilityLogic from './availability/getAvailabilityLogic.js'
import getAllAvailabilityLogic from './availability/getAllAvailabilityLogic.js'
import updateAvailabilityLogic from './availability/updateAvailabilityLogic.js'
import getPhotographerAvailabilityLogic from './availability/getPhotographerAvailabilityLogic.js'

// Fotógrafos
import deletePhotographerLogic from './photographers/deletePhotographerLogic.js'
import getPhotographerLogic from './photographers/getPhotographerLogic.js'
import getPhotographersLogic from './photographers/getPhotographersLogic.js'
import getPhotographerReviewsLogic from './photographers/getPhotographerReviewsLogic.js'
import getPhotographerSessionsLogic from './photographers/getPhotographerSessionsLogic.js'
import ratePhotographerLogic from './photographers/ratePhotographerLogic.js'
import updatePhotographerLogic from './photographers/updatePhotographerLogic.js'

// Sesiones
import createSessionLogic from './sessions/createSessionLogic.js'
import deleteSessionLogic from './sessions/deleteSessionLogic.js'
import getSessionsLogic from './sessions/getSessionsLogic.js'
import getUserSessionsLogic from './sessions/getUserSessionsLogic.js'

// Email
import sendEmail from './email/sendEmail.js'
import sendRecoveryEmail from './email/sendRecoveryEmail.js'

const logic = {
    // Auth
    authenticateUserLogic,
    loginUserLogic,
    logoutUserLogic,
    registerUserLogic,
    recoverPasswordLogic,
    verifyUserLogic,

    // Availability
    createAvailabilityLogic,
    deleteAvailabilityLogic,
    getAvailabilityLogic,
    getAllAvailabilityLogic,
    updateAvailabilityLogic,
    getPhotographerAvailabilityLogic,

    // Photographers
    deletePhotographerLogic,
    getPhotographerLogic,
    getPhotographersLogic,
    getPhotographerReviewsLogic,
    getPhotographerSessionsLogic,
    ratePhotographerLogic,
    updatePhotographerLogic,

    // Sessions
    createSessionLogic,
    deleteSessionLogic,
    getSessionsLogic,
    getUserSessionsLogic,

    // Email
    sendEmail,
    sendRecoveryEmail,
}

export default logic
