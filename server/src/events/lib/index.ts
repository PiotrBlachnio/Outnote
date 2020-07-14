import addLocationSuccess from './add-location-success';
import confirmEmailSuccess from './confirm-email-success';
import forgotPasswordSuccess from './forgot-password-success';
import resetPasswordSuccess from './reset-password-success';
import sendConfirmationMailSuccess from './send-confirmation-mail-success';
import note from './note-handlers';
import category from './category-handlers';
import user from './user-handlers';
import auth from './auth-handlers';

const events = {
    addLocationSuccess,
    confirmEmailSuccess,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    sendConfirmationMailSuccess,
    note,
    category,
    user,
    auth
};

export type TEvents = typeof events;
export default events;