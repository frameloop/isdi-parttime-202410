import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserName from './getUserName.js'
import verifyUserExists from './verifyUserExists.js'
import logoutUser from './logoutUser.js'
import sendEmail from './sendEmail.js'
import sendRecoveryEmail from './sendRecoveryEmail.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    verifyUserExists,
    logoutUser,
    sendEmail,
    sendRecoveryEmail
}

export default logic