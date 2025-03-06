import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

const recoverPassword = async (username) => {
    validate.username(username);

    const user = await User.findOne({ username }).catch(error => {
        throw new SystemError(error.message);
    });

    if (!user) throw new NotFoundError('User not found');

    // Simulación de envío de email (debes conectar un servicio real como SendGrid o Nodemailer)
    console.log(`📧 Sending recovery email to: ${user.email}`);

    return true;
};

export default recoverPassword;
