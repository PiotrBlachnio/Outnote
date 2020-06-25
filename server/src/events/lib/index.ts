import registerSuccess from './register-success';
import addLocationSuccess from './add-location-success';

const events = {
    registerSuccess,
    addLocationSuccess
};

export type TEvents = typeof events;
export default events;