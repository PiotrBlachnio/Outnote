import account from './account-handlers';
import note from './note-handlers';
import category from './category-handlers';
import user from './user-handlers';
import auth from './auth-handlers';

const events = {
    account,
    note,
    category,
    user,
    auth
};

export type TEvents = typeof events;
export default events;