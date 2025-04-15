import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import verifyUserExists from './verifyUserExists.js'
import logoutUser from './logoutUser.js'
import sendEmail from './sendEmail.js'
import sendRecoveryEmail from './sendRecoveryEmail.js'
import getCustomerSessions from './getCustomerSessions.js'
import getPhotographerSessions from './getPhotographerSessions.js'
import * as tokenBlacklist from './tokenBlacklist.js'
import createAvailabilityLogic from './createAvailabilityLogic.js'
import deleteAvailabilityLogic from './deleteAvailabilityLogic.js'
import getAvailabilityLogic from './getAvailabilityLogic.js'
import getAllAvailabilityLogic from './getAllAvailabilityLogic.js'
import updateAvailabilityLogic from './updateAvailabilityLogic.js'
import createSessionLogic from './createSessionLogic.js'
import deleteSessionLogic from './deleteSessionLogic.js'
import getPhotographerSessionsLogic from './getPhotographerSessionsLogic.js'
import getSessionsLogic from './getSessionsLogic.js'
import getUserSessionsLogic from './getUserSessionsLogic.js'
import deletePhotographerLogic from './deletePhotographerLogic.js'
import generateToken from './generateToken.js'
import authenticateUserLogic from './authenticateUserLogic.js'
import findPhotographerProfile from './findPhotographerProfile.js'
import getPhotographersLogic from './getPhotographersLogic.js'
import loginUserLogic from './loginUserLogic.js'
import logoutUserLogic from './logoutUserLogic.js'
import recoverPasswordLogic from './recoverPasswordLogic.js'
import registerUserLogic from './registerUserLogic.js'
import verifyUserLogic from './verifyUserLogic.js'
import createAuthResponse from './createAuthResponse.js'
import handleAuthError from './handleAuthError.js'


const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    verifyUserExists,
    logoutUser,
    sendEmail,
    sendRecoveryEmail,
    getCustomerSessions,
    getPhotographerSessions,
    createAvailabilityLogic,
    deleteAvailabilityLogic,
    getAvailabilityLogic,
    getAllAvailabilityLogic,
    updateAvailabilityLogic,
    createSessionLogic,
    deleteSessionLogic,
    getPhotographerSessionsLogic,
    getSessionsLogic,
    getUserSessionsLogic,
    deletePhotographerLogic,
    generateToken,
    authenticateUserLogic,
    findPhotographerProfile,
    getPhotographersLogic,
    loginUserLogic,
    logoutUserLogic,
    recoverPasswordLogic,
    registerUserLogic,
    verifyUserLogic,
    createAuthResponse,
    handleAuthError,
    ...tokenBlacklist
}

export default logic
