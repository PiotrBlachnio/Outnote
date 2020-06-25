import registerSuccess from './register-success';
import addLocationSuccess from './add-location-success';
import confirmEmailSuccess from './confirm-email-success';
import forgotPasswordSuccess from './forgot-password-success';
import resetPasswordSuccess from './reset-password-success';

const events = {
    registerSuccess,
    addLocationSuccess,
    confirmEmailSuccess,
    forgotPasswordSuccess,
    resetPasswordSuccess
};

export type TEvents = typeof events;
export default events;