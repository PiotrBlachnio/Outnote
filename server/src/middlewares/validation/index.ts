import addLocation from './lib/add-location';
import confirmEmail from './lib/confirm-email';
import forgotPassword from './lib/forgot-password';
import resetPassword from './lib/reset-password';
import sendConfirmationMail from './lib/send-confirmation-mail';
import note from './lib/note-validators';
import category from './lib/category-validators';
import auth from './lib/auth-validators';

export default {
    auth,
    addLocation,
    confirmEmail,
    forgotPassword,
    resetPassword,
    sendConfirmationMail,
    note,
    category
};