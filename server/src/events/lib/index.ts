import registerSuccess from './register-success';
import addLocationSuccess from './add-location-success';
import confirmEmailSuccess from './confirm-email-success';
import forgotPasswordSuccess from './forgot-password-success';

const events = {
    registerSuccess,
    addLocationSuccess,
    confirmEmailSuccess,
    forgotPasswordSuccess
};

export type TEvents = typeof events;
export default events;