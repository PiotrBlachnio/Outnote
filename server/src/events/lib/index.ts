import registerSuccess from './register-success';
import addLocationSuccess from './add-location-success';
import confirmEmailSuccess from './confirm-email-success';
import forgotPasswordSuccess from './forgot-password-success';
import resetPasswordSuccess from './reset-password-success';
import sendConfirmationMailSuccess from './send-confirmation-mail-success';
import deleteNoteSuccess from './delete-note-success';
import updateNoteSuccess from './update-note-success';
import category from './category';
import updateUserSuccess from './update-user-success';

const events = {
    registerSuccess,
    addLocationSuccess,
    confirmEmailSuccess,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    sendConfirmationMailSuccess,
    deleteNoteSuccess,
    updateNoteSuccess,
    category,
    updateUserSuccess
};

export type TEvents = typeof events;
export default events;